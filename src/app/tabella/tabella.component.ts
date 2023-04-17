import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';


@Component({
  selector: 'app-tabella',
  templateUrl: './tabella.component.html',
  styleUrls: ['./tabella.component.css']
})
export class TabellaComponent {
  displayedColumns: string[] = ['id', 'birthDate', 'firstName', 'lastName','gender','hireDate','cestino'];
  dataSource = [];
  links: any;
  
  //è già un json
  currentElement: any ={}; //sono gli input 

  //ultima url di dati caricata
  currentUrl: string = "http://localhost:8080/employees";


  constructor(private employeeService: EmployeeService){
    this.loadData(this.currentUrl);
    
  }

  loadData(url: string) {
    this.currentUrl = url;
    this.employeeService.get(url).subscribe(
        data => {
            console.log(data);
            this.dataSource = data._embedded.employees;
            this.links = data._links;
        }
    )
  }

  addFn() {
    //edit
    if (this.currentElement.id) {
      this.employeeService.put(this.currentElement._links.self.href, this.currentElement).subscribe(
        (data) => {
          this.loadData(this.currentUrl);
        }
      )  
    } else { //add
      this.employeeService.post("http://localhost:8080/employees", this.currentElement).subscribe(
        (data) => {
          this.loadData(this.links.last.href);
        }
      )  
    }
  }

  deleteFn(urlWithId: string) {
    this.employeeService.delete(urlWithId).subscribe( (data) => {
      this.loadData(this.currentUrl);
      }
    );
  }
  
  onSubmit(input:any) {
    alert("Entered Email id : " + input.id);
  }

  next() {
    this.loadData(this.links.next.href);
  }

  prev() {
    this.loadData(this.links.prev.href);
  }

  last() {
    this.loadData(this.links.last.href);
  }

  first() {
    this.loadData(this.links.first.href);
  }

  self() {
    this.loadData(this.links.self.href);
  }




}

