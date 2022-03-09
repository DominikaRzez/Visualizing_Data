--Creating a table to hold cities' stop and searches
CREATE TABLE "stop_and_search" (
	"country_name" VARCHAR,
	"age_range" VARCHAR,
	"self_defined_ethnicity" VARCHAR,
	"gender" VARCHAR ,
	"officer_defined_ethnicity" VARCHAR ,
	"object_of_search" VARCHAR ,
	"location" VARCHAR);

--Selecting unique values for object of search
SELECT DISTINCT object_of_search FROM stop_and_search;
--Creating a view holding the number of stop and searches reasons at each city
CREATE VIEW object_of_search AS
SELECT country_name,
SUM(CASE WHEN object_of_search = 'Stolen goods' THEN 1 END) as Stolen_goods,
SUM(CASE WHEN object_of_search = 'Anything to threaten or harm anyone' THEN 1 END) as Threat,
SUM(CASE WHEN object_of_search = 'Controlled drugs' THEN 1 END) as Controlled_drugs,
SUM(CASE WHEN object_of_search = 'Offensive weapons' THEN 1 END) as Offensive_weapons,
SUM(CASE WHEN object_of_search = 'Evidence of offences under the Act' THEN 1 END) as Offences,
SUM(CASE WHEN object_of_search = 'Firearms' THEN 1 END) as Firearms,
SUM(CASE WHEN object_of_search = 'Psychoactive substances' THEN 1 END) as Psychoactive_substances,
SUM(CASE WHEN object_of_search = 'Articles for use in criminal damage' THEN 1 END) as Criminal_damage,
SUM(CASE WHEN object_of_search = 'Articles for use in theft' THEN 1 END) as Theft,
SUM(CASE WHEN object_of_search = 'Fireworks' THEN 1 END) as Fireworks,
COUNT(*) as No_Of_SaS
FROM stop_and_search
GROUP BY country_name
ORDER BY No_Of_SaS DESC;

SELECT * FROM object_of_search;

--Selecting unique age ranges
SELECT DISTINCT age_range
FROM stop_and_search;
--Creating a view to hold number of people in age range that were stoped and searched in each city
CREATE VIEW age_range_by_city AS (SELECT country_name,
SUM(CASE WHEN age_range='10-17' THEN 1 END) as _10_17,
SUM(CASE WHEN age_range='18-24' THEN 1 END) as _18_24,
SUM(CASE WHEN age_range='25-34' THEN 1 END) as _25_34,
SUM(CASE WHEN age_range='over 34' THEN 1 END) as over_34,								  
COUNT(*) as No_Of_SaS
FROM stop_and_search
GROUP BY country_name
ORDER BY No_Of_SaS DESC);

SELECT * FROM age_range_by_city

--Selecting unique etnicities
SELECT DISTINCT officer_defined_ethnicity
FROM stop_and_search;
--Creating a view to hold number of people stoped and searched divided by ethnicities for each city
CREATE VIEW ethnicity_by_city AS (SELECT country_name,
SUM(CASE WHEN officer_defined_ethnicity='Black' THEN 1 END) as Black,
SUM(CASE WHEN officer_defined_ethnicity='Other' THEN 1 END) as Other,
SUM(CASE WHEN officer_defined_ethnicity='White' THEN 1 END) as White,
SUM(CASE WHEN officer_defined_ethnicity='Asian' THEN 1 END) as Asian,								  
COUNT(*) as No_Of_SaS
FROM stop_and_search
GROUP BY country_name
ORDER BY No_Of_SaS DESC);

SELECT * FROM ethnicity_by_city

--Creating a view showing stop and searches by gender for each city
CREATE VIEW Male_Female_Split_by_City AS (SELECT country_name,
SUM(CASE WHEN gender='Male' THEN 1 END) as Male_SaS,
SUM(CASE WHEN gender='Female' THEN 1 END) as Females_SaS,
COUNT(*) as No_Of_SaS
FROM stop_and_search
GROUP BY country_name
ORDER BY No_Of_SaS DESC);