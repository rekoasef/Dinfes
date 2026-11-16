# Base de datos

Las migraciones de `migrations/` son las que están aplicadas en el proyecto de Supabase, con el mismo número de versión. Para recrear la base en otro proyecto, aplicalas en orden.

Esto no copia el contenido del catálogo, que vive en la base y lo edita el cliente desde `/admin`. Para moverlo, exportá las tablas `categories` y `products` del proyecto actual.

Para dar acceso al panel:

1. Creá el usuario en Authentication → Users → Add user, con "Auto Confirm User" tildado.
2. Agregalo como admin:

   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'EMAIL_DEL_USUARIO';
   ```
