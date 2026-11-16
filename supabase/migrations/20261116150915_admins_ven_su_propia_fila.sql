-- Lets the panel ask "am I an admin?" without exposing who the other admins are.
grant select on public.admins to authenticated;
create policy "Cada usuario ve solo su propia fila" on public.admins
  for select to authenticated
  using (user_id = (select auth.uid()));
