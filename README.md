# Back End Web Development CA2

# Folder Structure

* .env: Environment configuration file.
* .git: Git repository folder.
* .gitignore: Specifies intentionally untracked files to ignore.
* index.js: Main entry point for the NodeJS application.
* node_modules/: Folder for NodeJS modules.
* package.json: Lists package dependencies.
* package-lock.json: Ensures consistent installations of node modules.
* README.md: Project overview and documentation.
* src/: Source code directory.
  - controllers/: Request handling logic.
  - models/: Data models, often for database interactions.
  - routes/: Application's endpoints and request handlers.
  - services/: Business logic and backend services.
* public/: Static assets accessible to the client-side.
  - images/: Image files.
  - css/: CSS files for styling.
  - js/: Client-side JavaScript files.
  - index.html: Main HTML file for the application's UI.

## Description

This Node.js application is a task tracker designed to gamify the sustainability movement. By encouraging users to complete environmentally-friendly tasks, it aims to foster a community engaged in sustainable practices. Users can register, log in, track their progress, and earn rewards for their contributions to sustainability.

# Features

* User Authentication: Secure login and registration using JWT for authentication.
* Task Tracking: Users can track their progress and view their rewards.
* Messaging: A global messaging feature allows users to share insights and encourage one another.
* Security: Passwords are hashed using Bcrypt, ensuring high levels of security.
* Frontend Integration: The application utilizes Bootstrap for a responsive design, with Axios for seamless endpoint integration.

## Getting Started

### Dependencies

"dotenv"

```
npm install dotenv
```

"express"

```
npm install express
```

"mysql2"

```
npm install mysql2
```

"nodemon"

```
npm install nodemon
```

"bcrypt"

```
npm install bcrypt
```

"JWT Library"

```
npm install jsonwebtoken
```

### Executing program

* Clone the project.

* Install dependencies as shown above if needed.

* Create a .env file
```
DB_HOST= "hostname"
DB_USER= "username"
DB_PASSWORD= "password"
DB_DATABASE= "db_name"

JWT_SECRET_KEY=your-secret-key
JWT_EXPIRES_IN=15m
JWT_ALGORITHM=HS256

```

* Run the following commands to start the program.
```
npm run init_tables
```

```
npm run start
```
* Launch localhost:3000 to view the website

### Website

# Register Page 
## (http://localhost:3000/register.html)

* Allows user to register for an account.

# Login Page 
## (http://localhost:3000/login.html)

* Allows user to login to their account.

# Home Page 
## (http://localhost:3000/index.html)

* Displays all the Task available to the Users.  

# Task Information Page 
## (http://localhost:3000/singleTaskInfo.html?task_id=1)

* Displays the Task depending on the task_id at the end of the URL and allows Users to complete it by keying in the neccessary information.

# Users Page 
## (http://localhost:3000/users.html)

* Displays all the Users who has an account in the Website.

# Users Information Page 
## (http://localhost:3000/singleUserInfo.html?user_id=1)

* Displays the User depending on the user_id at the end of the URL and allows them to view the User's Inventory and Profile.

# Store Page 
## (http://localhost:3000/store.html)

* Displays the items available for purchase in the Store.

# Store Item Information Page 
## (http://localhost:3000/singleStoreInfo.html?item_id=1)

* Displays the Item depending on the item_id at the end of the URL and allows Users to purchase it if they meet the requirements by clicking on the "Purchase Item" Button.

# Inventory Page 
## (http://localhost:3000/inventory.html)

* Displays the Items in the User's Inventory (Purchases).

# Missions Page 
## (http://localhost:3000/missions.html)

* Displays the Quest available for Users to complete.

# Quest Information Page 
## (http://localhost:3000/singleQuestInfo.html?quest_id=1)

* Displays the Quest depending on the quest_id at the end of the URL and allows Users to complete it by clicking on the "Accept Quest" button.

# Points History Page 
## (http://localhost:3000/history.html)

* Displays the Points History of the user (Purchase and Quest Completion).

# Points History Page 
## (http://localhost:3000/taskprogress.html)

* Displays the Task Progress of the user (Completed Tasks).

# Messaging System Page 
## (http://localhost:3000/messages.html)

* Global Messaging System where users can post new messages. They can also edit and delete their own messages.

# Profile Page 
## (http://localhost:3000/profile.html)

* Allow users to view their own Profile Info. Update their account details. Delete their account and view their inventory.

# Roles

* Users have the ability to do whatever stated above.

* Admin have the ability to do whatever stated above, as well as the ability to create Tasks, Quests, Items etc...

## Author

Gerald Koh Wen Zhe
[@itzgerald03](hhttps://github.com/itzgerald03)
