"use client";

import { Facebook, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoBig from "../Assets/buurbakLogoBigColor.svg";

const Footer = () => {
  const currentRoute = usePathname();

  return (
    <footer className="w-full bg-[#f7f7f7] border-t border-gray-200 pt-8">
      {/* Bovenste deel */}
      <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-y-10 px-6 xl:px-28 2xl:px-52 pb-8 max-sm:items-center max-sm:justify-center max-sm:min-h-[300px]">
        {/* Navigatie Links */}
        <div className="flex flex-1 justify-center lg:justify-start items-start order-2 lg:order-1 max-sm:justify-center">
          <div className="flex flex-wrap justify-start gap-20 min-w-[260px] max-w-[600px] max-sm:flex-col max-sm:gap-6 max-sm:text-center max-sm:items-center max-sm:justify-center">
            <div className="max-sm:text-center">
              <p className="text-primary-100 font-bold text-sm mb-2.5">
                AANBOD
              </p>
              <p className="mt-1.5 hover:font-medium">
                <Link
                  href="/aanbod"
                  className="text-[13.5px] no-underline text-gray-500 hover:text-primary-100 transition-colors"
                >
                  Vind aanhangers
                </Link>
              </p>
            </div>
            <div className="max-sm:text-center">
              <p className="text-primary-100 font-bold text-sm mb-2.5">
                VERHUREN
              </p>
              <p className="mt-1.5 hover:font-medium">
                <Link
                  href="/verhuren"
                  className="text-[13.5px] no-underline text-gray-500 hover:text-primary-100 transition-colors"
                >
                  Plaats aanhanger
                </Link>
              </p>
            </div>
            <div className="max-sm:text-center">
              <p className="text-primary-100 font-bold text-sm mb-2.5">
                CONTACT
              </p>
              <p className="mt-1.5 hover:font-medium">
                <Link
                  href="/contact"
                  className="text-[13.5px] no-underline text-gray-500 hover:text-primary-100 transition-colors"
                >
                  Contact opnemen
                </Link>
              </p>
            </div>
          </div>
        </div>
        {/* Socials en Logo */}
        <div className="flex flex-col items-center lg:items-end gap-4 min-w-[250px] order-1 lg:order-2">
          <Link className="block" href="/">
            <Image height={40} width={160} alt="logo" src={LogoBig} />
          </Link>
          <p className="text-sm text-primary-100">Duurzaam door te delen</p>
          <div className="flex items-center mt-2">
            <a
              href="https://www.facebook.com/BuurBak"
              className="w-[42px] h-[42px] rounded-full bg-[#f1f1f1] mr-2.5 flex items-center justify-center text-xl text-gray-600 border hover:bg-primary-100 hover:text-white transition-all duration-300"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/buurbak/"
              className="w-[42px] h-[42px] rounded-full bg-[#f1f1f1] mr-2.5 flex items-center justify-center text-xl text-gray-600 border hover:bg-primary-100 hover:text-white transition-all duration-300"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://www.instagram.com/buurbak/"
              className="w-[42px] h-[42px] rounded-full bg-[#f1f1f1] mr-2.5 flex items-center justify-center text-xl text-gray-600 border hover:bg-primary-100 hover:text-white transition-all duration-300"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
      {/* Divider */}
      <div className="w-full h-px bg-gray-200"></div>
      {/* Legal */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 px-6 xl:px-28 2xl:px-52 py-6 bg-[#f3f3f3] text-center md:text-left">
        <div className="flex gap-6 flex-wrap justify-center md:justify-start">
          <Link
            href="https://drive.google.com/file/d/1D9S05Qn7hC3bsEi_ElAqz8uX1s6Se5UZ/view?usp=sharing"
            target="_blank"
            className="text-sm no-underline text-gray-500 hover:underline transition-colors"
          >
            Algemene voorwaarden
          </Link>
          <Link
            href="https://drive.google.com/file/d/12uOHI1prSnsfgaYo3nR8YhIy0UNVzukr/view?usp=sharing"
            target="_blank"
            className="text-sm no-underline text-gray-500 hover:underline transition-colors"
          >
            Privacystatement
          </Link>
        </div>
        <div className="text-sm text-gray-500 mt-2 md:mt-0">
          ©Alle rechten gereserveerd BuurBak
        </div>
      </div>
    </footer>
  );
};

export default Footer;
