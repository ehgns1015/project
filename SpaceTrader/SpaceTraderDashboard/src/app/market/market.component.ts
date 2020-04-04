import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../api.service";
import { Globals } from "../globals";

@Component({
  selector: "app-market",
  templateUrl: "./market.component.html",
  styleUrls: ["./market.component.css"]
})
export class MarketComponent implements OnInit {
  constructor(
    private router: Router,
    private apiService: ApiService,
    globals: Globals
  ) {
    this.globals = globals;
  }

  globals: Globals;
  public items;
  public total_cost: number = 0;
  public total_counter: number = 0;
  public message: String = "";
  public buysell: String;
  public cargoStr: String = "";
  transactions: Transaction[] = [];

  genMarket() {
    var curr_reg: String;
    var merchant_level: number;
    var curr_tech: String;
    var items = [];
    merchant_level = this.globals.player.merchant;
    curr_reg = this.globals.player.location;
    this.globals.regions.forEach(region => {
      if (region.name == curr_reg) {
        curr_tech = region.tech_level;
      }
    });
    var trans = [];
    this.apiService.marketGen(curr_tech, merchant_level).subscribe(data => {
      items = data;
      items.forEach(i => {
        trans.push({
          counter: 0,
          item: i.item,
          cost: i.cost
        });
      });
      this.transactions = trans;
    });
  }

  increment(x) {
    if (this.transactions[x].counter < 10) {
      this.transactions[x].counter++;
      this.total_counter++;
      this.total_cost += this.transactions[x].cost;
    }
  }

  decrement(x) {
    if (this.transactions[x].counter > 0) {
      this.transactions[x].counter--;
      this.total_counter--;
      this.total_cost -= this.transactions[x].cost;
    }
  }

  reset() {
    this.total_cost = 0;
    this.total_counter = 0;
    this.transactions.forEach(trans => {
      trans.counter = 0;
    });
  }

  buy_sell() {
    if (this.total_counter == 0) {
      this.message = "Error: Empty cart!";
    } else if (this.buysell == "Buy") {
      this.buy();
    } else if (this.buysell == "Sell") {
      this.sell();
    } else {
      this.message = "Error: Select Transaction Type";
    }
    this.cargoStr = this.globals.ship.cargo.toString();
    console.log(this.globals.ship.cargo);
  }

  buy() {
    if (
      this.globals.player.credits >= this.total_cost &&
      this.globals.ship.cargo_capacity - this.globals.ship.cargo.length >=
        this.total_counter
    ) {
      this.transactions.forEach(trans => {
        if (trans.counter > 0) {
          for (let index = 0; index < trans.counter; index++) {
            this.globals.ship.cargo.push(trans.item);
          }
        }
        this.globals.cargo_count[trans.item] = trans.counter;
      });
      this.globals.player.credits -= this.total_cost;
      this.message = this.total_counter + " items purchased!";
      this.reset();
    } else {
      this.message = "Error: Fix your cart!";
    }
  }

  sell() {
    this.transactions.forEach(trans => {
      if (trans.counter > this.globals.cargo_count[trans.item]) {
        if (this.globals.cargo_count[trans.item] == 0) {
          this.total_cost -= trans.cost * trans.counter;
          this.total_counter -= trans.counter;
          trans.counter = 0;
        } else {
          this.total_cost -=
            trans.cost * (trans.counter - this.globals.cargo_count[trans.item]);
          this.total_counter -=
            trans.counter - this.globals.cargo_count[trans.item];
          trans.counter -= this.globals.cargo_count[trans.item];
        }
      }
      if (trans.counter > 0) {
        for (let index = 0; index < trans.counter; index++) {
          var i = this.globals.ship.cargo.indexOf(trans.item);
          this.globals.ship.cargo.splice(i, 1);
        }
      }
    });
    this.globals.player.credits += this.total_cost;
    this.message = "items sold!";
    this.reset();
  }

  ngOnInit() {
    this.genMarket();
  }

  viewMap() {
    this.router.navigateByUrl("/ingame");
  }

  displayedColumns: string[] = ["count", "item", "cost"];
}
export interface Transaction {
  counter: number;
  item: string;
  cost: number;
}
