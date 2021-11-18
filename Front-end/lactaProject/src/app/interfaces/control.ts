export interface typeControl{
    _id?: string,
    dataNewControl?: controlData;
}
interface controlData{
    consultation_place: string,
    monitoring_medium: string,
    date_control: Date,
    weight: number,
    reason_of_consultation: string,
    accompanied_by: string,
    emotional_status: string,
    observations: string,
    indications: string[]
}