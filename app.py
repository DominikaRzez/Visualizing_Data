import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, and_
from flask import Flask, jsonify, render_template
import configparser
import psycopg2
import ast

parser = configparser.ConfigParser()
parser.read("credentials.conf")

#Database set up
host = parser.get("postgres_configuration","host")
port = parser.get("postgres_configuration","port")
database = parser.get("postgres_configuration","database")
username = parser.get("postgres_configuration","username")
password = parser.get("postgres_configuration","password")

rds_connection_string = f'{username}:{password}@{host}:{port}/{database}'
engine = create_engine(f'postgresql://{rds_connection_string}')

session=Session(engine)


conn_string = "host='localhost' dbname='Birmingham' user='postgres' password='postgres'"
conn = psycopg2.connect(conn_string)
cursor = conn.cursor()

# Flask Setup
app = Flask(__name__)

#Landing page
@app.route("/")
def welcome():
    return render_template("index.html")

@app.route("/maps")
def maps():
    return render_template("map.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@app.route("/api/metadata")
def metadata_by_city():
    cursor.execute("SELECT * FROM metadata")
    rows = cursor.fetchall()
    allData = {}
    for row in rows:
        allData[row[0]]={
            "ethnicities": ["black", "white", "asian", "other"],
            "ethcount": [row[1], row[3], row[4], row[2]],
            "Crimes": ["Anything to threaten or harm anyone", "Articles for use in criminal damage", 
                "Articles for use in theft", "Controlled drugs", "Evidence of offences under the Act", 
                "Firearms", "Fireworks", "Offensive weapons", "Psychoactive substances", "Stolen Goods"],
            "CrimeCount": [row[8], row[14], row[15], row[9], row[11], row[12], row[16], row[10], row[13], row[7]],
               "Sex": ["Male", "Female"],
            "PopCount": [row[5], row[6]],
        }
    return jsonify(allData)

#Setting route to return list of ethnicities
@app.route("/api/ethnicities")
def ethnicity_by_city():
    cursor.execute("SELECT * FROM ethnicity_by_city")
    rows = cursor.fetchall()
    eth = {}
    for row in rows:
        eth[row[0]]={
            "ethnicities": ["black", "white", "asian", "other"],
            "ethcount": [row[1], row[3], row[4], row[2]],
        }
    return jsonify(eth)

#Setting route to return list of age ranges
@app.route("/api/age")
def age_by_city():
    cursor.execute("SELECT * FROM age_range_by_city")
    age_range = cursor.fetchall()
    ages = []
    for age in age_range:
        age_dict={}
        age_dict["City"] = age[0]
        age_dict["10-17"] = age[1]
        age_dict["18-24"] = age[2]
        age_dict["25-34"] = age[3]
        age_dict["over 34"] = age[4]
        age_dict["Total Number of Stops and Searches"] = age[5]
        ages.append(age_dict)

    return jsonify(ages)

#Setting route to return list of genders
@app.route("/api/gender")
def gender_by_city():
    cursor.execute("SELECT * FROM Male_Female_Split_by_City")
    genders = cursor.fetchall()
    gender_split = {}
    for gender in genders:
        gender_split[gender[0]]={
            "Sex": ["Male", "Female"],
            "PopCount": [gender[1], gender[2]],
            "TotalStops": gender[3]
        }
    return jsonify(gender_split)

#Setting route to return list of objects of searches
@app.route("/api/search_object")
def search_object_by_city():
    cursor.execute("SELECT * FROM object_of_search")
    search_object = cursor.fetchall()
    search_reasons = {}
    for object in search_object:
        search_reasons[object[0]] = {
            "Crimes": ["Anything to threaten or harm anyone", "Articles for use in criminal damage", 
                "Articles for use in theft", "Controlled drugs", "Evidence of offences under the Act", 
                "Firearms", "Fireworks", "Offensive weapons", "Psychoactive substances", "Stolen Goods"],
            "CrimeCount": [object[2], object[8], object[9], object[3], object[5], object[6], object[10],
               object[4], object[7], object[1]]
        }
    return jsonify(search_reasons)

#Setting route to return the geojson
@app.route("/api/locations")
def map():
    cursor.execute("SELECT * FROM selected_locations")
    locations = cursor.fetchall()
    geojson_dict = {}
    geojson_dict["features"] = []
    for location in locations:
        features_dict = {}
        features_dict["geometry"] = {
            "type" : "Point",
            "coordinates" : [float(ast.literal_eval("{"+location[6][-25:])["longitude"]), float(ast.literal_eval(location[6][:24]+"}")["latitude"])]
        }
        features_dict["properties"] = {
        "City" : location[0],
        "Object_of_search": location[5]
        }
        features_dict["type"] = "Feature"
        geojson_dict["features"].append(features_dict)
    geojson_dict["type"] = "Feature Collection"
    return jsonify(geojson_dict)

if __name__ == "__main__":
    app.run(debug=True)
