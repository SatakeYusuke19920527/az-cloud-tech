import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { ALLOW_ID } from './lib/config';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/']);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();
  console.log('🚀 ~ clerkMiddleware ~ userId:', userId);

  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  // 許可 ID に含まれなければアクセス拒否
  if (userId && !ALLOW_ID.includes(userId!)) {
    // 任意のページへリダイレクト or 403 応答
    return new Response(
      'You are not a member of the PoC team. If you have any questions, please contact Yusuke.',
      { status: 403 }
    );
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
