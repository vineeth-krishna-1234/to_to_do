from marshmallow import Schema, fields, validate


class NoteSchema(Schema):
    content = fields.String(required=True)
    date = fields.DateTime(required=True)


class TodoSerializer(Schema):
    id = fields.String(dump_only=True)
    title = fields.String(required=True, validate=validate.Length(max=200))
    description = fields.String()
    priority = fields.String(
        validate=validate.OneOf(["low", "medium", "high"]), default="low"
    )
    completed = fields.Boolean(default=False)
    tags = fields.List(fields.String(validate=validate.Length(max=50)))
    assignedUsers = fields.List(fields.String(validate=validate.Length(max=50)))
    notes = fields.List(fields.Nested(NoteSchema))
    createdAt = fields.DateTime(dump_only=True)
    updatedAt = fields.DateTime(dump_only=True)
