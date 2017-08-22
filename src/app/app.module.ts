import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/Http';
import { MaterializeDirective } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { HbComponent } from './components/hb.component';
import { HbService } from './services/hb.service';

@NgModule({
  declarations: [
    AppComponent, 
    HbComponent,
    MaterializeDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [HbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
