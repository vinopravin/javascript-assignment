import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CitySelectionComponent } from './city-selection/city-selection.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { AdminModule } from './admin/admin.module';

const routes: Route[] = [
	{ path: '', component: CitySelectionComponent },
	{ path: 'list', component: RestaurantListComponent },
	{ path: 'details/:restaurantId', component: RestaurantDetailsComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'admin', loadChildren: (() => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)) },
	{ path: '**', redirectTo: '' }
]

@NgModule({
	declarations: [
		AppComponent,
		CitySelectionComponent,
		RestaurantListComponent,
		RestaurantDetailsComponent,
		LoginComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		NgxPaginationModule,
		Ng2SearchPipeModule,
		Ng2OrderModule,
		AdminModule,
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
		RouterModule.forRoot(routes)
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
