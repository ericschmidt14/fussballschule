import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

const handler = NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID || "",
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || "",
      tenantId: process.env.AZURE_AD_TENANT_ID || "",

      authorization: {
        params: {
          useState: true,
          scope: "openid profile email",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/admin`;
    },
    async session({ session, token }) {
      session.user!.email = token.email;
      session.user!.name = token.name;
      session.user!.image = token.picture;
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (user && profile) {
        token.id = user.id;
        token.email = profile.email;
        token.name = profile.name;
        token.picture = profile.image;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
