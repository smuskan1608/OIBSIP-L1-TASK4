const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const loginSchema = new mongoose.Schema({
    email : {
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    },
    cpassword : {
        type:String,
        required:true
    }
})
//pasword hashing before saving
loginSchema.pre("save",async function(next){
    //if user update password
    if(this.isModified("password")){
         
        this.password = await bcrypt.hash(this.password,10);
        console.log(this.password);
        //do not save confirm password
        this.cpassword = undefined;
        }
    
    next();
});

//now we need to create a collection
const Register = new mongoose.model("Register",loginSchema);
module.exports = Register;