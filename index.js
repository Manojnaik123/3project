if(process.env.NODE_ENV !=='production'){
    require('dotenv').config();
}
const express=require('express');
const path=require('path')
const ejsMate=require('ejs-mate')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const app=express()
const Event=require('./modules/events')
const Event2=require('./modules/events2')
const Call=require('./modules/call')
const dbUrl=process.env.SRC_URL


app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.static(path.join(__dirname,'public')));
app.engine('ejs',ejsMate)




app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true})); 

mongoose.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology: true });
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error'));
db.once('open',()=>{
  console.log('database connected');
})




app.get('/home',(req,res)=>{
    res.render('pages/home.ejs')
})
app.post('/home',async(req,res)=>{
    const data=new Call(req.body);
    await data.save()
    res.redirect('/home')
})

//event


app.get('/events',async(req,res)=>{       
    const data=await Event.find()   ;     
    const arr=[];
    data.forEach(lop);
    function lop(item,index){
        arr.push(item);
    }    
    res.render('pages/events.ejs',{arr:arr})
})


//events2


app.get('/events2',async(req,res)=>{    
    
    const data=await Event2.find()   ;     
    const arr=[];
    data.forEach(lop);
    function lop(item,index){
        arr.push(item);
    }    
    res.render('pages/events2.ejs',{arr:arr})
})


//contact


app.get('/contact',(req,res)=>{                             
    res.render('pages/contact')
})

//about

app.get('/about',(req,res)=>{                                 
    res.render('pages/about')
})

//addevents


app.get('/addevents',async(req,res)=>{                       
    res.render('pages/addevents.ejs')
})

app.post('/addevents',async(req,res)=>{
    const data = new Event(req.body);
    await data.save()
    console.log(data);
    res.redirect(`/events/${data._id}`)
})

//addevents2


app.get('/addevents2',async(req,res)=>{
    res.render('pages/addevents2.ejs')
})

app.post('/addevents2',async(req,res)=>{
    const data = new Event2(req.body);
    await data.save()
    console.log(data);
    res.redirect(`/events2/${data._id}`)
})


//call list

app.get('/calllist',async(req,res)=>{
     const data=await Call.find()
     res.render('pages/calllist',{data})
})
//events show


app.get('/events/:id',async(req,res)=>{
    const {id}=req.params
    if(mongoose.Types.ObjectId.isValid(id)){
        const data=await Event.findOne({_id:id});
        // console.log(data);
        res.render('pages/showevents',{data})

    }else{
        res.send('error')
    }
     
})

//events2 show


app.get('/events2/:id',async(req,res)=>{
    const {id}=req.params
    if(mongoose.Types.ObjectId.isValid(id)){
        const data=await Event2.findOne({_id:id});
        // console.log(data);
        res.render('pages/showevents2',{data})

    }else{
        res.send('error')
    }
    
     
})
app.listen(3000,(req,res)=>{
    console.log('listening on port 3000');
})