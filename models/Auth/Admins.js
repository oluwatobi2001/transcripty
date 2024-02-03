const mongoose =  require("mongoose");

const AdminSchema = mongoose.Schema({

    UserName: {
        type: String,
        required: true,
        unique: true
    },
    userEmail: {
        type: String,
        unique: true

    },
    userPassword: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        unique: true,
        required: true
    },

   
    
}, 
);


  
module.exports = mongoose.model('Admin' , AdminSchema);
