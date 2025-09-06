import { Component, inject } from '@angular/core'
import { TableComponent } from '../../ui/table/table.component'
import { RouterModule } from '@angular/router'
import { TaskService } from '../../data-access/task.service'

@Component({
  selector: 'app-task-list',
  imports: [TableComponent, RouterModule],
  templateUrl: './task-list.component.html',
  providers: [TaskService]
})
export default class TaskListComponent {
  taskService = inject(TaskService)
  tasks = this.taskService.index
}
