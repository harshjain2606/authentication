const express = require("express")
const jwt= require("jsonwebtoken")
const jwtpassword="123456"
const app= express()
app.use(express.json())
const ALL_USERS=[
    {
        username :"harshjain@gmail.com",
          password : "123",
          name: "harsh jain"
    },
    {
        username :"raman@gmail.com",
          password : "123321",
          name: "raman"
    },
    {
        username :"ram@gmail.com",
        password : "12332",
        name: "ram"
  },
]
    function userExist(username ,password){
            let  userExist= false;
            for(let i=0; i<ALL_USERS.length; i++){
              if(ALL_USERS[i].username==username && ALL_USERS[i].password==password){
                userExist=true
              }
            }
            return userExist

    }

    app.post("/signin",(req,res)=>{
        const username= req.body.username
            const password= req.body.password
            if(!userExist(username,password)){
                return res.status(403).json({
              msg: `user doesnt exist in your memory`,
                } )
            }
            var token =jwt.sign({username:username},jwtpassword)
            return res.json({
                token,

            })
    })
    app.get( '/users', (req,res)=>{
        const token = req.headers.authorization
        try{
            const decoded=jwt.verify(token,jwtpassword)
            const username=decoded.username
        }
        catch(err){
          return res.status(403).json({
            msg:`invalid token`
          })
        }
    })
app.listen(3000)

