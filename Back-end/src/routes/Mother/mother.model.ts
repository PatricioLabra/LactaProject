import { Schema, model, SchemaTypes } from "mongoose";

const motherSchema = new Schema({
    name: {
        required: true,
        type: String,
        trim: true
    },
    rut: {
        required: true,
        type: String,
        trim: true
    },
    commune:{
        required: true,
        type: String,
        trim: true
    },
    phone_number:{
        required: true,
        type: String,
        trim: true
    },
    mail:{
        required: false,
        type: String,
        trim: true
    },
    birth:{
        required: true,
        type: Date,
        trim: true
    },
    ocupation:{
        required: true,
        type: String,
        trim: true
    },
    studies:{
        required: true,
        type: String,
        trim: true
    },
    marital_status:{
        required: true,
        type: String,
        trim: true
    },
    forecast:{
        required: true,
        type: String,
        trim: true
    },
    chronic_diseases:{
        required: true,
        type: [String],
        trim: true
    },
    number_of_living_children:{
        required: false,
        type: Number,
        trim: true
    }
},{
    versionKey: false,
    timestamps: true
});


export default model('Mother', motherSchema);
