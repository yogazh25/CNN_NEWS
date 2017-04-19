from pymongo import MongoClient

MONGO_DB_HOST = "localhost"
MONGO_DB_PORT = "27017"
DB_NAME = "tap-news"

'''
1 new a client connection
2 if any client visit the db, retrn db

Single Instance! --> ONLY one client connected to the DB
'''
client = MongoClient("%s:%s" % (MONGO_DB_HOST, MONGO_DB_PORT))

def get_db(db=DB_NAME):
    db = client[db]
    return db
