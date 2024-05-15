// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // This function can be marked `async` if using `await` inside

// export async function middleware(request: NextRequest) {
//   const isLoggedIn = request.cookies.get("isLoggedIn");
//   if (isLoggedIn?.value === "false") {
//     return NextResponse.redirect(new URL("/", request.url));
//   } else if (request.nextUrl.pathname === "/" && isLoggedIn?.value === "true") {
//     return NextResponse.redirect(new URL("/jobs", request.url));
//   }else{
//       return NextResponse.next();
//   }
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/","/jobs"],
// };
