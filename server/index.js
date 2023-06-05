const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser'); //used to process data sent in an HTTP request body.
const cors = require('cors')    //an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"nih_db"
})
// display data in table in frontend
app.get("/api/get" ,(req,res)=>{
    const sqlGet="SELECT * FROM doses";
    db.query(sqlGet,(error,result) =>{

    res.send(result)
    }) 

})
app.post("/api/post",(req,res)=>{
    const {dose} = req.body;
    const sqlInsert = "INSERT INTO doses (dose) VALUES (?)";
    db.query(sqlInsert,[dose],(error,result)=>{
        if(error){
            console.log(error)
        }
    })
})

app.delete("/api/delete/:id",(req,res)=>{
    const {id} = req.params;
    const sqlDelete = "DELETE FROM doses WHERE id=?";
    db.query(sqlDelete,id,(error,result)=>{
        if(error){
            console.log(error)
        }
    })
})

app.get("/api/get/:id" ,(req,res)=>{
    const {id} = req.params;
    const sqlGet="SELECT * FROM doses WHERE id= ?";
    db.query(sqlGet,id,(error,result) =>{
        if(error){
            console.log(error)
        }
    res.send(result)
    }) 

})
 
app.put("/api/update/:id",(req,res)=>{
    const {id} = req.params;
    const {dose} = req.body;
    const sqlUpdate = "UPDATE doses SET  dose = ? WHERE id = ?";
    db.query(sqlUpdate,[dose,id],(error,result)=>{
        if(error){
            console.log(error)
        }
    })
})

app.get("/",(req,res)=>{
    // console.log("Connected!");
    // const sqlInsert ="INSERT INTO doses (dose) VALUES ('zoha')";
    // db.query(sqlInsert,(error,result)=>{
    //     console.log(error);
    //     console.log(result);
    //     res.send("hello express")
    // })
  
})
app.listen(5000, ()=>{
 
    console.log("server is running on port 5000")
})
