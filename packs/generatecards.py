import csv
import random
import string

csv_reader = []
with open('./packs/qscards_srd.csv', encoding="utf8") as file:
    csv_reader = list(csv.DictReader(file))

qscardsdb = open("./packs/qscards_srd.db", "w", encoding="utf8")

cardTypes = {
'Injury': "qsgs.card.type.injury",
'Shock': "qsgs.card.type.shock",
'Combo': "qsgs.card.type.combo"
}

for row in csv_reader:
    
    

    id = ''.join(random.choices(string.ascii_letters + string.digits, k=16))

    tags = row['Degree']

    if row['Continuity'] != '':
        tags += ';' + row['Continuity'] + ';'

    cardType = row['Combo'] if row['Combo'] == 'Combo' else row['Type']

    row['Description'] = row['Description'].replace('\n', '<br>').replace('\r', '<br>').replace('\"', '\\"')

    data = '"type": "{}", "tags": "{}", "description": "{}"'.format(cardType.lower(), tags, r'<p>{}</p>'.format(row['Description']) )

    db_entry = '{{"_id": "{}", "name": "{}", "permission": {{"default": 0}}, "type": "Card", "data": {{{}}}}}'.format(id, row['Name'], data)
    
    qscardsdb.write(db_entry + '\n')
        
qscardsdb.close()