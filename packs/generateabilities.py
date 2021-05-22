import csv
import random
import string

csv_reader = []
with open('./packs/tocabilities.csv') as file:
    csv_reader = list(csv.DictReader(file))

gendb = open("./packs/tocgenabilities.db", "w")
invdb = open("./packs/tocinvabilities.db", "w")
for row in csv_reader:
    

    if row['type'] == 'GeneralAbility':
        data = '"type": "{}", "canBeInvestigative": "{}"'.format(row['category'], row['canBeInvestigative'])
    else:
        data = '"type": "{}"'.format(row['category'])
    
    id = ''.join(random.choices(string.ascii_letters + string.digits, k=16))

    db_entry = '{{"_id": "{}", "name": "{}", "permission": {{"default": 0}}, "type": "{}", "data": {{{}}}}}'.format(id, row['name'], row['type'], data)

    if row['type'] == 'GeneralAbility':
        gendb.write(db_entry + "\n")
    else:
        invdb.write(db_entry + "\n")
        
gendb.close()
invdb.close()