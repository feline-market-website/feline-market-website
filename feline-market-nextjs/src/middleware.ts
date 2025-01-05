import { NextResponse } from 'next/server'
import getMe from './actions/auth/getMeAction'

export async function middleware() {
    const user = await getMe()
    if(!user) {
        return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/login`));
    }
  return NextResponse.next()
}
 

export const config = {
  matcher: '/vendor/:path*',
}