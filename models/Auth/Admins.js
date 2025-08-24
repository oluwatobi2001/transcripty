const mongoose =  require("mongoose");

const AdminSchema = mongoose.Schema({

    userName: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
type: String,
required: true
    },
    lastName: {
        type: String,
        required: true
            },
    userEmail: {
        type: String,
        unique: true,
        required: true

    },
    userPassword: {
        type: String,
        required: true,
        min:  [7]
    },
    userRole: {
        type: String,
        
        required: true,
        enum : ["class co-ordinator", "dean", "admin"],
        default: "class co-ordinator"
    },

   
    
}, 
);


  
module.exports = mongoose.model('Admin' , AdminSchema);
