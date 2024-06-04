
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"


import {decode} from 'next-auth/jwt'
export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
const publicRoutes = ['/login', '/signup'];
// const protectedRoutes = ['/dashboard'];
const protectedRoutes = ['/admin'];
// -------------------------------------------------------->
const adminRoutes = ['/admin']; // All admin routes start with '/admin'
const userRoutes = ['/user']; // All user routes start with '/user'
// -------------------------------------------------------->
const ROOT = '/';

  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
// ----------------------------------->
const isAdminRoute = adminRoutes.some(route => path.startsWith(route));
const isUserRoute = userRoutes.some(route => path.startsWith(route));
// --------------------------------------->

  // const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path);
 
  // 3. Decrypt the session from the cookie
  const session = cookies().get('next-auth.session-token')?.value;
    console.log(path,"middle")
    const decoded = await decode({
      token: session,
      secret: process.env.NEXTAUTH_SECRET|| 'KSDFHKHS98S78SDFNKSDJF',
      });
      
    if(session) console.log("token value:========>",(decoded))
 
      // -------------------------------------------------------=====================>

      // Check if the user is trying to access an admin route
  if (isAdminRoute) {
    // If there's no session, or the role is not 'admin', redirect to login
    if (!session || !decoded || decoded.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
  }

  // Check if the user is trying to access a user route
  if (isUserRoute) {
    // If there's no session, or the role is not 'user', redirect to login
    if (!session || !decoded || decoded.role !== 'USER') {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }
  }

  if (isPublicRoute && session) {
    if (decoded?.role === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin/dashboard', req.nextUrl));
    } else if (decoded?.role === 'USER') {
      return NextResponse.redirect(new URL('/user/dashboard', req.nextUrl));
    }
  }

      // -------------------------------------------------------==================>



  // // // 5. Redirect to /login if the user is not authenticated
  // if (isProtectedRoute && !session && path !== ROOT) {
  //   return NextResponse.redirect(new URL('/login', req.nextUrl))
  // }
 
  // // // 6. Redirect to /dashboard if the user is authenticated
  // if (
  //   isPublicRoute &&
  //   session &&
  //   !req.nextUrl.pathname.startsWith('/dashboard')
  // ) {
  //   return NextResponse.redirect(new URL('admin/dashboard', req.nextUrl))
  // }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}