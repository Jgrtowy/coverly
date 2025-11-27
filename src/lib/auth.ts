import { betterAuth } from "better-auth";

export const auth = betterAuth({
    socialProviders: {
        spotify: {
            clientId: process.env.SPOTIFY_CLIENT_ID as string,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
            scope: ["user-top-read"],
        },
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 7 * 24 * 60 * 60, // 7 days cache duration
            strategy: "jwe", // can be "jwt" or "compact"
            refreshCache: true, // Enable stateless refresh
        },
    },
    account: {
        storeStateStrategy: "cookie",
        storeAccountCookie: true, // Store account data after OAuth flow in a cookie (useful for database-less flows)
    },
    trustedOrigins: [process.env.BETTER_AUTH_URL as string],
});
