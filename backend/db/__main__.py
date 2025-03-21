from mongoengine import connect, disconnect
from mongoengine.connection import get_db


class MongoDBSingleton:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self, connection_string, db_name):
        if not hasattr(self, "initialized"):
            self.connection_string = connection_string
            self.db_name = db_name
            self.connection = None
            self.initialized = True

    def connect(self):
        if not self.connection:
            self.connection = connect(host=self.connection_string, db=self.db_name)
        return self.connection

    def disconnect(self):
        if self.connection:
            disconnect()
            self.connection = None

    def get_db(self):
        if not self.connection:
            self.connect()
        return get_db()
