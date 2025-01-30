import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "api/auth/signin", // Halaman login
  },
});

export const config = {
  matcher: ["/protected/:path*"], // Proteksi rute di bawah /protected
};
