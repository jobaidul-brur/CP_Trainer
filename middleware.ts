import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    if (req.nextauth.token) {
      if (!req.nextauth.token.cfHandle) {
        const url = req.nextUrl.clone();
        url.pathname = "/profile";
        return NextResponse.rewrite(url);
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
