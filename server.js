const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const PORT = 8080;

//middleware  jason handle krne k leay use hota hai....
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
dotenv.config();
///mongoDB connect ke hai
(
    async ()=>{
     try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB will be connected!! ${mongoose.connection.host} on this host` )
     } catch (error) {
        console.log("Database is not connected !!!" , error);
     }
    }
)();
///yahan saye routes aa rahay han
const test_route = require('./routes/testRoute');
app.use('/app/v1/test' , test_route);
const auth_route = require('./routes/authRoute');
app.use('/app/v1/auth' , auth_route);
const user_route = require('./routes/userRouter');
app.use('/app/v1/user', user_route);
const user_restuarent = require('./routes/retuarentRoute');
app.use('/app/v1/restuarent', user_restuarent);
const user_category = require('./routes/categoryRouter');
app.use('/app/v1/createCategory', user_category);
const user_food = require('./routes/foodRoute');
app.use('/app/v1/food' , user_food);

app.get('/' ,(req, res)=>{
    res.send("Hello Muhammad Zaki");
});


app.listen(PORT , ()=>{
    console.log(`server will ve started on this ${PORT} port`);
})