'use client';
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <SignIn 
          afterSignInUrl="/dashboard/stastics"
          redirectUrl="/dashboard/stastics"
        />
      </div>
    </div>
  );
}
