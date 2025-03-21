from flask_restful import Resource, reqparse
from .model import User
from .serializer import UserSerializer


class UserResource(Resource):
    def get(self):
        try:
            user_documents = User.objects()
            serialized_documents = UserSerializer(many=True).dump(user_documents)
            return {"users": serialized_documents}, 200
        except:
            return {}, 500
