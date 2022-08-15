import { Schema, model } from "mongoose";

const childSchema = new Schema({
  name: {
    required: true,
    type: String,
    trim: true
  },
  gestacion_data:{
    diseases_during_pregnancy:{ required:false, type: [String] } ,
    planned_pregnancy: { required:false, type: Boolean },
    assisted_fertilization: { required: false, type: Boolean },
    previous_lactaction: { required: false, type: String },
    duration_of_past_lactaction_in_months: { required: false, type: Number, min: 0 },
    breastfeeding_education: { required: false, type: Boolean }
  },
  birth_data:{
    birthplace: { required:true, type: String },
    type_of_birth: { required:true, type: String },
    birthday: { required:true, type: Date },
    gestional_age: { required:false, type: Number },
    gender: { required:false, type: String },
    birth_weight: { required:false, type: Number },
    skin_to_skin_contact:{ required:false, type: Boolean },
    breastfeeding_b4_2hours:{ required:false, type: Boolean },
    has_suplement:{ required: false, type: Boolean },
    why_recived_suplement:{ required:false, type: String },
    joint_accommodation:{ required:false, type: Boolean },
    use_of_pacifier:{ required:false, type: Boolean },
    post_discharge_feeding:{ required:false, type: String },
    last_weight_control:{ required:false, type: Number }
  },
  id_mother:{ required:true, type: String }
},{
    versionKey: false,
    timestamps: true
});

export default model('Child', childSchema);
