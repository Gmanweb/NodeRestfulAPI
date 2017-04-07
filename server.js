var app = require('express')(); // Express App include
var http = require('http').Server(app); // http server
var mysql = require('mysql'); // Mysql include
var bodyParser = require("body-parser"); // Body parser for fetch posted data
var connection = mysql.createConnection({ // Mysql Connection
    host : 'mysql.dev',
    user : 'root',
    password : '',
    database : 'NodeRestFulAPIDB',
});

connection.connect();

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

// fetch all messages belonging to user uid
app.get('/user/messages/:uid',function(req,res){
    const uid = req.params.uid;
    var data = {
        "error":true,
        "Messages":""
    };
    
    connection.query('SELECT mid, message FROM messages where uid_fk = "' + uid +'"',function(err, rows, fields){
        if(rows.length != 0){
            data["error"] = false;
            data["Messages"] = rows;
            res.json(data);
        }else{
            data["error"] = true;
            data["Messages"] = 'No Message found for user '+ uid;
            res.json(data);
        }
    });
});

// Update message belonging to user uid
app.put('/user/message',function(req,res){
    var Mid = req.body.mid;
    var Message = req.body.message;
    var Uid = 1;
    var data = {
        "error":true,
        "Message":""
    };
    
    if(!!Mid && !!Message && !!Uid){
        connection.query("Update messages SET message =? where mid =? and uid_fk =?",[Message,Mid,Uid],function(err, rows, fields){
            if(!!err){
                data["Message"] = "Error Updating Message Data for User " + Uid;
            }else{
                data["error"] = false;
                data["Message"] = "Updated Message Successfully";
            }
            res.json(data);
        });
    }else{
        data["error"] = true;
        data["Message"] = "Please provide all required data (i.e :Mid, Message, Uid)";
        res.json(data);
    }
});

http.listen(8000, function(){
    console.log('Connected & Listen to port 8000');
});
