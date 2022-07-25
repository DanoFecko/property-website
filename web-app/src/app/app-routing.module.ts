import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyListComponent } from './pages/property-list/property-list.component';
import { HomeComponent } from './pages/home/home.component';
import { CreatePropertyComponent } from './pages/create-property/create-property.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'property-list', component: PropertyListComponent},
  {path: 'create-property', component: CreatePropertyComponent},
  {path: 'edit/:propertyId', component: CreatePropertyComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
