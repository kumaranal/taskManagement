export interface Activity{
    id:number,
    organizationId?: number;
    subject?: string;
    notes?: string;
    due_date?: string;
    status?: string;
    selectedContact?: string;
    activities?: string;
    contactDetails?:{
        last_name?:string
        first_name?:string
        id?:number
    };
    activityType?:{
        type_name?:string;
        activity_type_id?:number;
    }

}