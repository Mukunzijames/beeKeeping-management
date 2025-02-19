import Image from "next/image";
import Navbar from "@/components/navbar";
import Header from "@/components/header";
import AboutUs from "@/components/about";
import Testimonials from "@/components/testimonials";
import BeekeepingManagement from "@/components/do";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Header />
      <AboutUs />
      <BeekeepingManagement />
      <Testimonials />
      <Footer />
    </main>
  );
}
