import Link from 'next/link';
import { FaLinkedin, FaTwitter, FaGithub, FaFacebook, FaSlack } from 'react-icons/fa';
import Image from 'next/image';
import favicon from '@/assets/favicon.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-600 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center">
              <Image src={favicon} alt="Navfarm Logo" width={30} height={10} />
            </Link>
            <h6 className="text-xl font-bold">Apiculture</h6>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Other Links</h3>
            <ul className="space-y-3">
              <li><Link href="/explore">Explore Navfarm</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms and Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Industries</h3>
            <ul className="space-y-3">
              <li><Link href="/agriculture">Agriculture</Link></li>
              <li><Link href="/dairy">Dairy</Link></li>
              <li><Link href="/piggery">Piggery</Link></li>
              <li><Link href="/poultry">Poultry</Link></li>
              <li><Link href="/aquaculture">Aquaculture</Link></li>
              <li><Link href="/beekeeping">Beekeeping</Link></li>
              <li><Link href="/sheep-farm">Sheep-Farm</Link></li>
              <li><Link href="/livestock">Livestock</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Contact</h3>
            <ul className="space-y-3">
              <li>+250787481266</li>
              <li>sales@apiculture.com</li>
              <li>bee-keeping-management.vercel.app</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="https://linkedin.com" className="text-gray-500 hover:text-gray-800"><FaLinkedin size={24} /></Link>
            <Link href="https://twitter.com" className="text-gray-500 hover:text-gray-800"><FaTwitter size={24} /></Link>
            <Link href="https://facebook.com" className="text-gray-500 hover:text-gray-800"><FaFacebook size={24} /></Link>
            <Link href="https://github.com" className="text-gray-500 hover:text-gray-800"><FaGithub size={24} /></Link>
            <Link href="https://slack.com" className="text-gray-500 hover:text-gray-800"><FaSlack size={24} /></Link>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-500">
            <div className="flex space-x-6">
              <Link href="/privacy">Privacy policy</Link>
              <Link href="/terms">Terms & conditions</Link>
              <Link href="/cookies">Cookie statement</Link>
            </div>
            <div className="text-gray-500">© {currentYear} Tolgee All rights reserved</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
