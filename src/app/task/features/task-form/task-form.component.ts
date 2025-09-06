import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toast } from 'ngx-sonner';
import { Router, RouterModule } from '@angular/router';
import { TaskCreate, TaskService } from '../../data-access/task.service';
import { AuthStateService } from '../../../auth/shared/data-access/auth-state.service';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './task-form.component.html',
  providers: [TaskService],
})
export default class TaskFormComponent {
  private _authState = inject(AuthStateService);
  private _formBuilder = inject(FormBuilder);
  private _taskService = inject(TaskService);
  private _router = inject(Router);

  loading = signal(false);
  editing = signal(false);
  idTask = input.required<string>();

  form = this._formBuilder.group({
    title: this._formBuilder.control(
      { value: '', disabled: this.loading() },
      Validators.required,
    ),
    completed: this._formBuilder.control(
      { value: false, disabled: this.loading() },
      Validators.required,
    ),
  });

  constructor() {
    effect(() => {
      if (this.idTask()) {
        this.loading.set(true);
        this._taskService.getDocument(this.idTask()).then((task) => {
          this.form.patchValue(task.data() as TaskCreate);
          this.editing.set(true);
        });
        this.loading.set(false);
        return;
      }
    });
  }

  async submit() {
    this.loading.set(true);
    if (this.editing()) {
      this._taskService
        .update(this.idTask(), this.form.value as TaskCreate)
        .then(() => {
          toast.success('Tarea actualizada');
          this.form.reset();
          this.form.get('completed')?.setValue(false);
          this._router.navigateByUrl('/tasks');
          this.loading.set(false);
        })
        .catch(() => {
          toast.error('Error al actualizar la tarea');
          this.loading.set(false);
        });
      return;
    }

    this._taskService
      .create({
        ...this.form.value,
        userId: this._authState.currentUser!.uid,
      } as TaskCreate)
      .then(() => {
        toast.success('Tarea creada');
        this.form.reset();
        this.form.get('completed')?.setValue(false);
        this._router.navigateByUrl('/tasks');
        this.loading.set(false);
      })
      .catch(() => {
        toast.error('Error al crear la tarea');
        this.loading.set(false);
      });
  }
}
