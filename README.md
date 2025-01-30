# Nextjs 14| Next Auth | Prisma ORM | Shadcn ui | Postgre | Local dev

# setup auth

install next-auth
install prisma
install shadcn
install bcrypt
install swr

# use auth and session flow

create folder api/auth/[...next-auth]/route.ts
create auth.ts
create register page
create server action for register
create login page
use jwt strategy
use session callback
get session data in clinet component
fetch data from client using session data with swr
add protected url to prevent access specific page (must login)
add logic to prevent user already login to access login page url
