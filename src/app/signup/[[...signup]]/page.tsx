'use client';
import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <SignUp 
          afterSignUpUrl="/dashboard/stastics"
          redirectUrl="/dashboard/stastics"
        />
      </div>
    </div>
  );
}
