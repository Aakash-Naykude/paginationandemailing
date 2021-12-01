const {Schema, model} = require("mongoose")

const usersSchema = new Schema({
    first_name:{type:String, required:true},
    last_name:{type:String,required:true},
    email:{type:String, required:true},
    user:{type:String, required:false, default:"genral"}
},{
    versionKey:false,
    timestamps:true
})
module.exports = model("userss", usersSchema)