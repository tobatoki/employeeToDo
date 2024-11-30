import { Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { ListComponent } from './components/list/list.component';

export const routes: Routes = [
    {path: '', component:EmployeeComponent},
    { path: ':employeeID/list', component: ListComponent }
];
