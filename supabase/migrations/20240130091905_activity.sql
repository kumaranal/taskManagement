CREATE TABLE activity_types (
    activity_type_id SERIAL PRIMARY KEY,
    type_name VARCHAR(255) NOT NULL
);

-- Populate Activity Types Table with initial data
INSERT INTO activity_types (type_name) VALUES ('Task'), ('Phone Call'), ('Meeting');

CREATE TABLE activities (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    organization_id BIGINT NOT NULL REFERENCES public.organizations,
    contact_id INT REFERENCES contact(id),
    activity_type_id INT REFERENCES activity_types(activity_type_id),
    subject VARCHAR(255),
    due_date DATE,
    status VARCHAR(255),
    notes TEXT
);