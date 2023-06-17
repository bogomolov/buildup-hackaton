import json
import csv

writer = csv.DictWriter(open('server-scripts/novoross_city_objects.csv','w'),
                        fieldnames=['id','name','address','type','levels','latitude','longitude'])

with open('server-scripts/osm_schools.json') as j:
    objects = json.load(j)
    for obj in objects:
        print(obj)
        obj['longitude']=obj['lon']
        obj['latitude']=obj['lat']
        if ('addr' in obj):
            obj['address']=obj['addr']
            del obj['addr']
        else:
            obj['address']=""
        del obj['lon']
        del obj['lat']
        writer.writerow(obj)
