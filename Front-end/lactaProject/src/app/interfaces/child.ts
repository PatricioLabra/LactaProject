export interface typeChild{
    _id?:string,
    name:string,
    gestacion_data:gestationData,
    birth_data:birthData
}
interface gestationData{
    diseases_during_pregnancy: string[],
    nutritional_status_mother: string,
    planned_pregnancy: boolean,
    assisted_fertilization: boolean,
    previous_lactaction: string,
    duration_of_past_lactaction_in_months?: number,
    breastfeeding_education: boolean
}
interface birthData{
    birthplace: string,
    type_of_birth: string,
    birthday: Date,
    gestional_age: number,
    gender: string,
    birth_weight: number,
    skin_to_skin_contact: boolean,
    breastfeeding_b4_2hours: boolean,
    has_suplement: boolean,
    why_recived_suplement?: string,
    joint_accommodation: boolean,
    use_of_pacifier: boolean,
    post_discharge_feeding: string,
    last_weight_control: number
}