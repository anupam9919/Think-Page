const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/think_page",{ 
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(() =>{
    console.log(`Connected`);
}).catch((e) =>{
    console.log(`Failed to connect`);
});