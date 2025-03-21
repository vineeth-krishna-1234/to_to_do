from flask import Flask
from flask_cors import CORS
from db import MongoDBSingleton
from utils import EnvLoader
from flask_restful import Api

from api.user import UserResource
from api.todo import TodoItemAPIResource, TodoAPIResource

app = Flask(__name__)
CORS(app)  # Enable CORS for all origins
api = Api(app)

# load env
ENV = EnvLoader()

# connect to mongo db
mongo_connection_instance = MongoDBSingleton(
    connection_string=ENV.get("MONGO_CONNECTION_URL"), db_name=ENV.get("MONGO_DB_NAME")
)
mongo_connection_instance.connect()


# define routes
api.add_resource(UserResource, "/api/v1/users")
api.add_resource(TodoAPIResource, "/api/v1/todo")
api.add_resource(TodoItemAPIResource, "/api/v1/todo/<string:todo_id>")


if __name__ == "__main__":
    app.run(debug=True)
