import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { IUsuario, Usuario } from '../user-management.model';
import { UserManagementService } from '../service/user-management.service';
import { Observable, Subscription } from 'rxjs';
import { EstablecimientoService } from 'app/entities/establishment-management/establecimiento.service';
import { Establecimiento, IEstablecimiento } from 'app/entities/establishment-management/establecimiento.model';
import { GrupoTrabajo, IGrupoTrabajo } from 'app/entities/group-work-management/grupoTrabajo.model';
import { GrupoTrabajoService } from 'app/entities/group-work-management/grupoTrabajo.service';
import { RolService } from 'app/entities/role-management/role.service';
import { IRol, Rol } from 'app/entities/role-management/rol.model';

// Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),

@Component({
  selector: 'jhi-user-mgmt-update',
  templateUrl: './user-management-update.component.html',
})
export class UserManagementUpdateComponent implements OnInit, OnDestroy {
  user!: Usuario;
  titleForm = '';
  establecimientos: IEstablecimiento[] = [];
  grupoTrabajos: IGrupoTrabajo[] = [];
  roles: IRol[] = [];
  isSaving = false;
  subscriptions: Subscription[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: ['', [Validators.maxLength(50), Validators.required]],
    nombreCompleto: ['', [Validators.maxLength(50), Validators.required]],
    correo: ['', [Validators.minLength(5), Validators.email, Validators.required]],
    cuil: ['', [Validators.maxLength(13), Validators.required]],
    establecimiento: ['', [Validators.required]],
    grupoTrabajo: ['', [Validators.required]],
    rol: ['', [Validators.required]],
  });

  constructor(
    private userService: UserManagementService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private rolService: RolService,
    private establecimientoService: EstablecimientoService,
    private grupoService: GrupoTrabajoService,
    private cdk: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.data.subscribe(({ user }) => {
        this.createTitle(user);
        if (user.id != null) {
          this.updateForm(user);
        }
      })
    );

    this.subscriptions.push(this.establecimientoService.getAll().subscribe({ next: res => (this.establecimientos = res) }));
    this.subscriptions.push(this.grupoService.getAll().subscribe({ next: res => (this.grupoTrabajos = res) }));
    this.subscriptions.push(this.rolService.getAll().subscribe({ next: res => (this.roles = res) }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

  previousState(): void {
    window.history.back();
  }

  limpiar(): void {
    this.updateForm(new Usuario());
    this.editForm.markAsUntouched();
    this.editForm.updateValueAndValidity();
    this.editForm.markAsPristine();
    this.isSaving = false;
  }

  save(salir: boolean): void {
    if (this.editForm.invalid) {
      this.marcarCampos(this.editForm);
      return;
    }

    this.isSaving = true;
    const user = this.createUser();

    if (user.id !== undefined) {
      this.subscribeToSaveResponse(this.userService.update(user));
    } else {
      this.subscribeToSaveResponse(this.userService.create(user));
    }
    if (salir) {
      this.previousState();
    }
    this.limpiar();
  }

  get id(): AbstractControl {
    return this.editForm.get('id') as AbstractControl;
  }

  get nombre(): any {
    return this.editForm.get('nombre');
  }
  get nombreCompleto(): AbstractControl {
    return this.editForm.get(['nombreCompleto']) as AbstractControl;
  }
  get correo(): AbstractControl {
    return this.editForm.get(['correo']) as AbstractControl;
  }
  get cuil(): AbstractControl {
    return this.editForm.get(['cuil']) as AbstractControl;
  }
  get establecimiento(): AbstractControl {
    return this.editForm.get(['establecimiento']) as AbstractControl;
  }
  get grupoTrabajo(): AbstractControl {
    return this.editForm.get(['grupoTrabajo']) as AbstractControl;
  }
  get rol(): AbstractControl {
    return this.editForm.get(['rol']) as AbstractControl;
  }

  mensajeErrorNombre(): string {
    return this.nombre.hasError('required')
      ? 'El nombre de usuario es requerido'
      : this.nombre.hasError('maxlength')
      ? 'Demasiado largo '
      : '';
  }
  mensajeErrorNombreCompleto(): string {
    return this.editForm.get(['nombreCompleto'])?.hasError('required')
      ? 'El nombre Completo es requerido'
      : this.editForm.get(['nombreCompleto'])?.hasError('maxlength')
      ? 'Demasiado largo '
      : '';
  }
  mensajeErrorCorreo(): string {
    return this.editForm.get(['correo'])?.hasError('required')
      ? 'El correo es requerido'
      : this.editForm.get(['correo'])?.hasError('email')
      ? 'correo invalido'
      : '';
  }
  mensajeErrorCuil(): string {
    return this.editForm.get(['cuil'])?.hasError('required')
      ? 'El cuil es requerido'
      : this.editForm.get(['cuil'])?.hasError('maxlength')
      ? 'Demasiados caracteres'
      : '';
  }
  mensajeErrorEstablecimiento(): string {
    return this.editForm.get(['establecimiento'])?.hasError('required') ? 'El establecimiento es requerido' : '';
  }
  mensajeErrorGrupoTrabajo(): string {
    return this.editForm.get(['grupoTrabajo'])?.hasError('required') ? 'El grupo de trabajo es requerido' : '';
  }
  mensajeErrorRol(): string {
    return this.editForm.get(['rol'])?.hasError('required') ? 'El Rol de Usuario es requerido' : '';
  }

  trackRolOrderById(index: number, item: IRol): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<IUsuario>): void {
    result.subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  private marcarCampos(formGroup: FormGroup): void {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.marcarCampos(control);
      }
    });
  }

  private updateForm(user: IUsuario): void {
    this.editForm.patchValue({
      id: user.id,
      nombre: user.nombre,
      nombreCompleto: user.nombreCompleto,
      correo: user.correo,
      cuil: user.cuil,
      establecimiento: user.establecimiento?.id,
      grupoTrabajo: user.grupoTrabajo?.id,
      rol: user.rol?.id,
    });
    this.cdk.markForCheck();
  }

  private createUser(): IUsuario {
    return {
      ...new Usuario(),
      id: this.id.value ?? undefined,
      nombre: this.nombre.value,
      nombreCompleto: this.nombreCompleto.value,
      correo: this.correo.value,
      cuil: this.cuil.value,
      establecimiento: { ...new Establecimiento(), id: this.establecimiento.value },
      grupoTrabajo: { ...new GrupoTrabajo(), id: this.grupoTrabajo.value },
      rol: { ...new Rol(), id: this.rol.value },
    };
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
  }

  private onSaveError(): void {
    this.isSaving = false;
  }

  private createTitle(user: IUsuario): void {
    if (!user.id) {
      this.titleForm = 'Crear Usuario';
    } else {
      this.titleForm = `Editar Usuario ${user.nombre ?? ''}`;
    }
  }
}
