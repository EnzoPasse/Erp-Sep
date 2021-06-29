import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { Alert } from 'app/core/util/alert.service';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { Observable, Subscription } from 'rxjs';
import { IRol } from '../..';
import { IPermission, ITodoItemFlatNode, Permission, Rol, TodoItemFlatNode } from '../role.model';
import { RolService } from '../service/role.service';

@Component({
  selector: 'jhi-role-update',
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.scss'],
})
export class RoleUpdateComponent implements OnInit, OnDestroy {
  rol!: IRol;
  allPermissions: IPermission[] = [];
  rolePermissions: any[] = [];
  titleForm = '';
  isSaving = false;
  subscriptions: Subscription[] = [];

  /* ********************** TREE  ************************************/
  // Map from flat node to nested node. This helps us finding the nested node to be modified
  flatNodeMap = new Map<ITodoItemFlatNode, Permission>();

  // Map from nested node to flattened node. This helps us to keep the same object for selection
  nestedNodeMap = new Map<Permission, ITodoItemFlatNode>();

  // A selected parent node to be inserted
  selectedParent: ITodoItemFlatNode | null = null;

  // The new item's name
  newItemName = '';

  treeControl: FlatTreeControl<ITodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<Permission, ITodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<Permission, ITodoItemFlatNode>;

  // The selection for checklist
  checklistSelection = new SelectionModel<ITodoItemFlatNode>(true); // multiple

  constructor(private rolService: RolService, private route: ActivatedRoute, private eventManager: EventManager) {
    // tree
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<ITodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  getLevel = (node: ITodoItemFlatNode): any => node.level;

  isExpandable = (node: ITodoItemFlatNode): any => node.expandable;

  getChildren = (node: Permission | null): Permission[] | null => node!.children;

  hasChild = (_: number, _nodeData: ITodoItemFlatNode): any => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: ITodoItemFlatNode): any => _nodeData.item === '';

  transformer = (node: Permission, level: number): ITodoItemFlatNode => {
    const existingNode = this.nestedNodeMap.get(node);

    if (existingNode?.item === node.nombreExtendido) {
      return existingNode;
    }
    const flatNode = new TodoItemFlatNode(node.id, node.nombreExtendido, level, node.isSelected, !!node.children);

    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  expandTree(): void {
    this.treeControl.expandAll();
  }

  selectionToggleExpand(node: ITodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    if (this.checklistSelection.isSelected(node)) {
      this.treeControl.expand(node);
    } else {
      this.checklistSelection.deselect(...descendants);
      this.treeControl.collapse(node);
    }
  }

  /* ****************END TREE**********************   */

  ngOnInit(): void {
    this.route.data.subscribe(({ rol }) => {
      this.createTitle(rol);
      this.rol = rol;
      this.loadPermissions();
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  previousState(): void {
    window.history.back();
  }

  limpiar(): void {
    this.rol = new Rol();
    this.isSaving = false;
    this.createTitle(this.rol);
    this.deselectAllNodes();
  }

  save(salir: boolean): void {
    if (!this.rol.nombre) {
      this.eventManager.broadcast(
        new EventWithContent<Alert>('erpSepApp.error', { message: 'Algo no va bien!, verifica los campos', type: 'warning' })
      );
      return;
    }

    this.isSaving = true;
    const rol = this.createRol();

    if (rol.id !== undefined) {
      this.subscribeToSaveResponse(this.rolService.update(rol));
    } else {
      this.subscribeToSaveResponse(this.rolService.create(rol));
    }
    if (salir) {
      this.previousState();
    }
    this.limpiar();
  }

  protected subscribeToSaveResponse(result: Observable<IRol>): void {
    result.subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  private loadPermissions(): void {
    this.rolService.getAllPermissions().subscribe({
      next: (res: IPermission[]) => {
        if (res.length > 0) {
          this.dataSource.data = res;
          if (this.rol.id !== undefined) {
            this.expandTree();
            this.checkPermissions(res);
          }
        }
      },
    });
  }

  private checkPermissions(_allPermissions: IPermission[]): void {
    // check the data tree
    _allPermissions.forEach((element: IPermission) => {
      const modulePermission = this.rol.rolPermiso!.some((t: any) => t === element.id);
      if (modulePermission) {
        this.nestedNodeMap.get(element)!.isSelected = true;
        this.checklistSelection.toggle(this.nestedNodeMap.get(element)!);
      }
      // leaf of the tree
      const hasChildren = element.children;
      hasChildren!.forEach((children: IPermission) => {
        const formPermission = this.rol.rolPermiso!.some((t: any) => t === children.id);
        if (formPermission) {
          this.nestedNodeMap.get(children)!.isSelected = true;
          this.checklistSelection.toggle(this.nestedNodeMap.get(children)!);
        }
        // last leaf of the tree
        const hasGrandChildren = this.removeNull(children.children);
        hasGrandChildren.forEach((grandChildren: IPermission) => {
          const actionPermission = this.rol.rolPermiso!.some((t: any) => t === grandChildren.id);
          if (actionPermission) {
            this.nestedNodeMap.get(grandChildren)!.isSelected = true;
            this.checklistSelection.toggle(this.nestedNodeMap.get(grandChildren)!);
          }
        });
      });
    });
  }

  private removeNull(arr: IPermission[] | null): IPermission[] | [] {
    if (arr !== null) {
      return arr;
    } else {
      return [];
    }
  }

  private deselectAllNodes(): void {
    this.treeControl.dataNodes.forEach(element => {
      if (this.checklistSelection.isSelected(element)) {
        element.isSelected = false;
      }
      this.treeControl.collapseAll();
    });
  }

  private preparePermissionIds(): number[] {
    const permisos = [];
    for (let i = 0; this.checklistSelection.selected.length > i; i++) {
      permisos.push(this.checklistSelection.selected[i].id);
    }
    return permisos;
  }

  private createRol(): IRol {
    return {
      ...new Rol(),
      id: this.rol.id ?? undefined,
      nombre: this.rol.nombre,
      rolPermiso: [],
      permisos: this.preparePermissionIds(),
      permisosNombre: [],
      esAdmin: +this.rol.esAdmin!,
    };
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
  }

  private onSaveError(): void {
    this.isSaving = false;
  }

  private createTitle(rol: IRol): void {
    if (!rol.id) {
      this.titleForm = 'Crear Rol';
    } else {
      this.titleForm = `Editar Rol ${rol.nombre ?? ''}`;
    }
  }
}
