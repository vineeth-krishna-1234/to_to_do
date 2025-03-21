
# 📌 Project Documentation

## 🛠 Tech Stack

| Component  | Technology |
|------------|-----------------------------|
| **Frontend**  | React + Tailwind CSS + Vite |
| **Backend**   | Flask + MongoEngine ODM |
| **Database**  | MongoDB |

---

## 🚀 Running the Application

### 🗄️ Setting Up the Database
Run the following command to set up the database:
```sh
sh db.setup.sh
```

### 🎨 Running the Frontend
```sh
cd frontend
npm install
npm run dev
```

### ⚙ Running the Backend
```sh
cd backend
python -m venv env
source ./env/bin/activate  # On Windows, use `env\Scripts\activate`
echo "MONGO_CONNECTION_URL=mongodb://superadmin:verysecurepassword123@localhost:27017/" > .env
echo "MONGO_DB_NAME=todoApp" >> .env
python __main__.py
```

### 📊 Populating the Database with Fake Data
```sh
cd backend
python populate.py
```

---

## 🔗 Accessing the Application
Once the frontend is running, visit:  
➡ **[http://localhost:5173/#](http://localhost:5173/#)**  
You should see the **To-Do App**.

---

## 🐳 Docker Support
✅ Docker files are included for both the **backend** and **frontend**.  
❌ However, the **Docker Compose setup** is not yet complete.

---


## 📌 Preview

### 🖥️ Basic View  
![Basic View](images/preview.png)

### 📊 To-Do Data  
![To-Do Data](images/preview_todo_data.png)

### 🔍 Filter Options  
![Filter Options](images/preview_filters.png)

### ✏️ Create To-Do  
![Create To-Do](images/preview_create_todo.png)
