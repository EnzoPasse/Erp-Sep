import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IRol } from '../..';
import { IPermission, ITodoItemFlatNode, Permission, TodoItemFlatNode } from '../role.model';
import { RolService } from '../service/role.service';

@Component({
  selector: 'jhi-role-update',
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.scss'],
})
export class RoleUpdateComponent implements OnInit, OnDestroy {
  rol!: IRol;
  hasFormErrors = false;
  viewLoading = false;
  loadingAfterSubmit = false;
  allPermissions: IPermission[] = [];
  rolePermissions: any[] = [];
  titleForm = '';
  isSaving = false;

  subscriptions: Subscription[] = [];

  /*********************** TREE  ************************************/
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<ITodoItemFlatNode, Permission>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<Permission, ITodoItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: ITodoItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<ITodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<Permission, ITodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<Permission, ITodoItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<ITodoItemFlatNode>(true /* multiple */);

  constructor(private rolService: RolService, private route: ActivatedRoute, private cd: ChangeDetectorRef) {
    /* tree */
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<ITodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    /*  */
  }

  /*  TREE */
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

  /*****************END TREE**********************   */

  ngOnInit(): void {
    this.route.data.subscribe(({ rol }) => {
      this.createTitle(rol);
      this.rol = rol;
      this.loadPermissions();
    });
  }

  loadPermissions(): void {
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  checkPermissions(_allPermissions: IPermission[]): void {
    // eslint-disable-next-line no-console
    console.log(_allPermissions);

    // eslint-disable-next-line no-console
    console.log(this.rol);

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

  removeNull(arr: IPermission[] | null): IPermission[] | [] {
    if (arr !== null) {
      return arr;
    } else {
      return [];
    }
  }

  save(exit: boolean): void {
    window.history.back();
  }

  previousState(): void {
    window.history.back();
  }

  /* 
    preparePermissionIds() {
      let permisos: any[] = [];
  
      for (let i = 0; this.checklistSelection.selected.length > i; i++) {
        permisos.push(this.checklistSelection.selected[i].id);
      }
  
      return permisos;
    }
  
   
    prepareRole(): Role {
      const _role = new Role();
      _role.id = this.role.id;
      _role.permisos = this.preparePermissionIds();
  
      _role.nombre = this.role.nombre;
      _role.esAdmin = this.role.esAdmin;
      return _role;
    }
  
    
    onSubmit() {
      this.hasFormErrors = false;
      this.loadingAfterSubmit = false;
      if (!this.isTitleValid() || this.checklistSelection.selected.length === 0) {
        this.hasFormErrors = true;
        return;
      }
  
      const editedRole = this.prepareRole();
  
      if (editedRole.id > 0) {
        this.updateRole(editedRole);
      } else {
        this.createRole(editedRole);
      }
    }
  
    
    updateRole(_role: Role) {
      this.loadingAfterSubmit = true;
      this.viewLoading = true;
      const updateRole: Update<Role> = {
        id: this.role.id,
        changes: _role
      };
  
      this.store.dispatch(RoleUpdated({ partialrole: updateRole, role: _role }));
      this.verificarDuplicado(_role)
  
    }
  
    verificarDuplicado(_role: Role) {
      this.componentSubscriptions = this.store.select(selectMessageError)
        .subscribe(res => {
          this.viewLoading = false;
  
          if (res) {
            this.mensajeError = res.message
            this.cd.markForCheck();  //TODO se cierra la ventana cuando hay un error, solucionar eso
            return
          } else {
            this.dialogRef.close({ _role, isEdit: false });
          }
        });
  
    }
  
  
    createRole(_role: Role) {
      this.loadingAfterSubmit = true;
      this.viewLoading = true;
      this.store.dispatch(RoleOnServerCreated({ role: _role }));
      this.verificarDuplicado(_role);
  
    }
  
  
    onAlertClose($event?) {
      this.hasFormErrors = false;
      if (this.componentSubscriptions) {
  
        this.mensajeError = null;
        this.store.dispatch(RoleCloseError());
      }
    }
   */

  private createTitle(rol: IRol): void {
    if (!rol.id) {
      this.titleForm = 'Crear Rol';
    } else {
      this.titleForm = `Editar Rol ${rol.nombre ?? ''}`;
    }
  }
}
