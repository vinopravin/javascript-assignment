import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuService } from 'src/app/_services/menu.service';
import { RestaurantService } from 'src/app/_services/restaurant.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'app-menu-list',
	templateUrl: './menu-list.component.html',
	styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

	@ViewChild('myModal') myModal: ElementRef;
	@ViewChild('removeModal') removeModal: ElementRef;
	@ViewChild('closeBtn1') closeBtn1: ElementRef;
	@ViewChild('closeBtn2') closeBtn2: ElementRef;

	restaurantId: string;
	menuList = [];
	state: string;
	selectedCity: any = {
		name: '',
		state: ''
	};
	itemDetails = {
		name: '',
		description: '',
		restaurant_id: ''
	}
	restaurantsList = []
	selectedAction = ''
	constructor(private location: Location,
		private route: ActivatedRoute,
		public restaurantService: RestaurantService,
		public menuService: MenuService) { }

	ngOnInit(): void {
		this.route.paramMap.subscribe((params: Params) => {
			this.restaurantId = params.params['restaurantId'];
			this.menuService.getMenu(this.restaurantId).then((menus) => {
				this.menuList = menus
			})
		})
		this.restaurantService.getRestaurants().then((locations) => {
			this.restaurantsList = this.restaurantService.restaurantList;
		});
	}

	openModal(option, itemDetails: any = {}) {
		if (option === 'remove') {
			this.selectedAction = 'Remove';
			this.itemDetails = itemDetails
			this.removeModal.nativeElement.style.display = 'block';
		} else {
			this.myModal.nativeElement.style.display = 'block';
			if (option == 'add') {
				this.selectedAction = 'Add';
				this.state = '';
				this.itemDetails = {
					name: '',
					description: '',
					restaurant_id: this.restaurantId
				}
			} else if (option === 'update') {
				this.itemDetails = itemDetails
				this.selectedAction = 'Update';
			}
		}
	}

	closeModal(option) {
		if (option === 'remove') {
			this.removeModal.nativeElement.style.display = 'none';
		} else {
			this.myModal.nativeElement.style.display = 'none';
		}
	}

	addItem() {
		this.menuService.updateMenu(this.itemDetails)
			.then(() => {
				this.closeModal('')
			})
	}

	removeItem() {
		this.menuService.removeMenu(this.itemDetails)
			.then(() => {
				this.closeModal('remove')
			})
	}

	goBack() {
		this.location.back()
	}

}
