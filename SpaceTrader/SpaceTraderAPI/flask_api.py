import math
import random
import json
from flask import Flask
from flask import request
from flask_pymongo import PyMongo

tech_levels = ["BABY", "TODDLER", "CHILD",
               "ADOLESCENT", "ANGSTY_TEEN", "ADULTS", "GECHS"]
name_list = ["Zathura", "Belinda", "Sopg", "Wvie3",
             "Rhyne", "Kwat", "Moonir", "Dohoon", "Sox", "Shooz"]
items_list = ["Cotton Candy", "Ducks", "Medicine", "Wood", "Steel",
              "Computer", "Fizzle Rocks", "Jingle Jangle", "Linear Algebra", "Robustness"]


class Ship:
    def __init__(self, ship_type, cargo, fuel, health):
        self.ship_type = ship_type
        self.cargo = cargo
        self.fuel = fuel
        self.health = health


class Region:
    def __init__(self, n, t, x, y):
        self.name = n
        self.tech_level = t
        self.xcoord = x
        self.ycoord = y

    def __str__(self):
        string = "" + self.name + " " + \
            str(self.tech_level) + " " + \
            str(self.xcoord) + " " + str(self.ycoord)
        return string


class Player:
    def __init__(self, name, stats, creds, region):
        self.name = name
        self.pilot = stats["pilot"]
        self.fighter = stats["fighter"]
        self.merchant = ["merchant"]
        self.engineer = ["engineer"]
        self.creds = creds
        self.region = region

    def __str__(self):
        string = "" + self.name + self.pilot + self.fighter + \
            self.merchant + self.engineer + self.creds + self.region
        return string


class Universe:
    def __init__(self, regions):
        self.regions = regions


class Police:
    def __init__(self):
        self.pilot = random.randint(1, 20)
        self.fighter = random.randint(1, 20)


app = Flask(__name__)
app.config['MONGO_DBNAME'] = 'tradeDB'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/tradeDB'
mongo = PyMongo(app)

accountColl = mongo.db.accounts
universeColl = mongo.db.universes


@app.route('/api/newgame', methods=['GET'])
def new_game():
    reg = 0
    regions = []
    xcoords = []
    ycoords = []
    xrand = random.randint(1, 200)
    yrand = random.randint(1, 200)
    tech = "BABY"
    response = ""
    for item in name_list:
        while found_val(xrand, yrand, xcoords, ycoords):
            xrand = random.randint(1, 200)
            yrand = random.randint(1, 200)
        xcoords.append(xrand)
        ycoords.append(yrand)
        tech = random.choice(tech_levels)
        reg = Region(item, tech, xrand, yrand)
        regions.append(reg)
    for region in regions:
        response = response + json.dumps(region.__dict__) + ","
    response = '[' + response[0:len(response) - 1] + ']'
    # id = universeColl.insert(universe.__dict__)
    return response


@app.route('/api/newShip', methods=['GET'])
def new_ship():
    ship_type = request.args.get("ship_type")
    cargo = request.args.get("cargo")
    fuel = request.args.get("fuel")
    health = request.args.get("health")
    ship = Ship(ship_type, cargo, fuel, health)
    return json.dumps(ship.__dict__)


def found_val(xval, yval, arrx, arry):
    i = 0
    while i < len(arrx):
        xval2 = arrx[i]
        yval2 = arry[i]
        if math.sqrt((xval2 - xval) ** 2 + (yval2 - yval) ** 2) <= 5:
            return True
        i = i + 1
    return False


@app.route('/api/newchar', methods=['GET'])
def new_chart():
    name = request.args.get("name")
    creds = request.args.get("credits")
    start = request.args.get("start")
    stats = {}
    stats["merchant"] = request.args.get("merchant")
    stats["engineer"] = request.args.get("engineer")
    stats["fighter"] = request.args.get("fighter")
    stats["pilot"] = request.args.get("pilot")
    player = Player(name, stats, creds, start)
    return json.dumps(player.__dict__)


@app.route('/api/canTravel', methods=['GET'])
def can_travel():
    curr_x = int(request.args.get("curr_x"))
    curr_y = int(request.args.get("curr_y"))
    to_x = int(request.args.get("to_x"))
    to_y = int(request.args.get("to_y"))
    pilot_level = int(request.args.get("pilot_level"))
    curr_fuel = float(request.args.get("fuel"))
    travel = "no"
    response = {}
    distance = math.sqrt((curr_x - to_x)**2 + (curr_y - to_y)**2)
    discount = pilot_level * 0.02
    fuel_cost = distance - discount * distance
    response["fuel_cost"] = fuel_cost
    if curr_fuel < fuel_cost:
        travel = "no"
    else:
        travel = "yes"
    response["can_travel"] = travel
    return json.dumps(response)


@app.route('/api/marketGen', methods=['GET'])
def market_generation():
    response = ""
    items_dict = {}
    items = ""
    curr_tech = request.args.get("curr_tech")
    merchant_level = int(request.args.get("merchant_level"))
    # if (curr_tech == "BABY" or curr_tech == "TODDLER"):
    #     tech_multiplier = 1.04
    # elif (curr_tech == "CHILD" or curr_tech == "ADOLESCENT"):
    #     tech_multiplier = 1.07
    # elif (curr_tech == "ANGSTY_TEEN" or curr_tech == "ADULTS"):
    #     tech_multiplier = 1.10
    # elif (curr_tech == "GECHS"):
    #     tech_multiplier = 1.16
    merch_multiplier = 1 - (merchant_level * .05)

    for item in items_list:
        if item in ('Cotton Candy', 'Ducks', 'Medicine') and \
            (curr_tech in ('TODDLER', 'BABY')):
            items_dict["item"] = item
            items_dict["cost"] = math.floor(
                random.randint(3, 10) * merch_multiplier)
            items = items + json.dumps(items_dict) + ","
            items_dict = {}
        elif item in ('Wood', 'Steel'):
            items_dict["item"] = item
            items_dict["cost"] = math.floor(
                random.randint(3, 15) * merch_multiplier)
            items = items + json.dumps(items_dict) + ","
            items_dict = {}
        elif item in ('Computer', 'Jingle Jangle', 'Fizzle Rocks') and \
            (curr_tech in ('CHILD', 'ADOLESCENT', 'ADULTS')):
            items_dict["item"] = item
            items_dict["cost"] = math.floor(
                random.randint(10, 30) * merch_multiplier)
            items = items + json.dumps(items_dict) + ","
            items_dict = {}
        elif item in ('Linear Algebra', 'Robustness') and (curr_tech == "GECHS"):
            items_dict["item"] = item
            items_dict["cost"] = math.floor(
                random.randint(25, 50) * merch_multiplier)
            items = items + json.dumps(items_dict) + ","
            items_dict = {}
    response = '[' + items[0:len(items) - 1] + ']'
    return response


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
    # https://localhost:127.0.0.1:8080
