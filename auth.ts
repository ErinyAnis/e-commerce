import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

declare module 'next-auth' {
  interface Session {
    user: {
      email: string
      name?: string
      image?: string
      isAdmin: boolean
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async session({ session, token }) {
      // Check if the signed-in user email matches the admin email
      if (token?.email === 'erinyanis88@gmail.com') {
        session.user.isAdmin = true
      } else {
        session.user.isAdmin = false
      }
      return session
    },
    async jwt({ token, account, profile }) {
      // Store the user's email in the token
      if (account && profile) {
        token.email = profile.email
      }
      return token
    },
  },
});
