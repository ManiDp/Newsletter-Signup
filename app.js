const express= require("express");
const request=require("request");
const bodyParser = require("body-parser");;
const https= require("https");

const app=express();

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})
app.listen(process.env.PORT || 3000,function(){
    console.log(3000);
});


app.post("/",function(req,res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    // console.log(firstName + " " + lastName + " " + email);

    const data={
        members: [
            {
                "email_address": email,
                "status": "subscribed",
                "merge_fields":
                    {
                        "FNAME": firstName,
                        "LNAME": lastName
                    }
                
            }
        ]
    };

    app.post("/failure",function(res,res){
        res.redirect("/");
    });


    const url =  "https://us21.api.mailchimp.com/3.0/lists/90390b2a72";

    const jsonData=JSON.stringify(data);
    
    const options={
        method: "POST",
        auth: "Mani:6bdfdb63f44c429a56816255be8c7ba2-us21"
    }

    const request = https.request(url,options,function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }else{
            // res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data).status);
        })
    })

    request.write(jsonData);
    request.end();
});

// API Keys
// 6bdfdb63f44c429a56816255be8c7ba2-us21

// List ID
// 90390b2a72