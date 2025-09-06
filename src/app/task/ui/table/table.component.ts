import { Component, inject, input } from '@angular/core';
import { Task, TaskService } from '../../data-access/task.service';
import { RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-table',
  imports: [RouterLink],
  templateUrl: './table.component.html',
  styles: ``,
})
export class TableComponent {
  tasks = input.required<Task[]>();
  private _taskService = inject(TaskService);

  delete(id: string) {
    this._taskService.loading.set(true);
    this._taskService.delete(id).then(() => {
      toast.success('Tarea eliminada correctamente');
      this._taskService.loading.set(false);
    });
  }
}
