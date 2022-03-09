import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, and_
from flask import Flask, jsonify, render_template
import configparser
import psycopg2

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
    return (
        f"Welcome to the Stop and Search API!<br/>"
    )

#Setting route to return list of ethnicities
@app.route("/api/ethnicities")
def ethnicity_by_city():
    cursor.execute("SELECT * FROM ethnicity_by_city")
    rows = cursor.fetchall()
    eth=[]
    for row in rows:
        eth_dict={}
        eth_dict["City"] = row[0]
        eth_dict["Black"] = row[1]
        eth_dict["Other"] = row[2]
        eth_dict["White"] = row[3]
        eth_dict["Asian"] = row[4]
        eth_dict["Total Number of Stops and Searches"] = row[5]
        eth.append(eth_dict)

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
    gender_split = []
    for gender in genders:
        gender_dict={}
        gender_dict["City"] = gender[0]
        gender_dict["Male"] = gender[1]
        gender_dict["Female"] = gender[2]
        gender_dict["Total Number of Stops and Searches"] = gender[3]
        gender_split.append(gender_dict)

    return jsonify(gender_split)

#Setting route to return list of objects of searches
@app.route("/api/search_object")
def search_object_by_city():
    cursor.execute("SELECT * FROM object_of_search")
    search_object = cursor.fetchall()
    search_reasons = []
    for object in search_object:
        object_dict={}
        object_dict["City"] = object[0]
        object_dict["Stolen Goods"] = object[1]
        object_dict["Anything to threaten or harm anyone"] = object[2]
        object_dict["Controlled drugs"] = object[3]
        object_dict["Offensive weapons"] = object[4]
        object_dict["Evidence of offences under the Act"] = object[5]
        object_dict["Firearms"] = object[6]
        object_dict["Psychoactive substances"] = object[7]
        object_dict["Articles for use in criminal damage"] = object[8]
        object_dict["Articles for use in theft"] = object[9]
        object_dict["Fireworks"] = object[10]
        search_reasons.append(object_dict)

    return jsonify(search_reasons)

#Setting route to return the geojson
@app.route("/api/locations")
def map():
    cursor.execute("SELECT * FROM stop_and_search")
    locations = cursor.fetchall()
    map_geojson = []
    geojson_dict = {}
    geojson_dict["type"] = "Feature Collection"
    geojson_dict["features"] = []
    for location in locations:
        features_dict = {}
        features_dict["type"] = "Feature"
        features_dict["properties"] = {
        "City" : location[0],
        "Object of search": location[5]
        }
        geojson_dict["features"].append(features_dict)
        geometry = {}
        geometry["type"] = "Point"
        geometry["coordinates"] = location[6]
        geojson_dict["features"].append(geometry)
    map_geojson.append(geojson_dict)
    return jsonify(map_geojson)

if __name__ == "__main__":
    app.run(debug=True)