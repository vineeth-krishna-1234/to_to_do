from mongoengine import Document, StringField, DateTimeField


class User(Document):
    username = StringField(required=True, unique=True)
    email = StringField(required=True, unique=True)
    created_at = DateTimeField(required=True)

    meta = {"collection": "users"}

    def __str__(self):
        return self.username
