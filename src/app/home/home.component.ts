import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.http.get('https://www.datos.gov.co/resource/66cz-mgrg.json').subscribe(
      (response: any) => {
        this.data = response;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
