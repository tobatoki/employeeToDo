import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { ListService } from '../../services/list/list.service';
import { List } from '../../../types';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [FormsModule, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.less',
  encapsulation:ViewEncapsulation.None,
})
export class ListComponent implements OnInit {
  lists: List[] = [];
  listname: string = '';
  listID!: number;
  employeeID!: number;

  constructor(private ListService: ListService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.employeeID = Number(this.route.snapshot.paramMap.get('employeeID'));
    this.ListService.getEmployeeList(this.employeeID).subscribe({
      next: (lists) => this.lists = lists,
      error: (err) => console.error(err),
    });
  }

  createList(): void {
    this.ListService.addEmployeeList(this.listname, this.employeeID).subscribe({
      next: (res) => {
        console.log('List created', res);
        this.listname = ''
        this.ngOnInit();
      },
      error: (err) => console.error('Error creating list:', err),
    });
  }

  deleteList(): void {
    this.ListService.deleteEmployeeList(this.listname, this.employeeID).subscribe({
      next: (res) => {
        this.listname = ''
        this.ngOnInit();
      },
      error: (err) => console.error('Error creating list:', err),
    })
  }
}