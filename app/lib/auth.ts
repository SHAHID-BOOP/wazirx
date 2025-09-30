import GoogleProvider from "next-auth/providers/google";
import db from "../db"
import { Session } from "next-auth";
import { Keypair } from "@solana/web3.js";

export interface session extends Session {
    user: {
        id: string,
        email: string,
        name: string,
        image: string,
        uid: string
    };
}

export const authConfig = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""  
        })
    ],
    callbacks: {
        session: ({ session, token }: any): session => {
            const newsSession: session = session as session;
            if(newsSession.user && token.uid) {
                //@ts-ignore
                newsSession.user.uid = token.uid ?? ""
            }
            return newsSession;
        },
        async jwt ({ token, account, profile}: any) {
            const user  = await db.user.findFirst({
                where: {
                    sub: account?.providerAccountId ?? ""
                }
            })
            if(user) {
                token.uid = user.id
            }
            return token
        },
        async signIn({ user, account, profile, email, credentials}: any) {
            if (account?.provider === "google") {
                
                const email = user.email;
                if(!email) {        
                    return false;
                }

                const userDb =  await db.user.findFirst({
                    where: {
                        username: email
                    }
                })

                // if(userDb) {
                //     return true;
                // }
                

                const keypair = Keypair.generate();
                const publicKey = keypair.publicKey.toBase58();
                const privateKey = keypair.secretKey;

                if(userDb) {
                    return true;
                }

                await db.user.create({
                    data: {
                        username: email,
                        name: profile?.name,
                        
                        profilePicture: profile?.picture,
                        provider: "Google",
                        sub: account.providerAccountId, 
                        solWallet: {
                            create: {
                                publicKey: publicKey,
                                privateKey: privateKey.toString()
                            }
                        },
                        inrWallet: {
                            create: {
                                balance: 0
                            }
                        }
                    }
                })

                return true;

            }
            
            return false;   
        }
    }
}