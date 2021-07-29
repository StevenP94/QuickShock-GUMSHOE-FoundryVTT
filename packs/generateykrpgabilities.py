import csv
import random
import string


games = [
    'paris',
    'wars',
    'normal',
    'aftermath'
]

csv_reader = []
for g in games:
    print(g)
    with open('./packs/ykrpg/ykrpgabilities - {}.csv'.format(g)) as file:
        csv_reader = list(csv.DictReader(file))

    gendb = open("./packs/ykrpg/{}genabilities.db".format(g), "w")
    invdb = open("./packs/ykrpg/{}invabilities.db".format(g), "w")
    for row in csv_reader:
        print(row)
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