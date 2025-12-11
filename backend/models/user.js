import mongoose, { trusted } from 'mongoose';
import Counter from './counter.js';
// mongoose.connect("mongodb://localhost:27017/registerlogin")
const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlenghth: 3
    },
    email:{
        type:String
    },
    password: {
        type: String,
        required: true
        // minlength: 6
    },
    userid: {

        type: String,
        // required: true,
        index:true

    }
});

userschema.pre('save', async function (next) {
    if (!this.isNew) return next();

    try {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'userid'},
            { $inc: { seq: 1 }},
            { new: true, upsert: true }

        );
        this.userid = counter.seq;
        next();
    }
 catch (err) {
    return next(err);
}

});
const User = mongoose.model('customers', userschema);

export default User;