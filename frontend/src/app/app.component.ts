import { Component } from '@angular/core';
import { EmployeeComponent } from "./components/employee/employee.component";
import { ListComponent } from "./components/list/list.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  providers: [EmployeeComponent, ListComponent]
})
export class AppComponent {

  constructor() { }


}
