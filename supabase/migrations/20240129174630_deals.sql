CREATE TABLE deal_stages (
    deal_stage_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    stage_name VARCHAR(255) 
);

INSERT INTO deal_stages (stage_name) VALUES ('Prospecting'), ('Negotiation');

CREATE TABLE deals (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    organization_id BIGINT NOT NULL REFERENCES public.organizations,
    contact_id INT REFERENCES contact(id),
    deal_stage_id INT REFERENCES deal_stages(deal_stage_id),
    deal_value DECIMAL,
    expected_close_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
