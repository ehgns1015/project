import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {}

  newChar(
    name,
    pilot,
    fighter,
    merchant,
    engineer,
    credits
  ): Observable<String> {
    return this.http.get<String>(
      "/api/newchar?name=" +
        name +
        "&pilot=" +
        pilot +
        "&fighter=" +
        fighter +
        "&merchant=" +
        merchant +
        "&engineer=" +
        engineer +
        "&credits=" +
        credits +
        "&start=Wvie3"
    );
  }

  newUniverse(): Observable<Region[]> {
    return this.http.get<Region[]>("/api/newgame");
  }

  newShip(name, health, c_capacity, f_capacity): Observable<Ship> {
    return this.http.get<Ship>(
      "/api/newShip?ship_type=" +
        name +
        "&health=" +
        health +
        "&cargo=" +
        c_capacity +
        "&fuel=" +
        f_capacity
    );
  }

  canTravel(xcoord, ycoord, tox, toy, pilot, fuel): Observable<Travel> {
    return this.http.get<Travel>(
      "/api/canTravel?curr_x=" +
        xcoord +
        "&curr_y=" +
        ycoord +
        "&to_x=" +
        tox +
        "&to_y=" +
        toy +
        "&pilot_level=" +
        pilot +
        "&fuel=" +
        fuel
    );
  }

  marketGen(tech_level, merchant): Observable<Item[]> {
    return this.http.get<Item[]>(
      "/api/marketGen?curr_tech=" + tech_level + "&merchant_level=" + merchant
    );
  }
}

export interface Region {
  name: String;
  tech_level: String;
  xcoord: number;
  ycoord: number;
}

export interface Item {
  name: String;
  price: number;
}

export interface Ship {
  ship_type: String;
  cargo: number;
  fuel: number;
  health: number;
}

export interface Travel {
  fuel_cost: number;
  can_travel: String;
}
