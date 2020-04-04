import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CharCreationComponent } from "./char-creation/char-creation.component";
import { IngameComponent } from "./ingame/ingame.component";
import { MarketComponent } from "./market/market.component";

const routes: Routes = [
  { path: "char-creation", component: CharCreationComponent },
  { path: "ingame", component: IngameComponent },
  { path: "market", component: MarketComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
