import csv
import urllib, urllib.request, urllib.parse
import json

reader = csv.DictReader(open('server-scripts/novoross_address2.csv'))
writer = csv.DictWriter(open('server-scripts/novoross_address_coord.csv','w'),
                        fieldnames=['Город','Адрес','Площадь м2','Год','Этажей','Жилых помещений','lat','lon'])
for row in reader:
    print(row)
    addr = urllib.parse.quote_plus(row["Город"]+","+row["Адрес"])
    query="https://nominatim.openstreetmap.org/search?q="+addr+"&format=json&polygon=1&addressdetails=1"
    print(query)
    response = urllib.request.urlopen(query)
    data = json.loads(response.read())
    # print(data)
    if (len(data)>0):
        fullrow = row
        fullrow["lat"] = data[0]["lat"]
        fullrow["lon"] = data[0]["lon"]
        writer.writerow(fullrow)
    