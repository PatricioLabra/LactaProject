import { Schema, model } from "mongoose";

const controlSchema = new Schema({

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
        required: false,
        type: Number,
        trim: true
    },
    reason_of_consultation:{
        required: false,
        type: String,
        trim: true
    },
    accompanied_by:{
        required: false,
        type: String,
        trim: true
    },
    emotional_status:{
        required: false,
        type: String,
        trim: true
    },
    observations:{
        required: false,
        type: String,
        trim: true
    },
    indications:{
        required: false,
        type: [String],
        trim: true
    },
    id_child:{
        required: true,
        type: Schema.Types.ObjectId,
        trim: true
    },
    id_mother:{
        required: true,
        type: Schema.Types.ObjectId,
        trim: true
    }
},{
    versionKey: false,
    timestamps: true
});

export default model('Control', controlSchema);
