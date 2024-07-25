const express = require("express")
const app = express()

const bodyParser = require("body-parser")

const request = require("request")
const https = require("https")

app.use(express.static("public"))


app.use(bodyParser.urlencoded({
    extended:true
}))

app.get("/",(req,res)=>{
    res.sendFile(`${__dirname}/signup.html`)
})

app.post("/",(req,res)=>{
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members : [{
            email_address: email,
            status : "subscribed",
            merge_fields: {
                FNAME: fName,
                LNAME: lName,
             }
        }]
    }

    const jsonData = JSON.stringify(data)
    console.log(jsonData);
    const url = "https://us22.api.mailchimp.com/3.0/lists/badfba5e87"
    const option = {
        method : "POST",
        auth : 'aayushi:52b1d1d476f03cc4bd8435697b052864-us22'
    }
    const request = https.request(url,option,(response)=>{
        console.log(response.statusCode);
        response.on("data",(data)=>{
            console.log(JSON.parse(data));
        })
        if(response.statusCode === 200){
            res.sendFile(`${__dirname}/success.html`)
        }else{
            res.sendFile(`${__dirname}/failure.html`)
        }
    })

    request.write(jsonData);
    request.end()
})

app.post("/failure",(req,res)=>{
    res.redirect("/")
})
app.listen(process.env.PORT|| 3000,()=>{
    console.log("Server is running on port 3000");
})

// api key: 52b1d1d476f03cc4bd8435697b052864-us22
// 
//  badfba5e87