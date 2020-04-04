import { Injectable } from "@angular/core";
import { Region } from "./api.service";

@Injectable()
export class Globals {
  player: Player;
  universe: Universe;
  regions: Region[];
  ship: Ship;
  cargo_count: {[name: string]: number} = {};
}

export interface Player {
  name: String;
  pilot: number;
  fighter: number;
  merchant: number;
  engineer: number;
  credits: number;
  location: String;
  difficulty: String;
}

export interface Ship {
  name: String;
  health: number;
  cargo_capacity: number;
  cargo: String[];
  fuel_capacity: number;
  fuel: number;
}

export interface Universe {
  regions: String;
}
