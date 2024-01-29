CREATE TABLE contact (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   organization_id bigint not null references public.organizations,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(10),
    designation VARCHAR(255),
    linkedin_profile VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (email, phone)
);