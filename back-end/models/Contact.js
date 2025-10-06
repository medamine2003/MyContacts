import mongoose from "mongoose";


const contactSchema = new mongoose.Schema({ 
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
    
  },
  
);

const Contact = mongoose.model("Contact", contactSchema);
/*const user_1=new User({
  firstName:"tests",
  lastName:"tests",
  email:"test@tests.fr",
  password: "tests123"
})
user_1.save();*/
export default Contact;