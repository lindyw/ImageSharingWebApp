"use strict";
// setup port number
var port=8081;

/*
require modules
 */
var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var session = require("express-session");
var fileUpload = require("express-fileupload");
//Create our express app object
var app = express();

// configure out database connection
var db_connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "LinLin13",
	database: "wwong_db",
	insecureAuth : true
	// host: "mysql.scss.tcd.ie",
	// user: "wwong",
	// password: "Ob7caexa",
	// database: "wwong_db"
});

// connect to the Database
db_connection.connect( function(err) {
	if (err) {
		console.log("Error: " + err);
	}
	else 
	{
		console.log("Successfully connected to DB");
	}
});

// show msg
var showMSG = false;

/*
Configure middlewares
 */
app.use(express.static("assets")); // media folder
app.set("view-engine", "ejs"); //ejs engine
app.set("views", "templates"); //ejs folder
app.use(bodyParser.urlencoded({extended: true})); 
app.use(fileUpload());
app.use(session({
	secret:'crmorytp8vyp%@$greaDIB66^^&ffewagreahea',
	resave:false,
	saveUninitialized: true,
	cookie:{ age: 99}
}));

app.get("/", function(req, res){
	var sessionUser = req.session.user;
	var sessionFname = req.session.fname;
 	var sessionLname = req.session.lname;
 	var query_1 ="SELECT img_id,name,description,likes,comments FROM images"

 	// get images information from database
	db_connection.query(query_1, function(err, result)
	{
		if (err) 
		{
			res.send("A database error occurred: " + err);
		}
		else
		{
			if (result.length>0)
			{
				renderPage(result);
			}
			else 
			{
				if (sessionUser)
				{
					//login visitor
					res.render("index.ejs", {"login": true, 'fname': sessionFname, 'lname': sessionLname, 'images':undefined});
				}
				else
				{
					//non-login visitor
					res.render("index.ejs", {"login": false, 'images':undefined});
				}
			}
		}
 	})
	
	function renderPage(result)
	{
		if (sessionUser)
		{
			//login visitor
			res.render("index.ejs", {"login": true, 'fname': sessionFname, 'lname': sessionLname, 'images':result});
		}
		else
		{
			//non-login visitor
			res.render("index.ejs", {"login": false, 'images': result});
		}
	}
	
});

app.get("/login.html", function(req,res) {
	res.render("login.ejs", {"msg":""});
});
/*
Configure application Routes
 */
app.get("/register", function(req,res) {
	res.render("register.ejs", {"msg":""});
});

 app.post("/register", function(req,res) {
 	var user = req.body.username;
 	var pass = req.body.password;
 	var cpass = req.body.c_password;
 	var fname = req.body.firstname;
 	var lname = req.body.lastname;
 	var query = `SELECT * FROM users WHERE username="${user}"`;
 	var query_1 = `INSERT INTO users(id, username, firstname, surname, password) VALUES(NULL,"${user}","${fname}","${lname}","${pass}")`;
 	var query_2 =`SELECT * FROM users WHERE username="${user}" && password="${pass}"`;
 	
 	// check existing username
	db_connection.query(query, function(err, result)
	{
		if (err) 
		{
			res.send("A database error occurred: " + err);
		}
		else
		{
			if (result.length>0)
			{
				res.render("register.ejs", {"msg": "Username has already taken, please try another one."});
			}
			else
			{
				// check confirm passwords
				if (cpass == pass) 
				{
					adduser();
				}
			 	else 
			 	{
			 		res.render("register.ejs", {"msg": "Confirm password not match, please type again."});
			 	}
			}
		}
 	})
 	
 	function adduser()
 	{
 		db_connection.query(query_1, function(err, result)
 		{
 			if (err) 
 			{
 				res.send("A database error occurred: " + err);
 			}
 			else
	 		{
	 			autologin();
	 		}
	 	})
 	}
 	function autologin()
 	{
 		db_connection.query(query_2, function(err, result)
 		{
 			if (err) 
 			{
 				res.send("A database error occurred: " + err);
 			}
 			else
	 		{
	 			if (result.length > 0)
				{
					req.session.user = user;
					req.session.password = pass;
					req.session.fname = result[0]['firstname'];
					req.session.lname = result[0]['surname'];
					res.redirect("/");
				}
	 		}
	 	})
 	}	
 });

