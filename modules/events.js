const mongoose=require('mongoose');
// const { stringify } = require('querystring');

const eventSchema=new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    price:{
        required:true,
        type:Number
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

const Event=mongoose.model('Event',eventSchema);

module.exports=Event;
