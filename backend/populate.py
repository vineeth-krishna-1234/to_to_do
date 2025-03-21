from faker import Faker
from api.user import UserModel
from datetime import datetime, timezone
from db import MongoDBSingleton
from utils import EnvLoader
from api.todo.model import TodoModel, Note

faker = Faker()

ENV = EnvLoader()

# connect to mongo db
mongo_connection_instance = MongoDBSingleton(
    connection_string=ENV.get("MONGO_CONNECTION_URL"), db_name=ENV.get("MONGO_DB_NAME")
)
mongo_connection_instance.connect()
# Generate and save 5 random users
for _ in range(5):
    user = UserModel(
        username=faker.user_name(),
        email=faker.email(),
        created_at=datetime.now(timezone.utc),
    )
    user.save()

print("random users created successfully!")

user_ids = [str(user.id) for user in UserModel.objects.only("id")]

# Generate and save 5 random TodoModel entries
for _ in range(100):
    created_by = faker.random.choice(user_ids)  # Select a random user as createdBy
    created_by = UserModel.objects(id=created_by).first()
    assigned_users = list(
        set(faker.random.sample(user_ids, k=faker.random.randint(1, len(user_ids))))
    )
    assigned_users = [UserModel.objects(id=user).first() for user in assigned_users]

    todo = TodoModel(
        title=faker.sentence(nb_words=6),
        description=faker.text(),
        priority=faker.random.choice(["low", "medium", "high"]),
        completed=faker.boolean(),
        tags=faker.words(nb=3),  # Generate 3 random tags
        assignedUsers=assigned_users,
        notes=[
            Note(content=faker.sentence(nb_words=10))
            for _ in range(faker.random.randint(1, 3))
        ],  # Generate 1 to 3 random notes
        createdAt=datetime.now(timezone.utc),
        updatedAt=datetime.now(timezone.utc),
        createdBy=created_by,
    )
    todo.save()

print("random TodoModel documents created successfully!")
