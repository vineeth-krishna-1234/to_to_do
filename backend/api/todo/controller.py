from flask import Flask, request, jsonify, make_response
from flask_restful import Api, Resource
from .model import TodoModel,Note
from api.user import UserModel
from api.utils import token_required
import json
from .serializer import TodoSerializer
from datetime import datetime, timezone

app = Flask(__name__)
api = Api(app)


class TodoAPIResource(Resource):

    @token_required
    def get(self):
        requested_filters = request.args.to_dict()

        # filters
        sort_direction = int(requested_filters.get("sortDirection", -1))

        sort_field = requested_filters.get("sortField", "createdAt")
        page = int(requested_filters.get("page", 0))
        limit = int(requested_filters.get("limit", 10))
        users_requested = requested_filters.get("users", None)
        tags_requested = requested_filters.get("tags", None)
        completed = requested_filters.get("completed",None)

        filters_to_apply = {"createdBy": request.current_user}

        if users_requested:
            filters_to_apply["assignedUsers__in"] = [
                user.strip("") for user in users_requested.split(",")
            ]
        if tags_requested:
            filters_to_apply["tags__in"] = [
                tag.strip("") for tag in tags_requested.split(",")
            ]
        if completed is not None:
            if completed=='true':
                filters_to_apply['completed']=True
            elif completed=='false':
                filters_to_apply['completed']=False
        todos = (
            TodoModel.objects(**filters_to_apply)
            .order_by(f"{'-' if sort_direction==-1 else ''}{sort_field}")
            .skip(page * limit)
            .limit(limit)
        )

        serialized_todos = [TodoSerializer().dump(todo) for todo in todos]

        return make_response(jsonify({"todos": serialized_todos}), 200)

    @token_required
    def post(self):

        data = request.get_json()
        if "assignedUsers" in data:
            data["assignedUsers"] = list(
                UserModel.objects(id__in=data["assignedUsers"])
            )  # Fetch matching users

        new_todo = TodoModel(**data, createdBy=request.current_user)
        try:
            new_todo.validate()
        except Exception as e:
            return make_response(jsonify({"error": str(e)}), 400)
        new_todo.save()
        return make_response(
            jsonify(
                {
                    "message": "Todo created",
                }
            ),
            201,
        )


class TodoItemAPIResource(Resource):
    @token_required
    def get(self, todo_id):

        todo_document = TodoModel.objects(id=todo_id).first()
        # not found
        if not todo_document:
            return make_response(jsonify({"error": "Todo not found"}), 404)
        # not authorized
        if not todo_document.createdBy == request.current_user:
            return make_response(
                jsonify({"error": "You don't have access to this todo"}), 401
            )

        if todo_document:
            serialized_document = TodoSerializer().dump(todo_document)
            return make_response(jsonify({"todo": serialized_document}), 200)

    @token_required
    def put(self, todo_id):
        todo_document = TodoModel.objects(id=todo_id).first()
        # not found
        if not todo_document:
            return make_response(jsonify({"error": "Todo not found"}), 404)
        # not authorized
        if not todo_document.createdBy == request.current_user:
            return make_response(
                jsonify({"error": "You don't have access to this todo"}), 401
            )

        data = request.get_json()
        updatable_fields = [
            "title",
            "description",
            "priority",
            "completed",
            "tags",
            "assignedUsers",
            "notes",
        ]

        update_data = {
            field: data[field] for field in updatable_fields if field in data
        }
        print(data)
        if "assignedUsers" in data:
            data["assignedUsers"] = list(
                UserModel.objects(id__in=data["assignedUsers"])
            )  # Fetch matching users
        if "notes" in data:
            update_data["notes"] = [Note(**note) for note in data["notes"] if note]

        update_data["updatedAt"] = datetime.now(timezone.utc)

        todo_document.update(**update_data)
        return jsonify({"message": "Todo updated"})

    @token_required
    def delete(self, todo_id):
        todo_document = TodoModel.objects(id=todo_id).first()
        # not found
        if not todo_document:
            return make_response(jsonify({"error": "Todo not found"}), 404)
        # not authorized
        if not todo_document.createdBy == request.current_user:
            return make_response(
                jsonify({"error": "You don't have access to this todo"}), 401
            )

        todo_document.delete()
        return make_response(jsonify({"message": "Todo deleted"}), 200)
