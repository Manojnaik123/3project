const mongoose=require('mongoose');

const callschema=new mongoose.Schema({
    num:String
})

const Call=mongoose.model('Call',callschema)
module.exports=Call


