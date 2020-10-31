const mongoose=require("mongoose");
const BudgetSchema=new mongoose.Schema({
        title:{
            type:String,
            required:true,
            unique:true
        },
        budget:{
            type:Number,
            required:true
        },
        color:{
            type:String,
            required:true,
            validate: [validate, 'The value of the color should be in hexadecimal format']
            
        }
},{collection: 'budget'})

function validate(s){
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(s)
}

module.exports=mongoose.model('budget',BudgetSchema)
