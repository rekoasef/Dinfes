-- Who may edit the catalogue. Being signed in is not enough: the user must be listed here.
create table public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;
revoke all on public.admins from anon, authenticated;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = (select auth.uid()));
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null check (length(trim(name)) > 0),
  short_description text not null default '',
  intro text not null default '',
  hero_image text not null default '',
  features text[] not null default '{}',
  chips text[] not null default '{}',
  position integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories (id) on delete restrict,
  title text not null check (length(trim(title)) > 0),
  description text not null default '',
  image text,
  pdf text,
  youtube_id text check (youtube_id is null or youtube_id ~ '^[A-Za-z0-9_-]{11}$'),
  specs jsonb not null default '[]' check (jsonb_typeof(specs) = 'array'),
  position integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index products_category_position_idx on public.products (category_id, position);

create trigger categories_updated_at before update on public.categories
  for each row execute function public.set_updated_at();
create trigger products_updated_at before update on public.products
  for each row execute function public.set_updated_at();

alter table public.categories enable row level security;
alter table public.products enable row level security;

grant select on public.categories, public.products to anon, authenticated;
grant insert, update, delete on public.categories, public.products to authenticated;

create policy "Lectura publica de categorias publicadas" on public.categories
  for select to anon, authenticated
  using (published or (select public.is_admin()));
create policy "Admins crean categorias" on public.categories
  for insert to authenticated with check ((select public.is_admin()));
create policy "Admins editan categorias" on public.categories
  for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "Admins borran categorias" on public.categories
  for delete to authenticated using ((select public.is_admin()));

create policy "Lectura publica de productos publicados" on public.products
  for select to anon, authenticated
  using (published or (select public.is_admin()));
create policy "Admins crean productos" on public.products
  for insert to authenticated with check ((select public.is_admin()));
create policy "Admins editan productos" on public.products
  for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "Admins borran productos" on public.products
  for delete to authenticated using ((select public.is_admin()));

-- Uploaded photos and spec sheets. Public read through the CDN URL; only admins write.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'catalogo', 'catalogo', true, 20971520,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'application/pdf']
);

create policy "Admins leen archivos del catalogo" on storage.objects
  for select to authenticated
  using (bucket_id = 'catalogo' and (select public.is_admin()));
create policy "Admins suben archivos al catalogo" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'catalogo' and (select public.is_admin()));
create policy "Admins reemplazan archivos del catalogo" on storage.objects
  for update to authenticated
  using (bucket_id = 'catalogo' and (select public.is_admin()));
create policy "Admins borran archivos del catalogo" on storage.objects
  for delete to authenticated
  using (bucket_id = 'catalogo' and (select public.is_admin()));
