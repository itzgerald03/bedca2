const pool = require("../services/db");

const SQLSTATEMENT =

  `
  DROP TABLE IF EXISTS User;

  DROP TABLE IF EXISTS Task;

  DROP TABLE IF EXISTS TaskProgress;

  DROP TABLE IF EXISTS Quest;

  DROP TABLE IF EXISTS Inventory;

  DROP TABLE IF EXISTS Store;

  DROP TABLE IF EXISTS History;

  DROP TABLE IF EXISTS Messages;

  CREATE TABLE User (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT ('user')
  );

  CREATE TABLE Task (
  task_id INT PRIMARY KEY AUTO_INCREMENT,
  title TEXT,
  description TEXT,
  points INT
  );

  CREATE TABLE TaskProgress (
  progress_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  task_id INT NOT NULL,
  completion_date TIMESTAMP,
  notes TEXT
  );


  CREATE TABLE Quest (
    quest_id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    description TEXT,
    reward INT,
    difficulty TEXT
);


  CREATE TABLE Inventory (
  inventory_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  itemName TEXT,
  description TEXT
);


  CREATE TABLE Store (
  item_id INT PRIMARY KEY AUTO_INCREMENT,
  itemName TEXT,
  description TEXT,
  cost INT,
  quantity INT
);

CREATE TABLE History (
  history_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  name TEXT,
  type TEXT,
  description TEXT,
  points INT,
  completion_date TIMESTAMP
  );


CREATE TABLE Messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  message_text TEXT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );


INSERT INTO User (username, email, password, role) VALUES
("admin", "admin@email", "$2b$10$5lcJekhboK/K..CG8iCWDecEUT4H56flV.Xta.5/PDUEBDAHsuaHm", "admin");

INSERT INTO Task (title, description, points) VALUES
("Plant a Tree", "Plant a tree in your neighbourhood or a designated green area.", 50),
("Use Public Transportation", "Use public transportation or carpool instead of driving alone.", 30),
("Reduce Plastic Usage", "Commit to using reusable bags and containers.", 40),
("Energy Conservation", "Turn off lights and appliances when not in use.", 25),
("Composting", "Start composting kitchen scraps to create natural fertilizer.", 35);


INSERT INTO Quest (quest_id, name, description, reward, difficulty) VALUES
(1, 'Beach Danger', 'Fight 5 Trash Mobs at the Beach', 100, "Easy"),
(2, 'Water Saver', 'Fix 5 leaking public water sources to conserve water', 150, "Moderate"),
(3, 'Guardians of the Ocean', 'Fight off polluting monsters dumping waste in the ocean', 200, "Hard");


INSERT INTO Inventory (inventory_id, user_id, itemName, description) VALUES
(1, 1, "Recycler's Armor", 'Provides extra protection and sorting tools for beach clean-up.');


INSERT INTO Store (item_id, itemName, description, cost, quantity) VALUES
(1, 'Wrench', 'Make fixing broken water sources faster by 20%', 50, 2),
(2, 'Aqua Shield', 'Reduces damage taken during water-related quests by 30%', 60, 0),
(3, 'Beach Cleanup Kit', 'Increases efficiency of trash collection on beaches by 15%', 30, 5),
(4, 'Eco-Trident', 'Boosts fighting efficiency against ocean polluters by 25%', 100, 1);

INSERT INTO Messages (message_text, user_id) VALUES
  ("Hello world!", 1),
  ("Yummy!", 2),  
  ("I am the one", 3);
`



pool.query(SQLSTATEMENT, (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully:", results);
  }
  process.exit();
});