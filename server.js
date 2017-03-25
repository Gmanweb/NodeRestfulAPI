var app = require('express')(); // Express App include
var http = require('http').Server(app); // http server
var mysql = require('mysql'); // Mysql include
var bodyParser = require("body-parser"); // Body parser for fetch posted data
var connection = mysql.createConnection({ // Mysql Connection
    host : 'localhost',
    user : 'root',
    password : 'password',
    database : 'NodeRestFulAPIDB',
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Body parser use JSON data

// fetch all users from users table in DB.
app.get('/users',function(req,res){
    var data = {
        "error":true,
        "Users":""
    };
    
    connection.query("SELECT * from users",function(err, rows, fields){
        if(rows.length != 0){
            data["error"] = false;
            data["Users"] = rows;
            res.json(data);
        }else{
            data["error"] = true;
            data["Users"] = 'No users Found..';
            res.json(data);
        }
    });
});

// fetch user data based on uid value, validating the user id input
app.get('/user/:uid',function(req,res){
    const uid = req.params.uid;
    var data = {
        "error":true,
        "User":""
    };
    
    connection.query('SELECT * FROM users where uid = "' + uid +'"',function(err, rows, fields){
        if(rows.length != 0){
            data["error"] = false;
            data["User"] = rows;
            res.json(data);
        }else{
            data["error"] = true;
            data["User"] = 'No user found with id ' + uid;
            res.json(data);
        }
    });
});

http.listen(8000, function(){
    console.log('Connected & Listen to port 8000');
});
