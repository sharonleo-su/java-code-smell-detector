
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuiComponent } from './gui/gui.component';
import { HomeComponent } from './home/home.component';
import { DuplicateFinderComponent } from './duplicate-finder/duplicate-finder.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', redirectTo: '/home' },
  { path: 'duplicate-finder', component: DuplicateFinderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
