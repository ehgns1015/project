import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CharCreationComponent } from "./char-creation/char-creation.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from "@angular/material";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatTableModule } from "@angular/material/table";

import { Globals } from "./globals";
import { IngameComponent } from "./ingame/ingame.component";
import { RouterModule } from "@angular/router";
import { MarketComponent } from "./market/market.component";

@NgModule({
  declarations: [
    AppComponent,
    CharCreationComponent,
    IngameComponent,
    MarketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatTableModule
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule {}
