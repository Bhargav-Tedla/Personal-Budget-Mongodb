const express = require('express');
var cors = require('cors');
const app = express();
const port = 3000;

//const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const BudgetSchema=require("./models/budget_schema")
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/',express.static('public'));





let url = 'mongodb://localhost:27017/mongodb_test';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>{
            console.log("Connected to the database");
        })
        .catch((connectionError)=>{
            console.log(connectionError)
        })



        
mongoose.set('useCreateIndex', true);

//app.use(bodyParser.json())


app.get('/budget', async (req, res) => {
    const budget_values = await BudgetSchema.find();
        res.send(budget_values);
    
});




app.post('/addData', async (req, res) => {
    const budget_values = new BudgetSchema({title: req.body.title, budget: req.body.budget, color: req.body.color}); 
    
        const budgetData_added = await budget_values.save();
        res.send(budgetData_added);
});

app.listen(port, ()=>{
    console.log(`API served at http://localhost:${port}`);
});