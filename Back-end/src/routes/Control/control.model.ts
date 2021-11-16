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
        required: true,
        type: Number,
        trim: true
    },
    reason_of_consultation:{
        required: true,
        type: String,
        trim: true
    },
    accompanied_by:{
        required: true,
        type: String,
        trim: true
    },
    emotional_status:{
        required: true,
        type: String,
        trim: true
    },
    observations:{
        required: true,
        type: String,
        trim: true
    },
    indications:{
        required: true,
        type: [String],
        trim: true
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
