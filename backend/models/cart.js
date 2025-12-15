import mongoose from 'mongoose';

const itemschema=new mongoose.Schema({
    pid:{type:String, required:true},
    pname:String,
    pprice:Number,
    pimage:String,
    pqty:{type:Number,default:1}
},{_id:false});

const cartschema=new mongoose.Schema({
    userid:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true,unique:true},
    items:[itemschema]
},{timestamps:true});

export default mongoose.model("cart",cartschema);