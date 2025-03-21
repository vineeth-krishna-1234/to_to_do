from marshmallow import Schema, fields


class UserSerializer(Schema):
    id = fields.String(dump_only=True)  # Convert ObjectId to string
    username = fields.String(required=True)
    email = fields.String(required=True)
    created_at = fields.DateTime(dump_only=True)
