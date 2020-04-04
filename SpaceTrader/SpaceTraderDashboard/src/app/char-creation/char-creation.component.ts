import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";

import { Globals } from "../globals";
import { Router } from "@angular/router";

@Component({
  selector: "app-char-creation",
  templateUrl: "./char-creation.component.html",
  styleUrls: ["./char-creation.component.css"]
})
export class CharCreationComponent implements OnInit {
  constructor(
    private router: Router,
    private _apiService: ApiService,
    globals: Globals
  ) {
    this.globals = globals;
  }

  public difficulty: string;
  public name: string;
  public pilot: string;
  public fighter: string;
  public merchant: string;
  public engineer: string;
  public pilotN: number;
  public fighterN: number;
  public merchantN: number;
  public engineerN: number;
  credits;
  globals: Globals;
  public level;
  public continue;

  ngOnInit() {}

  initiate() {
    if (this.difficulty === "Easy") {
      this.credits = 1500;
      this.level = 16;
    } else if (this.difficulty === "Medium") {
      this.credits = 1000;
      this.level = 12;
    } else if (this.difficulty === "Hard") {
      this.credits = 500;
      this.level = 8;
    } else {
      this.level = -7;
    }
    if (Number.isNaN(+this.pilot)) {
      this.pilotN = 0;
    } else {
      this.pilotN = +this.pilot;
    }
    if (Number.isNaN(+this.fighter)) {
      this.fighterN = 0;
    } else {
      this.fighterN = +this.fighter;
    }
    if (Number.isNaN(+this.merchant)) {
      this.merchantN = 0;
    } else {
      this.merchantN = +this.merchant;
    }
    if (Number.isNaN(+this.engineer)) {
      this.engineerN = 0;
    } else {
      this.engineerN = +this.engineer;
    }
    if (
      this.engineerN + this.pilotN + this.fighterN + this.merchantN ==
      this.level
    ) {
      this.continue = true;
    } else {
      this.continue = false;
    }
    if (this.continue) {
      this.globals.player = {
        name: this.name,
        pilot: this.pilotN,
        fighter: this.fighterN,
        merchant: this.merchantN,
        engineer: this.engineerN,
        credits: +this.credits,
        location: "Wvie3",
        difficulty: this.difficulty
      };
      console.log(this.globals.player);
      this.globals.regions = [];
      var datum = [];
      this._apiService.newUniverse().subscribe(data => {
        datum = data;
        datum.forEach(item => {
          this.globals.regions.push(item);
        });
        err => {
          console.log(err);
        };
      });
      this._apiService
        .newChar(
          this.name,
          +this.pilotN,
          +this.fighterN,
          +this.merchantN,
          +this.engineerN,
          +this.credits
        )
        .subscribe(
          data => {
            // console.log(data);
          },
          err => {
            console.log(err);
          }
        );
      this._apiService.newShip("Super-Weh", 20, 20, 1000).subscribe(data => {
        this.globals.ship = {
          name: data.ship_type,
          cargo_capacity: data.cargo,
          cargo: [],
          fuel: data.fuel,
          fuel_capacity: data.fuel,
          health: data.health
        };
        // console.log(this.globals.ship);
      });
      this.router.navigateByUrl("/ingame");
    }
  }
}
