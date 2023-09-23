const express = require("express");
const cors = require("cors");

const app = express();
const port = "8888";

const authRouter = require('./routers/authRouter')

// app.use(function(req,res,next){
//     if(req.url === "/")
// })

//Middlewares
app.use(cors());
app.use('/', express.json()); //convert all requests to json
app.use("/auth", authRouter)

app.listen(port, () =>{
    console.log(`app is listening at http://localhost:${port}`)
})
