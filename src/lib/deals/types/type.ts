
export interface Deals{
    id:number;
    organization_id?: number;
    contact_id?: number|{
        id?:number
        last_name?:string
        first_name?:string
    };
    deal_stage_id?:number|{
        deal_stage_id?:number;
        stage_name:string
    };
    deal_value?: number;
    expected_close_date?:string;
    deal_owner?:number|{
        id?:number
        last_name?:string
        first_name?:string
    };

}

export interface DealStageType{
    deal_stage_id:number;
    stage_name:string

}

