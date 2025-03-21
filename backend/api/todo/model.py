from mongoengine import (
    Document,
    StringField,
    BooleanField,
    ListField,
    EmbeddedDocument,
    EmbeddedDocumentField,
    DateTimeField,
    ReferenceField,
)
from datetime import datetime, timezone
from api.user import UserModel


class Note(EmbeddedDocument):
    content = StringField(required=True)
    date = DateTimeField(default=datetime.now(timezone.utc))


class TodoModel(Document):
    title = StringField(required=True, max_length=200)
    description = StringField()
    priority = StringField(choices=("low", "medium", "high"), default="low")
    completed = BooleanField(default=False)
    tags = ListField(StringField(max_length=50))
    assignedUsers = ListField(ReferenceField(UserModel))
    notes = ListField(EmbeddedDocumentField(Note))
    createdAt = DateTimeField(default=datetime.now(timezone.utc))
    updatedAt = DateTimeField(default=datetime.now(timezone.utc))
    createdBy = ReferenceField(UserModel, required=True)

    meta = {"collection": "todos"}
