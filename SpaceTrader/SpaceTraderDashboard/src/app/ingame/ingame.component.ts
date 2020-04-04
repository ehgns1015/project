import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Globals } from "../globals";
import { Region, ApiService } from "../api.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-ingame",
  templateUrl: "./ingame.component.html",
  styleUrls: ["./ingame.component.css"]
})
export class IngameComponent implements OnInit {
  constructor(
    private router: Router,
    globals: Globals,
    private _apiService: ApiService
  ) {
    this.globals = globals;
  }

  @ViewChild("canvas", { static: true }) myCanvas: ElementRef<
    HTMLCanvasElement
  >;

  public context: CanvasRenderingContext2D;
  public globals: Globals;
  public universe;
  public destination;
  public destinationObject: Region;
  nextDest: Region;
  public destinationSelected;
  public curr_x;
  public curr_y;
  public to_x;
  public to_y;
  public travelInfo: travelInfo;
  public destinationTech;
  public destinationArrived;
  public fuel_cost;
  public can_travel;

  private ctx: CanvasRenderingContext2D;

  ngOnInit() {
    // console.log(this.globals.regions);
    this.universe = this.globals.regions;
    this.ctx = this.myCanvas.nativeElement.getContext("2d");
    this.ctx.fillStyle = "blue";
    setTimeout(() => this.displayRegionData(), 500);
    setTimeout(() => (this.destinationArrived = true), 500);
    console.log(this.globals.player);
  }

  animate() {
    const square = new Square(this.ctx);
    this.globals.regions.forEach(item => {
      if (item.name == this.globals.player.location) {
        this.ctx.fillStyle = "red";
        square.draw(item.xcoord, item.ycoord, 7);
      } else if (item.name == this.destination) {
        this.ctx.fillStyle = "green";
        square.draw(item.xcoord, item.ycoord, 7);
      } else {
        this.ctx.fillStyle = "blue";
        square.draw(item.xcoord, item.ycoord, 7);
      }
    });
  }

  selected() {
    this.animate();
    this.destinationSelected = true;
    this.travel();
  }

  travel() {
    this.globals.regions.forEach(item => {
      if (item.name == this.globals.player.location) {
        this.curr_x = item.xcoord;
        this.curr_y = item.ycoord;
      }
      if (item.name == this.destination) {
        this.nextDest = item;
        this.to_y = item.ycoord;
        this.to_x = item.xcoord;
        this.destinationTech = item.tech_level;
      }
    });
    this._apiService
      .canTravel(
        this.curr_x,
        this.curr_y,
        this.to_x,
        this.to_y,
        this.globals.player.pilot,
        this.globals.ship.fuel
      )
      .subscribe(data => {
        this.fuel_cost = Math.round(data.fuel_cost * 100) / 100;
        this.can_travel = data.can_travel;
      });
    // this.displayRegionData();
  }

  confirmTravel() {
    if (this.destinationSelected == true) {
      if (this.globals.ship.fuel - this.fuel_cost >= 0) {
        this.globals.ship.fuel = this.globals.ship.fuel - this.fuel_cost;
        this.globals.player.location = this.destination;
        this.destinationObject = this.nextDest;
        this.destinationSelected = false;
        this.animate();
      }
    }
  }

  displayRegionData() {
    this.globals.regions.forEach(item => {
      if (item.name == this.globals.player.location) {
        this.destinationObject = item;
      }
    });
    this.animate();
  }

  viewMarket() {
    this.router.navigateByUrl("/market");
  }
}

export class Square {
  constructor(private ctx: CanvasRenderingContext2D) {}

  draw(x: number, y: number, z: number) {
    this.ctx.fillRect(x * 2.5, 500 - y * 2.5, z, z);
  }
}

export interface travelInfo {
  destination: String;
  tech_level: String;
  fuel_cost: number;
  can_travel: String;
}
