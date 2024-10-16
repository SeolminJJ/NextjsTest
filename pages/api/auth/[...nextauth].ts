import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import AppleProvider from 'next-auth/providers/apple';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        AppleProvider({
            clientId: process.env.APPLE_CLIENT_ID!,
            clientSecret: process.env.APPLE_CLIENT_SECRET!,
            // teamId: process.env.APPLE_TEAM_ID!,
            //keyId: process.env.APPLE_KEY_ID!,
            //privateKey: process.env.APPLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
        }),
    ],
    pages: {
        signIn: '/auth/signin',
    },
});