-- Per-user plan, billing interval, and coach quota.
create table if not exists accounts (
  user_id text primary key,
  plan text not null default 'free',
  billing_interval text not null default 'monthly',
  display_name text,
  coach_count integer not null default 0,
  coach_period text not null,
  updated_at timestamptz not null default now()
);

create index if not exists accounts_plan_idx on accounts (plan);
