const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required:[true , 'userName is required']
    },
    email:{
        type: String,
        required:[true , 'email is required']
    },
    password:{
        type:String,
        required:[true, 'password is required']
    },
    address:{
        type: Array,
    },
    phone:{
        type:String,
        required:[true , 'phone number is required']
    },
    userType:{
        type: String,
        required:[true, 'userType will be required'],
        default: 'client',
        enum: ['client' , 'admin' , 'vendor' , 'rider']
    },
    profile:{
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/8792/8792047.png',

    },
    answer :{
        type: String,
        require: [true, 'answer will be required']
    }
},{timestamps:true});
module.exports = mongoose.model('User' , userSchema);