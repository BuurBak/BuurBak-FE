"use client";

import {
  Facebook,
  Home,
  InstagramIcon,
  Linkedin,
  Mail,
  Menu,
  MessageCircleQuestion,
  Tag,
  X,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LogoWhite from "../Assets/Frame.svg";
import LogoColor from "../Assets/horizontalColorLogo.svg";
import { PlateauTrailer } from "../icons/TrailerIcons";
import Link from "next/link";

const Links = [
    { name: "Aanbod", url: "/Aanbod" },
    { name: "Ik wil verhuren", url: "/Verhuren" },
    { name: "Contact", url: "/Contact" },
    { name: "Inloggen", url: "/Inloggen" },
  ];

  const MobileLinks = [
    { name: "Home", url: "/", icon: Home },
    { name: "Aanbod", url: "/Aanbod", icon: PlateauTrailer },
    { name: "Verhuren", url: "/Verhuren", icon: Tag },
    { name: "Contact", url: "/Contact", icon: Mail },
    { name: "FAQ", url: "/FAQ", icon: MessageCircleQuestion },
  ];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  // add actual singed in verification
  const [singedIn, setSingendIn] = useState(false);
  const currentRoute = usePathname();
  const [scrolled, isScrolled] = useState(false);

  useEffect(() => {        
    function changeCss() {
      if (currentRoute === '/') {
        window.scrollY > 500 ? isScrolled(true) : isScrolled(false);
      }
    }

    
    window.addEventListener("scroll", changeCss, false);
  }, []);

  useEffect(() => {
    if (currentRoute !== '/') {
        isScrolled(true)
    }
  }, [currentRoute])

  

  return (
    <main>
      <div
        id="navbar"
        className={`fixed top-0 w-full z-50 ${scrolled ? "bg-white" : "bg-none"}`}
      >
        <div className="md:flex justify-between items-center md:px-10 py-4 px-7">
          {/*logo*/}
          <Link href='/'>{scrolled ? <Image
            alt="Buurbak logo"
            src={LogoColor}
            className={(open ? "hidden " : "") + "w-fit h-fit"}
          /> :<Image
            alt="Buurbak logo"
            src={LogoWhite}
            className={(open ? "hidden " : "") + "w-fit h-fit"}
          />}</Link>

          <div
            onClick={() => setOpen(!open)}
            className={
              "w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden"
            }
          >
            {open ? <X size={36} /> : <Menu color={`${scrolled ? "black" : "white"}`} size={36} />}
          </div>

          {/*Navbar*/}
          <div>
            <ul
              className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-50 z-[-1] top-0 h-screen md:h-fit bg-white md:bg-transparent md:w-auto md:pl-0 px-9 md:pr-0 pt-20 md:pt-0 transition-all duration-50 ease-in ${open ? "right-0 w-11/12" : "right-[-500px]"}`}
            >
              {singedIn ? (
                // replace with actual account data
                <div className="w-full flex flex-col items-center md:hidden">
                  <div
                    onClick={() => setSingendIn(false)}
                    className="h-32 w-32 rounded-full bg-gray-50"
                  ></div>
                  <p className="w-fit text-2xl font-semibold mt-4 mb-12">
                    Place Holder
                  </p>
                </div>
              ) : (
                <div className={`${open ? "" : "hidden"}`}>
                  <li className="py-4 text-lg font-semibold border-b-1 border-b-offWhite-100 md:border-0">
                    {/* add href back in */}
                    <a onClick={() => setSingendIn(true)}>Login</a>
                  </li>
                  <li className="py-4 mb-10 text-lg font-semibold border-b-1 border-b-offWhite-100 md:border-0">
                    <a href="">Registreren</a>
                  </li>
                </div>
              )}

              {open
                ? MobileLinks.map((link, index) => (
                    <li
                      className={`flex flex-row gap-4 align-center py-4 md:my-0 md:ml-8 text-lg font-semibold border-b-1 border-b-offWhite-100 md:border-0 ${link.url === currentRoute && "text-primary-100"}`}
                      key={index}
                    >
                      <link.icon size={32} />
                      <a className="mt-1" href={link.url}>
                        {link.name}
                      </a>
                    </li>
                  ))
                : Links.map((link, index) => (
                    <li
                      className={`py-4 md:my-0 md:ml-8 ${scrolled ? "text-secondary-100" : "text-white"} ${link.name.includes("Ik wil verhuren") && "md:bg-primary-100 md:px-4 md:py-2 md:rounded text-white"}`}
                      key={index}
                    >
                      {link.name.includes("Inloggen") && singedIn ? (
                        <div className="h-16 w-16 rounded-full bg-gray-50"></div>
                      ) : (
                        <a href={link.url}>{link.name}</a>
                      )}
                    </li>
                  ))}

              <div
                className={`flex flex-col mt-20 items-center ${open ? "" : "hidden"}`}
              >
                <p className="text-xl text-primary-100 font-semibold mb-6">
                  Volg ons
                </p>
                <div className="flex flex-row gap-8 justify-center">
                  <div className="bg-offWhite-100 p-4 rounded-full">
                    <InstagramIcon className="h-8 w-8" />
                  </div>
                  <div className="bg-offWhite-100 p-4 rounded-full">
                    <Linkedin className="h-8 w-8" />
                  </div>
                  <div className="bg-offWhite-100 p-4 rounded-full">
                    <Facebook className="h-8 w-8" />
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Navbar;
