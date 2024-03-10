import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GuiComponent } from './gui/gui.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { DuplicateFinderComponent } from './duplicate-finder/duplicate-finder.component';


@NgModule({
  declarations: [
    AppComponent,
    GuiComponent,
    HomeComponent,
    DuplicateFinderComponent 
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatInputModule, 
    MatFormFieldModule,
    MatIconModule,
    AppRoutingModule,
    RouterModule.forRoot([])
  ],
  exports: [
    BrowserModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
