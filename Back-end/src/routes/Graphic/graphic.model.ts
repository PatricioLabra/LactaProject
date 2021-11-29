import { Schema, model } from "mongoose";

const graphicSchema = new Schema({
    name_data: {
        required: true,
        type: String,
        trim: true
    },
    options: [
        {
            name: { 
                required: true,
                type: String,
                trim: true
            }, 
            quantity: {
                required: true,
                type: Number,
                trim: true
            }
        }
    ]
},{
    versionKey: false,
    timestamps: true
});

export default model('Graphic', graphicSchema);
