import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	constructor(private location: Location) { }

	ngOnInit(): void {
	}
	goBack() {
		this.location.back()
	}

}
