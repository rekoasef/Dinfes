-- Policies still need to call it, but nobody should reach it through /rest/v1/rpc.
create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to anon, authenticated;
alter function public.is_admin() set schema private;
