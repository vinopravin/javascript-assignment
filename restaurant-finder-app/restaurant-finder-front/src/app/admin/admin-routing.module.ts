import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LocationsComponent } from './locations/locations.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'restaurants', component: RestaurantListComponent },
	{ path: 'menus/:restaurantId', component: MenuListComponent },
	{ path: 'locations', component: LocationsComponent },
	{ path: 'users', component: UsersComponent }
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
	],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
