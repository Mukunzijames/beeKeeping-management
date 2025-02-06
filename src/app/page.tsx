import Image from "next/image";
import Navbar from "@/components/navbar";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BeekeepingManagement from "@/components/do";
export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <BeekeepingManagement />
      <Footer />
    </div>
  );
}
