const mongoose=require('mongoose');

const resortSchema=new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    price:{
        required:true,
        type:String
    },
    description:{
        required:true,
        type:String
    },
    img:{
        required:true,
        type:String
    },
    Food:String,
    Speaker:String,
    Drinks:String,
    Butler:String,
    Parking:String
});

const Event2=mongoose.model('Event2',resortSchema);

module.exports=Event2;