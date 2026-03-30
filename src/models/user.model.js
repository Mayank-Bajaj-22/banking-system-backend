import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required field!"]
    },
    email: {
        type: String,
        required: [true, "Email is required field!"],
        unique: [true, "Email is already exists!"],
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address!"],
    },
    password: {
        type: String,
        required: [true, "Password is required field!"],
        minlength: [8, "Password should have atleast 8 characters"],
        select: false // jab tak apan add nhi karenge khud se jab tak yeh default me nhi aayega
    },
    role: {
        type: String,
        email: ["user", "admin", "system"],
        default: "user",
        immutable: true
    },
    refreshToken: {
        type: String,
        select: false
    }
}, {
    timestamps: true
})

// It triggers automatically when you call - user.save() or user.create()
userSchema.pre("save", async function() {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password,10)
})

// This is a custom instance method used to compare a plain password with the hashed password in DB.
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password,this.password)
}

export const User = mongoose.model("User", userSchema)