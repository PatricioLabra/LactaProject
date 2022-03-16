import { Schema, model } from "mongoose";

const controlSchema = new Schema({

    child_name:{
        required:true,
        type: String,
        trim: true
    },
    consultation_place:{
        required: true,
        type: String,
        trim: true
    },
    monitoring_medium:{
        required: true,
        type: String,
        trim: true
    },
    date_control:{
        required: true,
        type: Date,
        trim: true
    },
    weight:{
        type: Number,
        default: null
    },
    reason_of_consultation:{
        type: String,
        trim: true,
        default: null
    },
    accompanied_by:{
        type: String,
        trim: true,
        default: null
    },
    emotional_status:{
        type: String,
        trim: true,
        default: null

    },
    observations:{
        type: String,
        trim: true,
        default : null
    },
    indications:{
        type: [String],
        trim: true,
        default: null
    },
    id_child:{
        required: true,
        type: String,
        trim: true
    },
    id_mother:{
        required: true,
        type: String,
        trim: true
    }
},{
    versionKey: false,
    timestamps: true
});

export default model('Control', controlSchema);
