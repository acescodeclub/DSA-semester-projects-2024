import json

class DbOperations:
    # constructor
    def __init__(self):
        self.db_file = "db/dictionary.json"
        self.db = None

    # method for reading the converting the json to dictionary format
    def readJson(self)->dict:
        with open(self.db_file, 'r') as f:
            self.db = json.loads(f.read())
        return self.db
    # returns meaning of the searched word
    def getMeaning(self,word):
        self.read_json()
        return self.db.get(word, "Meaning not found")
    
    # writes word to json
    def writeToJson(self,dictionary:dict):
        with open(self.db_file,"w") as f:
            f.write(json.dumps(dictionary))
    
    # delete word from json
    def deleteWord(self, word):
        self.read_json()
        del self.db[word]

        with open(self.db_file, "a") as f:
            f.write(json.dumps(self.db))

db = DbOperations()
dictionaryWords = db.readJson()


    


