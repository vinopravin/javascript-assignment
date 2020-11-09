import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild('myModal') myModal: ElementRef;
  @ViewChild('removeModal') removeModal: ElementRef;

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  openModal(option){
    if(option === 'remove') {
      this.removeModal.nativeElement.style.display = 'block';
    }else {
      this.myModal.nativeElement.style.display = 'block';
    }
  }

  closeModal(option){
    if(option === 'remove') {
      this.removeModal.nativeElement.style.display = 'none';
    }else {
      this.myModal.nativeElement.style.display = 'none';
    }
  }

  goBack(){
    this.location.back()
  }
}
