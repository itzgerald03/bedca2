const model = require("../models/userModel");

// Read all Users in SQL Table
module.exports.readAllUsers = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUsers:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}


// Checks if Email is associated with another user
module.exports.emailChecking = (req, res, next) => {

    const data = {
        email: req.body.email
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error emailChecking:", error);
            res.status(500).json(error);
        } else {
            if (results.length > 0 && res.locals.email != data.email) {
                res.status(409).json({
                    message: "Email is associated with another User."
                });
            }
            else {
                next();
            }
        }
    }

    model.checkEmail(data, callback);
}



// Checks if Username is already associated with another email
module.exports.usernameChecking = (req, res, next) => {

    const data = {
        username: req.body.username
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error usernameChecking:", error);
            res.status(500).json(error);
        } else {
            if (results.length > 0 && data.username != res.locals.username) {
                res.status(409).json({
                    message: "Username is already associated with another User."
                });
            }
            else {
                next();
            }
        }
    }

    model.checkUsername(data, callback);
}


// Creates a new User in SQL Table
module.exports.createNewUser = (req, res, next) => {
    if (req.body.username == undefined || req.body.email == undefined) {
        res.status(400).send("Error: username or email is undefined");
        return;
    }

    const data = {
        username: req.body.username,
        email: req.body.email,
        password: res.locals.password
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewUser:", error);
            res.status(500).json(error);
        } else {
            newUser = {
                "user_id": results.insertId,
                "username": data.username,
                "email": data.email
            }
            res.status(201).json(newUser);
        }
    }

    model.insertSingle(data, callback);
}


// Extract User from SQL Table based on user_id
module.exports.selectUserById = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0 || results[0].user_id == null) {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else {
                user = {
                    "user_id": results[0].user_id,
                    "username": results[0].username,
                    "email": results[0].email,
                    "total_points": parseInt(results[0].total_points)
                }
                res.status(200).json(user);
            }

        }
    }


    model.selectById(data, callback);
}


// Update User from SQL Table based on user_id
module.exports.updateUserById = (req, res, next) => {
    if (req.body.username == undefined || req.body.email == undefined) {
        res.status(400).json({
            message: "Error: username / email is undefined"
        });
        return;
    }

    const data = {
        user_id: req.params.user_id,
        username: req.body.username,
        email: req.body.email,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "user_id not found"
                });
            }
            else {
                updatedUser = {
                    "user_id": data.user_id,
                    "username": data.username,
                    "email": data.email
                }
                res.status(200).send(updatedUser); // 204 No Content

            }
        }
    }

    model.updateById(data, callback);
}

// Deletes User from SQL Table by user_id
module.exports.deleteUserById = (req, res, next) => {

    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteUserById:", error);
            res.status(500).json(error);
        } else {

            if (results[0].affectedRows == 0) {
                res.status(400).json({message:"user_id does not exist."})
            }

            else {
                next();
            }
        }
    }

    model.deleteById(data, callback);
}


// Checks if user_id exist
module.exports.checkUserId = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else {
                next();
            };
        }
    }

    model.selectById(data, callback);
}


// Check if a user exist based on user_id in the body.
module.exports.checkUserById = (req, res, next) => {
    const data = {
        user_id: req.body.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0 || results[0].user_id == null) {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else {
                next();
            };
        }
    }

    model.selectById(data, callback);
}


//////////////////////////////////////////////////////
// CONTROLLER FOR LOGIN
//////////////////////////////////////////////////////

module.exports.login = (req, res, next) => {
    if (req.body.username == undefined || req.body.password == undefined) {
        res.status(400).send("Error: username / body / password is undefined");
        return;
    }

    const data = {
        username: req.body.username,
        password: res.locals.hash
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error login", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0 ){
                res.status(404).json({message: "User not found"})
            }
            else {
                res.locals.username = req.body.username;
                res.locals.email = results[0].email;
                res.locals.hash = results[0].password
                res.locals.userId = results[0].user_id;
                res.locals.role = results[0].role;
                next();
            }
        }
    }

    model.selectByUser(data, callback);

}
//////////////////////////////////////////////////////
// CONTROLLER FOR REGISTER
//////////////////////////////////////////////////////

module.exports.register = (req, res, next) => {
    if (req.body.username == undefined || req.body.email == undefined || req.body.password == undefined) {
        res.status(400).send("Error: username / body / password is undefined");
        return;
    }

    const data = {
        username: req.body.username,
        email: req.body.email,
        password: res.locals.hash
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error register", error);
            res.status(500).json(error);
        } else {
            res.locals.userId = results.insertId
            res.locals.message = `User ${data.username} created successfully.`
            next();
        }
    }

    model.insertSingle(data, callback);
}


//////////////////////////////////////////////////////
// MIDDLEWARE FOR CHECK IF USERNAME OR EMAIL EXISTS
//////////////////////////////////////////////////////

module.exports.checkUsernameOrEmailExist = (req, res, next) => {

    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }


    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUsernameOrEmailExist:", error);
            res.status(500).json(error);
        } else {

            if (results.length > 0) {
                res.status(409).json({message: "Username or email already exists"})
            }
            else {
                next();
            }
        }
    }

    model.selectByUsernameOrEmail(data, callback);
}

// Extract User from SQL Table based on user_id Middleware
module.exports.selectUserByIdMiddleware = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0 || results[0].user_id == null) {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else {

                    res.locals.username = results[0].username;
                    res.locals.email = results[0].email;
                next();
            }

        }
    }


    model.selectById(data, callback);
}
