import { Component, ViewEncapsulation } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';
import { Employees } from '../../../types';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule, MatButtonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.less',
  encapsulation:ViewEncapsulation.None,
})

export class EmployeeComponent {
  employees: Employees[] = [];
  employeeName: string = '';
  employeeID!: number;

  constructor(private EmployeeService: EmployeeService, private router: Router) {
  }

  getEmployees(): void {
    this.EmployeeService.getAllEmployees().subscribe({
      next: (employees) => this.employees = employees,
      error: (err) => console.error(err),
    });
  }

  createEmployee(): void {
    if (this.employeeName.trim()) {
      this.EmployeeService.addEmployee(this.employeeName).subscribe({
        next: (res) => {
          console.log('Employee created:', res);
          this.employeeName = '';
          this.getEmployees();
        },
        error: (err) => console.error('Error creating employee:', err),
      });
    } else {
      console.error('Employee name cannot be empty.');
    }
  }

  deleteEmployee(): void {
    this.EmployeeService.deleteEmployee(this.employeeID).subscribe({
      next: (res) => {
        console.log('Employee deleted', res.employeeID, res.employeeName);
        this.employeeID = 0;
        this.getEmployees();
      },
      error: (err) => console.error('Cannot delete employee', err),
    });
  }

  navigateToList(employeeID: number): void {
    this.router.navigate([`${employeeID}/list`]);
  }
}
