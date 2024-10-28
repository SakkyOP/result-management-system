const { Schema, model } = require("mongoose");
const { hash, compare } = require('bcrypt');

const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

adminSchema.pre("save", async function(next) {
    if (this.isModified("password")) return next();
    
    try {
        this.password = hash(this.password, 10);
        next() 
    } catch (error) {
        next(error);
    }
});

adminSchema.method("validate", async function (password) {
    const isValid = await compare(password, this.password);
    return isValid;
})

module.exports = model("Admin", adminSchema);