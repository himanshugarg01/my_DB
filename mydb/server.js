const express = require('express')
const app = express()
const http = require('http')
const server = http.Server(app);
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const io = socketIO(server);
const path = require('path');
const port = 8000;
const fs =require('fs');
const cors = require('cors');

var session = require('express-session');
var ObjectId=require('mongodb').ObjectID;
var flash = require('connect-flash');

var cookieParser = require('cookie-parser');
app.use(cookieParser());

//Express Middleware
app.use(express.json()); //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).
app.use(express.urlencoded({extended: true})); 
app.use("/",express.static(path.join(__dirname, 'public'))); // To serve static files
//ByDefault serve /public/index.html 
app.use(cors());
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(session({secret: "xYzUCAchitkara"}));
//---------------Routers---------------//
//app.use('/', require('./routes'));

var fileType="json";

app.post('/createTable',async (req, res) => {
      console.log(req.body);
      
    if (fs.existsSync("../database/"+req.body.name)) {
        console.log("exists");
    }
    else{
       await fs.mkdirSync("../database/"+req.body.name);
        fs.writeFile("../database/"+req.body.name+"/schema."+fileType, '{ "schema" : ['+req.body.data+"]}", function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("The file was saved!");
        });
        fs.writeFile("../database/"+req.body.name+"/data."+fileType,"[]", function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("The file was saved!");
        });  
    }
    res.send({});
})

app.post('/insertData',(req, res) => {
    console.log(req.body);
    
        if (!fs.existsSync("../database/"+req.body.name)) {
            console.log("table not exist");
        }
        else{
            fs.readFile("../database/"+req.body.name+"/data."+fileType, 'utf-8', (err, data) => {
                if (err) console.log(err);
               
               
                var obj;
                obj=JSON.parse(data);
            
                obj.push(req.body.data);
                console.log(obj);
                
                fs.writeFile("../database/"+req.body.name+"/data."+fileType, JSON.stringify(obj) , function(err) {
                    if(err) {
                        return console.log(err);
                    }
                
                    console.log("The file was saved!");
                }); 
                 
              }) 
            
        }
        res.send({});
})
app.post('/selectData',(req, res) => {
    var {col}=req.body;
        if (!fs.existsSync("../database/"+req.body.name)) {
            console.log("table not exist");
        }
        else{
            fs.readFile("../database/"+req.body.name+"/data."+fileType, 'utf-8', (err, data) => {
                if (err) console.log(err);
                // var hash={};
                // var obj=JSON.parse(data)
                // for(let i=0;i<4000;i++)
                // {
                //     hash[obj[i].first_name]=i;
                // }
                // fs.writeFile("./database/"+req.body.name+"/index."+fileType, JSON.stringify(hash) , function(err) {
                //     if(err) {
                //         return console.log(err);
                //     }
                
                //     console.log("The file was saved!");
                // }); 
                // console.log(obj[hash['Ivory']]);
                
                res.send(data);
              })
              
        }
       
})
  
server.listen(port , ()=>{console.log(`Listening on Port ${port}`)})