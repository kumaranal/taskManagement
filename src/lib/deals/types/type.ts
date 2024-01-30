
export interface Deals{
    id:number;
    organization_id: number;
    contact_id: number;
    deal_stage_id:number;
    deal_value: number;
    expected_close_date:number;
    deal_owner:number;

}

export interface DealStageType{
    deal_stage_id:number;
    stage_name:Text

}

