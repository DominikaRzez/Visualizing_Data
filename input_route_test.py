##########################################################################
# Tried to create the interactive API based on input, but this doesn't work 
@app.route("/api/metadata/<city>")
def city_metadata(city):
    """Return the MetaData for a given city."""
    cursor.execute("SELECT * FROM stop_and_search WHERE stop_and_search.country_name == city")
    cities = cursor.fetchall()

    # Create a dictionary entry for each row of metadata information
    city_metadata = {}
    for city in cities:
        city_metadata["City"] = city[0]
        city_metadata["Age range"] = city[1]
        city_metadata["Gender"] = city[3]
        city_metadata["Object of search"] = city[5]
        city_metadata["Ethnicity"] = city[4]
        city_metadata["Location"] = city[6]

    print(city_metadata)
    return jsonify(city_metadata)


@app.route("/api/metadata/<city>")
def city_metadata(city):
    """Fetch the City data that matches
       the path variable supplied by the user, or a 404 if not."""
       cursor.execute("SELECT * FROM stop_and_search")
       cities = cursor.fetchall()
       canonicalized = city.replace(" ", "").lower()
       for city in cities:
        search_term = city["country_name"].replace(" ", "").lower()

        if search_term == canonicalized:
            city_metadata = {}
            for element in cities:
                city_metadata["City"] = element[0]
                city_metadata["Age range"] = element[1]
                city_metadata["Gender"] = element[3]
                city_metadata["Object of search"] = element[5]
                city_metadata["Ethnicity"] = element[4]
                city_metadata["Location"] = element[6]
            return jsonify(city_metadata)

        return jsonify({"error": "Character not found."}), 404


@app.route("/api/metadata/<city>")
def city_metadata(city):
       cursor.execute("SELECT * FROM stop_and_search")
       cities = cursor.fetchall()
       canonicalized = city.replace(" ", "").lower()
       city_name = cities[0]
       if city_name == canonicalized:
           return jsonify(cities)
               
