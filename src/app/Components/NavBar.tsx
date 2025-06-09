"use client";

import {
  Car,
  LucideIcon,
  Mail,
  Menu,
  Tag,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LogoWhite from "../Assets/Frame.svg";
import LogoColor from "../Assets/horizontalColorLogo.svg";
import { PlateauTrailer } from "../icons/TrailerIcons";

import Authentication from "./Authentication";

interface LinkData {
  name: string;
  url: string;
  icon: LucideIcon | Function;
}

const Navbar = () => {
  const mobileLinks: LinkData[] = [
    { name: "Aanbod", url: "/aanbod", icon: PlateauTrailer },
    { name: "Verhuren", url: "/verhuren", icon: Tag },
    { name: "Over ons", url: "/over_ons", icon: Car },
    { name: "Contact", url: "/contact", icon: Mail },
  ];
  const [open, setOpen] = useState(false);
  const [scrolled, isScrolled] = useState(true);

  const getLinkElement = (link: LinkData) => {
    return (
      <Link className="text-secondary-100 mx-2" href={link.url}>{link.name}</Link>
    );
  };

  return (
    <>
      <div
        className={`fixed top-0 w-full z-50 min-h-16 p-4 flex items-center justify-between ${scrolled ? "bg-white" : "bg-none"
          }`}
      >
        {/*logo*/}
        <Link href="/">
          {scrolled ? (
            <Image
              alt="Buurbak logo"
              src={LogoColor}
            />
          ) : (
            <Image
              alt="Buurbak logo"
              src={LogoWhite}
            />
          )}
        </Link>

        <div>
          <div className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X size={36} />
            ) : (
              <Menu color={`${scrolled ? "black" : "white"}`} size={36} />
            )}
          </div>
          <div>
            {mobileLinks.map((link) => getLinkElement(link))}
            <Authentication />
          </div>
        </div>
        {/* {open
                ? MobileLinks.map((link, index) => (
                  <li
                    className={`flex flex-row gap-4 align-center py-4 md:my-0 md:ml-8 text-lg font-semibold border-b-1 border-b-offWhite-100 md:border-0 ${link.url === currentRoute && "text-primary-100"
                      }`}
                    key={index}
                  >
                    <link.icon size={32} />
                    <a className="mt-1" href={link.url}>
                      {link.name}
                    </a>
                  </li>
                ))
                : Links.map((link, index) => ( */}

        {/* <div
                className={`flex flex-col mt-20 items-center ${open ? "" : "hidden"
                  }`}
              >
                <p className="text-xl text-primary-100 font-semibold mb-6">
                  Volg ons
                </p>
                <div className="flex flex-row gap-8 justify-center">
                  <a
                    href="https://www.linkedin.com/company/buurbak/"
                    target="_blank"
                    className="bg-offWhite-100 p-4 rounded-full"
                  >
                    <Linkedin className="h-8 w-8" />
                  </a>
                  <a
                    href="https://www.facebook.com/BuurBak"
                    target="_blank"
                    className="bg-offWhite-100 p-4 rounded-full"
                  >
                    <Facebook className="h-8 w-8" />
                  </a>
                </div>
              </div> */}
        {/*Navbar*/}
        {/* {mobileLinks.map((link) => {
              <Link>link.</Link>;

            })
            } */}
        {/* <ul
              className={`flex items-center md:pb-0 pb-12 absolute md:static md:z-50 z-[-1] top-0 h-screen md:h-fit bg-white md:bg-transparent md:w-auto md:pl-0 px-9 md:pr-0 pt-20 md:pt-0 transition-all duration-50 ease-in ${open ? "right-0 w-11/12" : "right-[-500px]"
                }`}
            > */}
        {/* <li
                className={`py-4 md:my-0 mx-4 ${scrolled ? "text-secondary-100" : "text-white"
                  } ${link.name.includes("Ik wil verhuren") &&
                  "md:bg-primary-100 md:px-4 md:py-2 md:rounded text-white"
                  }`}
                key={index}
              >
                <a
                  className="cursor-pointer"
                  // onClick={
                  //   link.name === "Inloggen" ? onOpen : undefined
                  // }
                  href={link.url}
                >
                  {link.name}
                </a>
              </li>
              <li> */}
        {/* TODO: Doesn't have a mobile menu equivalent anymore right now. This will be fixed in a future MR. */}
        {/* </li>
            </ul> */}
      </div>
    </>
  );
};

export default Navbar;;