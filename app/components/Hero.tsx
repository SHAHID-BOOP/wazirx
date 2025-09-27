"use client"
import { signIn, useSession } from "next-auth/react"
import { SecondaryButton } from "./Button"
import { useRouter } from "next/navigation";

export const Hero = () => {
    const session  = useSession();
    const router = useRouter();
    return <div>
        <div className="text-6xl font-semibold">
            <span>
                The Indian Cryptocurrency
            </span>

            <span className="text-blue-400 pl-3">
                Revolution
            </span>             
        </div>
        <div className="flex justify-center pt-4 text-2xl text-slate-500">
            Create a frictionless wallet from India with just a Google Account.
        </div>
        <div className="flex justify-center text-2xl text-slate-500">
            Convert your INR into Cryptocurrency
        </div>
        <div className="flex pt-8 justify-center">
            {session.data?.user ? <SecondaryButton onClick={() => {
                router.push("/dashboard");
            }}>Go to Dashboard</SecondaryButton> : <SecondaryButton onClick={() => {
                signIn("Google");
            }}>Login with Google</SecondaryButton>}
        </div>
    </div>
}