import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { IUsuario, Usuario } from '../user-management.model';
import { UserManagementService } from '../service/user-management.service';
import { Observable } from 'rxjs';
import { validateBasis } from '@angular/flex-layout';

// Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),

@Component({
  selector: 'jhi-user-mgmt-update',
  templateUrl: './user-management-update.component.html',
})
export class UserManagementUpdateComponent implements OnInit {
  user!: Usuario;

  isSaving = false;

  editForm = this.fb.group({
    nombre: ['', [Validators.maxLength(50), Validators.required]],
    nombreCompleto: ['', [Validators.maxLength(50), Validators.required]],
    correo: ['', [Validators.minLength(5), Validators.email, Validators.required]],
    cuil: ['', [Validators.minLength(5), Validators.required]],
    establecimiento: ['', [Validators.required]],
    grupoTrabajo: ['', [Validators.required]],
  });

  constructor(private userService: UserManagementService, private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ user }) => {
      if (user.id != null) {
        this.updateForm(user);
      }
    });
  }

  updateForm(user: IUsuario): void {
    this.editForm.patchValue({
      nombre: user.nombre,
      nombreCompleto: user.nombreCompleto,
      correo: user.correo,
      cuil: user.cuil,
      establecimiento: user.establecimiento?.nombre,
      grupoTrabajo: user.grupoTrabajo?.nombre,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const user = this.createUser();
    if (user.id !== undefined) {
      this.subscribeToSaveResponse(this.userService.update(user));

      /*  this.userService.update(this.user).subscribe(
         () => this.onSaveSuccess(),
         () => this.onSaveError()
       ); */
    } else {
      this.subscribeToSaveResponse(this.userService.create(user));
      /* this.userService.create(this.user).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      ); */
    }
  }

  get nombre(): AbstractControl {
    return this.editForm.get(['nombre']) as AbstractControl;
  }
  get nombreCompleto(): AbstractControl {
    return this.editForm.get(['nombre']) as AbstractControl;
  }
  get correo(): AbstractControl {
    return this.editForm.get(['nombre']) as AbstractControl;
  }
  get establecimiento(): AbstractControl {
    return this.editForm.get(['nombre']) as AbstractControl;
  }
  get grupoTrabajo(): AbstractControl {
    return this.editForm.get(['nombre']) as AbstractControl;
  }

  mensajeErrorNombre(): string {
    return this.editForm.get(['nombre'])?.hasError('required') ? 'El nombre es requerido' : '';
  }
  mensajeErrorNombreCompleto(): string {
    return this.editForm.get(['nombreComleto'])?.hasError('required') ? 'El nombre es requerido' : '';
  }
  mensajeErrorCorreo(): string {
    return this.editForm.get(['correo'])?.hasError('required')
      ? 'El correo es requerido'
      : this.editForm.get(['correo'])?.hasError('email')
      ? 'correo invalido'
      : '';
  }
  mensajeErrorCuil(): string {
    return this.editForm.get(['cuil'])?.hasError('required') ? 'El cuil es requerido' : '';
  }
  mensajeErrorEstablecimiento(): string {
    return this.editForm.get(['establecimiento'])?.hasError('required') ? 'El establecimiento es requerido' : '';
  }
  mensajeErrorGrupoTrabajo(): string {
    return this.editForm.get(['grupoTrabajo'])?.hasError('required') ? 'El grupo de trabajo es requerido' : '';
  }

  protected subscribeToSaveResponse(result: Observable<IUsuario>): void {
    result.subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  private createUser(): IUsuario {
    return {
      ...new Usuario(),
      nombre: this.editForm.get(['nombre'])!.value,
      nombreCompleto: this.editForm.get(['nombreComleto'])!.value,
      correo: this.editForm.get(['correo'])!.value,
      cuil: this.editForm.get(['cuil'])!.value,
      establecimiento: this.editForm.get(['establecimiento'])!.value,
      grupoTrabajo: this.editForm.get(['grupoTrabajo'])!.value,
    };
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError(): void {
    this.isSaving = false;
  }
}