app.post("/login", function(req, res) {
    var user = req.body.username;
    var pass = req.body.password; 
	var query = `SELECT * FROM users WHERE username="${user}" && password="${pass}"`;
	
	// checkQuery(query, res);
	db_connection.query(query, function(err, result)
	{
		if (err) {
			res.send("A database error occurred: " + err);
		}
		else 
		{
			if (result.length > 0)
			{
				req.session.user = user;
				req.session.password = pass;
				req.session.fname = result[0]['firstname'];
				req.session.lname = result[0]['surname'];
				res.redirect("/");
			}
			else
			{
				res.render("login.ejs", {"msg": "Wrong username/password, Please try again."});
			}
		}
	});
});

app.get("/upload", function(req, res){
	var sessionUser = req.session.user;
	var sessionFname = req.session.fname;
	var sessionLname = req.session.lname;
	if (sessionUser) {
		res.render("upload.ejs",{'fname': sessionFname, 'lname': sessionLname, 'msg':""});
	}
});

app.post("/upload", function(req, res) {
    var file = req.files.uploadFile;
    var username = req.session.user;//author
    var sessionFname = req.session.fname;
	var sessionLname = req.session.lname;
    var imagename = file.name;//name
    var description = req.body.imagedes; // description
    var date = new Date().toISOString().slice(0, 19).replace('T', ' ');//date
    var thumb = "";

    var query1 = `SELECT COUNT(*) AS count FROM images;`

    // check current img_id
    db_connection.query(query1, function(err, result)
	{
			if (err) 
			{
				res.send("A database error occurred: " + err);
			}
			else
	 		{
	 			if (result.length == 1)
	 			{
		 			 setValue(result[0]['count'].toString());
		 			 file.mv("assets/uploads/"+imagename); //upload to assets/uploads
	 			}
	 		}
 	})

    function setValue(value)
    {
    	imagename = (parseInt(value)+1).toString() + imagename;
	 	thumb = "t_" + imagename;
		storeimg();
    }

	
    function storeimg()
    {
    	var query2 = `INSERT INTO images(img_id, name, description, date, likes, comments, author) VALUES(NULL, "${imagename}", "${description}", "${date}", 0, 0, "${username}")`;
    	 // store in SQL database
	    db_connection.query(query2, function(err, result)
	 		{
	 			if (err) 
	 			{
	 				res.send("A database error occurred: " + err);
	 			}
		 	})
   
    }
   
   
});


app.get("/forget", function(req,res){
	res.render("forget.ejs",{'msg':"", 'done':""});
});

app.post("/forget", function(req, res){
	var user = req.body.username;
 	var pass = req.body.password;
 	var cpass = req.body.c_password;
 	var query1 = `SELECT * FROM users WHERE username="${user}"`;
 	var query2 = `UPDATE users SET password="${pass}" WHERE username="${user}"`;

 	db_connection.query(query1, function(err, result)
	{
		if (err) {
			res.send("A database error occurred: " + err);
		}
		else 
		{
			if (result.length > 0)
			{
				updatePassword();
			}
			else
			{
				res.render("forget.ejs", {"msg": "username not found."});
			}
		}
	});

	function updatePassword()
	{
		db_connection.query(query2, function(err, result)
		{
			if (err) {
				res.send("A database error occurred: " + err);
			}
			else 
			{
				res.render("login.ejs", {msg: "Your password has been reset."});
			}
		});
	}

})

app.post("/images/comment", function(req,res) {
	var sessionUser = req.session.user;
	var id = req.body.ID;
	var ncm = req.body.num_cm;
	var msg = req.body.COMMENT;
	var date = new Date().toISOString().slice(0, 19).replace('T', ' ');//date
	var query1 = `INSERT INTO comments(id, userid, imgid, date, text,username) VALUES(NULL,(SELECT id FROM users WHERE username="${sessionUser}"),"${id}","${date}","${msg}","${sessionUser}")`;
	var query2 = `UPDATE images SET comments=comments+1 WHERE img_id=${id}`;

	if (sessionUser)
	{
		//add the comment to comments table
		db_connection.query(query1, function(err,result)
		{
			if (err)
			{
				res.send("A database error occurred: " + err);
			}
			else 
			{
				updateComments();
			}
		});

		//update the comment +1 count in images table
		function updateComments()
		{
			db_connection.query(query2, function(err,result)
			{
				if (err)
				{
					res.send("A database error occurred: " + err);
				}
				else 
				{
				
					var results = [{"msg": msg, "user": sessionUser, "date": date}];
					res.json(results);
				}
			});
		}
	}
	else 
	{
		res.json("");
	}
	
});

