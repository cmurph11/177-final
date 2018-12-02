#####################################################################
### COMP177 Data Visualization Tufts University
### Purpose: parse Baltimore City crime data for the years 2012-2018
###          to count the number of occurences of each type of violent
###          crime by month and year, for use in 177 final project
### Author: Caroline Kaufman
### Last Modified: 12/2/2018 3:00pm
#####################################################################

import json
import copy
from dateutil.parser import parse

with open('crimes.json') as f:
    data = json.load(f)

DATE_INDEX = 8
CRIME_TYPE_INDEX = 11
crimes = data["data"]
crimes_by_year = {2012: [], 2013: [], 2014: [], 2015: [], 2016: [], 2017: [], 2018: []};

count_hash = {"COMMON ASSAULT": 0, "AGG. ASSAULT": 0, "HOMICIDE": 0, "RAPE": 0, "ASSAULT BY THREAT": 0}

# Create empty crime counters for each month
# Deep copy required to copy the count_hash instead of appending references
for year in range(2012, 2019):
    for i in range(12):
        c = copy.deepcopy(count_hash)
        crimes_by_year[year].append(c)

# Iterate through crimes and increment counter based on date and crime type
for crime in crimes:
    date = parse(crime[DATE_INDEX])
    year = date.year
    month_num = date.month - 1
    crime_type = crime[CRIME_TYPE_INDEX]
    crimes_by_year[year][month_num][crime_type] += 1

# Write resulting JSON data to file
with open('crimes_parsed.json', 'w') as outfile:
     json.dump(crimes_by_year, outfile, sort_keys = True, indent = 4,
               ensure_ascii = False)
