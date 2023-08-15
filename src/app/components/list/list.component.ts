import { Component } from '@angular/core';
import { Task } from 'src/app/task.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  
  task: Task[] = [];
  newTaskName: string = '';
  editedTaskIndex: number = -1;
  editedTaskName: string = '';
  validation: string = "";
  check: boolean = false;
  
  constructor() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.task = JSON.parse(storedTasks);
    }
  }
  
  
  onDrop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.task, event.previousIndex, event.currentIndex);
    localStorage.setItem('tasks', JSON.stringify(this.task));
  }

  onDragStarted(index: number) {
    this.editedTaskIndex = index;
    this.cancelEdit();
  }

  add() {
    const newTask: Task = {
      id: this.task.length + 1,
      name: this.newTaskName,
      check: false
    };

    if(this.newTaskName.length > 1){
      this.task.push(newTask);
      this.newTaskName = '';
      localStorage.setItem("tasks", JSON.stringify(this.task));
      this.validation = ""
    }else{
      this.validation = "Task must have at least 2 characters"
    }
  }

  remove(index: number) {
    this.task.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(this.task));
  }

  edit(index: number) {
    this.editedTaskIndex = index;
    this.editedTaskName = this.task[index].name;
    this.check = this.task[index].check;
    const modal = document.getElementById('editModal');
    if (modal) {
      modal.style.display = 'flex';
    }
  }
  
  
  cancelEdit() {
    this.editedTaskIndex = -1;
    this.editedTaskName = '';
    const modal = document.getElementById('editModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  saveEdit() {
    if (this.editedTaskIndex !== -1) {
      this.task[this.editedTaskIndex].name = this.editedTaskName;
      this.task[this.editedTaskIndex].check = this.check;
      localStorage.setItem('tasks', JSON.stringify(this.task));
      this.cancelEdit();
    }
  }
  

}
