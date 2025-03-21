from api.user import UserModel
from flask import request, jsonify, make_response
from functools import wraps


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return make_response(
                jsonify({"error": "Authorization token is missing"}), 401
            )

        try:
            # Extract token from 'Bearer <token>'
            token = auth_header.split(" ")[1]

            # Fetch user by ID
            user = UserModel.objects(id=token).first()
            if not user:
                return jsonify({"error": "User not found"}), 404

            # Attach user to the request context
            request.current_user = user

        except Exception as e:
            return make_response(jsonify({"error": "Invalid token"}), 401)

        return f(*args, **kwargs)

    return decorated
