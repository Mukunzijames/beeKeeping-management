import { SignIn } from "@clerk/nextjs";

export default function Login() {

  return <div className="flex justify-center items-center h-screen"><div className="w-full max-w-md"><SignIn /></div></div>;
}
