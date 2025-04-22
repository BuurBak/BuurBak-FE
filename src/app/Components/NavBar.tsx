"use client";

import {
  Facebook,
  Home,
  Linkedin,
  Mail,
  Menu,
  Tag,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LogoWhite from "../Assets/Frame.svg";
import LogoColor from "../Assets/horizontalColorLogo.svg";
import { PlateauTrailer } from "../icons/TrailerIcons";

import { hasToken } from "../../lib/cookieUtil";
import { UserDetails } from "../Types/User";
import Authentication from "./Authentication";
import { getSignedInUserOrUndefined } from "@/lib/authUtil";

const Links = [
  { name: "Aanbod", url: "/aanbod" },
  { name: "Ik wil verhuren", url: "/verhuren" },
  { name: "Contact", url: "/contact" },
];

const MobileLinks = [
  { name: "Home", url: "/", icon: Home },
  { name: "Aanbod", url: "/aanbod", icon: PlateauTrailer },
  { name: "Verhuren", url: "/verhuren", icon: Tag },
  { name: "Contact", url: "/contact", icon: Mail },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false); // Corrected typo
  const [scrolled, isScrolled] = useState(true);
  const [user, setUser] = useState<UserDetails>();


  useEffect(() => {
    const checkToken = async () => {
      if (await hasToken("sb-tnffbjgnzpqsjlaumogv-auth-token")) {
        setSignedIn(true); // Corrected typo
        const getApi = async () => {
          const userData = await getSignedInUserOrUndefined();
          setUser(userData);
        };
        getApi();
      } else {
        setSignedIn(false); // Corrected typo
      }
    };

    checkToken();
  }, [open]);

  return (
    <main>
      <div
        className={`fixed top-0 w-full z-50 ${scrolled ? "bg-white" : "bg-none"
          }`}
      >
        <div className="md:flex justify-between items-center md:px-10 py-4 px-7">
          {/*logo*/}
          <Link href="/">
            {scrolled ? (
              <Image
                alt="Buurbak logo"
                src={LogoColor}
                className={(open ? "hidden " : "") + "w-fit h-fit"}
              />
            ) : (
              <Image
                alt="Buurbak logo"
                src={LogoWhite}
                className={(open ? "hidden " : "") + "w-fit h-fit"}
              />
            )}
          </Link>

          <div
            onClick={() => setOpen(!open)}
            className={
              "w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden"
            }
          >
            {open ? (
              <X size={36} />
            ) : (
              <Menu color={`${scrolled ? "black" : "white"}`} size={36} />
            )}
          </div>

          {/*Navbar*/}
          <div>
            <ul
              className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-50 z-[-1] top-0 h-screen md:h-fit bg-white md:bg-transparent md:w-auto md:pl-0 px-9 md:pr-0 pt-20 md:pt-0 transition-all duration-50 ease-in ${open ? "right-0 w-11/12" : "right-[-500px]"
                }`}
            >
              {/* {signedIn ? ( // Corrected typo
                <div className="w-full flex flex-col items-center md:hidden">
                  <Link href="/dashboard">
                    {user && user.profile_picture ? (
                      <div className="w-32 h-32 relative">
                        <Image
                          src={user.profile_picture}
                          alt="User profile picture"
                          fill
                          sizes="100% 100%"
                          priority={true}
                          className="rounded-full object-cover"
                        />
                      </div>
                    ) : (
                      <CircleUserRound className="w-auto h-[10dvh]" />
                    )}
                  </Link>
                  <p className="w-fit text-2xl font-semibold mt-4 mb-12">
                    {user?.name}
                  </p>
                </div>
              ) : (
                <div className={`${open ? "" : "hidden"}`}>
                  <li className="py-4 mb-10 text-lg font-semibold border-b-1 border-b-offWhite-100 md:border-0">
                    <a>Supposed to Login</a>
                  </li>
                </div>
              )}

              {open
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
                : Links.map((link, index) => (
                  <li
                    className={`py-4 md:my-0 md:ml-8 ${scrolled ? "text-secondary-100" : "text-white"
                      } ${link.name.includes("Ik wil verhuren") &&
                      "md:bg-primary-100 md:px-4 md:py-2 md:rounded text-white"
                      }`}
                    key={index}
                  >
                    {link.name === "Inloggen" && signedIn ? ( // Corrected typo
                      user && user.profile_picture ? (
                        <Link href="/dashboard">
                          <div className="w-14 h-14 relative">
                            <Image
                              src={user.profile_picture && user.profile_picture.trim().length ? user.profile_picture : "/default-profile.png"}
                              alt="User profile picture"
                              fill
                              sizes="100% 100%"
                              priority={true}
                              className="rounded-full object-cover"
                            />
                          </div>
                        </Link>
                      ) : (
                        <Link href="/dashboard">
                          <CircleUserRound className="w-auto h-12" />
                        </Link>
                      )
                    ) : (
                      <a
                        className="cursor-pointer"
                        // onClick={
                        //   link.name === "Inloggen" ? onOpen : undefined
                        // }
                        href={link.url}
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))} */}
              <li>
                <Authentication />
              </li>
              <div
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
              </div>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Navbar;