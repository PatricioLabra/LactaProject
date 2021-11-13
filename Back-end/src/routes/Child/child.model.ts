import { Schema, model } from "mongoose";

const childSchema = new Schema({
  name: {
    required: true,
    type: String,
    trim: true
  },
  controls:{
    required: true,
    type: [Schema.Types.Mixed],
    trim: true
  },
  gestacion_data:{
    diseases_during_pregnancy:{ required:true, type: [String] } ,
    nutritional_status_mother: { required:true, type: String },
    planned_pregnancy: { required:true, type: Boolean },
    assisted_fertilization: { required: true, type: Boolean },
    previus_lactation: { required: true, type: String },
    duration_of_past_lactation: { required: true, type: Number },
    breastfeeding_education: { required: true, type: Boolean }
  },
  birth_data:{
    birthplace: { required:true, type: String },
    type_of_birth: { required:true, type: String },
    birthday: { required:true, type: Date },
    gestional_age: { required:true, type: Number },
    gender: { required:true, type: String },
    birth_weight: { required:true, type: Number },
    skin_to_skin_contact:{ required:true, type: Boolean },
    breastfeeding_b4_2hours:{ required:true, type: Boolean },
    has_suplement:{ required: true, type: Boolean },
    why_recived_suplement:{ required:false, type: String },
    joint_accommodation:{ required:true, type: Boolean },
    use_of_pacifier:{ required:true, type: Boolean },
    post_discharge_feeding:{ required:true, type: String },
    last_weight_control:{ required:true, type: Number }
  },
  id_mother:{ required:true, type: Schema.Types.ObjectId }
},{
    versionKey: false,
    timestamps: true
});

export default model('Child', childSchema);
