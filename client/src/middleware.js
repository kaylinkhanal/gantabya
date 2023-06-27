import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const { pathname } = request.nextUrl
    const token = request?.cookies?.get('token')?.value
    
    if(!token && (pathname.includes('/rides') || pathname.includes('/users'))){
        return NextResponse.redirect(new URL('/login', request.url))
    }else{
        return NextResponse.next()
    }

}