// image (original image + associated information)
app.get("/images/:id", function(req, res) {
	var img_id = req.params.id;
	var sessionUser = req.session.user;
	var query1 = `SELECT * FROM likes WHERE userid=(SELECT id FROM users WHERE username="${sessionUser}") AND imgid="${img_id}"`;
	var query2 = `SELECT name,description,date,likes,comments,author FROM images WHERE img_id=${img_id}`;
	var query3 = `SELECT text,date,username FROM comments WHERE imgid="${img_id}"`;
	var liked = false;

	var result1, result2;
	var result3 = [];
	 db_connection.query(query1, function(err, result)
	 {
		if (err) 
		{
			res.send("A database error occurred: " + err);
		}
		else
		{
			if (result.length == 1)
			{
				liked = true;
			}
			else 
			{
				liked = false;
			}
		}
	 });

	db_connection.query(query2, function(err, result){
		if (err) {
			res.send("A database error occurred: " + err);
		}
		else 
		{
			if (result.length == 1)
			{
				result1 = result;
				showComment();
				
				
			}
		}
	});

	function showComment()
	{
		 db_connection.query(query3, function(err, result)
		 {
			if (err) 
			{
				res.send("A database error occurred: " + err);
			}
			else
			{
				if (result.length >0)
				{
					result2 = result;
					cmuser();
				}
				else 
				{
					// no existing comment 
					if (sessionUser)
					{
						res.render("image.ejs", {"login": true, "id":img_id, "name":result1[0]['name'], "description":result1[0]['description'], "date":result1[0]['date'], 
											"likes":result1[0]['likes'], "comments":result1[0]['comments'],
											"author":result1[0]['author'], "liked":liked, 'cmlist':''});
					}
					else 
					{
						res.render("image.ejs", {"login": false, "id":img_id, "name":result1[0]['name'], "description":result1[0]['description'],"date":result1[0]['date'], 
											"likes":result1[0]['likes'], "comments":result1[0]['comments'],
											"author":result1[0]['author'], "liked":liked, 'cmlist':''});
					}
				}

					
			}
		 });
				
	


	function cmuser()
	{
		if (sessionUser)
		{
			res.render("image.ejs", {"login": true, "id":img_id, "name":result1[0]['name'], "description":result1[0]['description'], "date":result1[0]['date'], 
								"likes":result1[0]['likes'], "comments":result1[0]['comments'],
								"author":result1[0]['author'], "liked":liked, "cmlist":result2});
		}
		else 
		{
			console.log(result3);
			res.render("image.ejs", {"login": false, "id":img_id, "name":result1[0]['name'], "description":result1[0]['description'],"date":result1[0]['date'], 
								"likes":result1[0]['likes'], "comments":result1[0]['comments'],
								"author":result1[0]['author'], "liked":liked, "cmlist":result2});
		}
	}
}
});

app.post('/images/like', function(req, res) {
	var id = req.body.ID;//get the current image
	var sessionUser = req.session.user;//get the user who pressed like
	var likes = req.body.LIKES;
	var query = `SELECT * FROM likes WHERE userid=(SELECT id FROM users WHERE username="${sessionUser}") AND imgid="${id}"`;
	var query_1 = `UPDATE images SET likes=likes + 1 WHERE img_id="${id}"`;
	var query_2 = `INSERT INTO likes(userid,imgid) VALUES((SELECT id FROM users WHERE username="${sessionUser}"),"${id}")`;
	if (sessionUser != undefined)
	{
		checkLIKE();
		// check if the currect user has liked this image before or not
		function checkLIKE()
		{
			 db_connection.query(query, function(err, result)
	 		{
	 			if (err) 
	 			{
	 				res.send("A database error occurred: " + err);
	 			}
	 			else
	 			{
	 				if (result.length < 1)
	 				{
	 					addLIKE();
	 				}
	 			}
		 	});
		}
		// add like to images table
		function addLIKE()
		{
		    db_connection.query(query_1, function(err, result)
	 		{
	 			if (err) 
	 			{
	 				res.send("A database error occurred: " + err);
	 			}
	 			else
	 			{
	 				updateLIKES();
	 			}
		 	});
		}

		// add data to likes table
		function updateLIKES()
		{
			 db_connection.query(query_2, function(err, result)
	 		{
	 			if (err) 
	 			{
	 				res.send("A database error occurred: " + err);
	 			}
	 			else
	 			{
	 				var nlikes = parseInt(likes) + 1;
	 				res.json(nlikes);
	 			}
		 	});
		}

	}
});



app.get("/logout", function(req, res) {
    //delete req.session.data;
    req.session.destroy();
    res.redirect("/");
});


/*
Start the server
 */
app.listen(port);
console.log("Server running on http://localhost:"+port);
