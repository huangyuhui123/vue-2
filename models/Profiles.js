const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    type:{
        type: String,
    },
    describe:{
        type: String
    },
    income:{
        type: String,
        required:true
    },
    expend:{
        type: String,
        required:true
    },
    cash:{
        type: String,
        required:true
    },
    remark:{
        type: String,
    }
})

module.exports = User =mongoose.model("profile",ProfileSchema);