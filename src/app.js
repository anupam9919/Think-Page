const express= require("express");
const path= require('path');
const app = express();
require("./db/conn");
const Register=require("./register");
sessions = require("express-session");

const port=process.env.PORT ||3000;
const static_path=path.join(__dirname,"../public")

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.use(sessions({ secret: 'your secret', saveUninitilized: true, resave: false }));

app.get("/",(req,res) => {
    res.render("index")
});

/*app.get("/", function (req, res) {
    res.sendFile(__dirname + "/form.html");

});


app.get("/reg",function(req,res){
    res.sendFile("C:/Users/anuci/OneDrive/Desktop/think page/login/public/reg.html");
});


app.get("/insertFile", function (req, res) {
    req.session.name = req.query.txt; 
    res.redirect("/think");

});


app.get("/think", function (req, res) {
    res.send(req.session.name);
});*/

/*app.get("/register", (req, res) => {
    alert("You have registered successfully!!")
   // res.render("index")
});*/
app.get("/login", (req, res) => {
    res.render("login")
});


app.post("/register", async(req, res) => {
    try {
        const password = req.body.password;
        const cnfpassword = req.body.confirmpassword;

        if(password === cnfpassword) {
            const reg= new Register({
                name: req.body.name,
                email: req.body.email,
                password:password,
                confirmpassword: cnfpassword
            })
            const registered =await reg.save();
            res.status(201).render("index.html");
        }
        else {
            res.send("password are not matching");
        }
    }
    catch (error) {
        res.status(404).send(error);
    }
});

app.post('/login',async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        
        const usereamil =await Register.findOne({ email: email});
       

        if(usereamil.password === password) {
            res.status(201).redirect("think.html")
        }
        else
        {
            res.send("invalid login details");
        }
        
    }
    catch(error) {
       res.status(400).send("invalid email") 
    }

})
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
}) 