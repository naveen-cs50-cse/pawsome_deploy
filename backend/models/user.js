import mongoose, { trusted } from 'mongoose';
// mongoose.connect("mongodb://localhost:27017/registerlogin")
const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    email:{
        type:String
    },
    password: {
        type: String,
        required: true
        // minlength: 6
    }
});
const User = mongoose.model('customers', userschema);

export default User;