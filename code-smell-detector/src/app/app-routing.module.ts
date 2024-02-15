// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuiComponent } from './gui/gui.component';

const routes: Routes = [
  { path: '', component: GuiComponent },
  // Add more routes if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
