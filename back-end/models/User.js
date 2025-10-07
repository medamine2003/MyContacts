import mongoose from "mongoose";


const userSchema = new mongoose.Schema({ 
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    
      
    
  },
  { timestamps: true } 
);

const User = mongoose.model("User", userSchema);
/*const user_1=new User({
  firstName:"tests",
  lastName:"tests",
  email:"test@tests.fr",
  password: "tests123"
})
user_1.save();*/
export default User;