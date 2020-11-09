import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	constructor(private location: Location) { }

	ngOnInit(): void {
	}
	
	goBack() {
		this.location.back();
	}

}
