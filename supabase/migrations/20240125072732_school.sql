create table school (
  id bigint generated always as identity primary key,
  name text not null,
  address text not null,
  contact_no int not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
