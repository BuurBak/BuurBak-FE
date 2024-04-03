"use client";

import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoBig from "../Assets/buurbakLogoBigColor.svg";
import LogoMedium from "../Assets/buurbakLogoMediumColor.svg";

type Link = { title: string; link: string };

const Footer = () => {
  const currentRoute = usePathname();

  const pages: Link[] = [
    { title: "Home", link: "/" },
    { title: "Aanbod", link: "/aanbod" },
    { title: "Verhuren", link: "/verhuren" },
    { title: "Contact", link: "/contact" },
    { title: "FAQ", link: "/faq" },
    { title: "Inloggen", link: "/inloggen" },
  ];
  const subPages: Link[] = [
    { title: "Privacy policy", link: "/" },
    { title: "Algemene voorwaarden", link: "/" },
    { title: "©2024", link: "/" },
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:justify-evenly gap-8 px-3 w-dvw pb-8">
      <Image
        alt="Buurbak logo"
        src={LogoBig}
        className="w-fit h-fit hidden lg:block"
      />
      <div className="lg:max-w-[50vw] lg:w-full">
        <div className="w-full">
          <ul className="flex flex-col lg:flex-row lg:justify-evenly gap-3 text-center">
            {pages?.map((page: any, index: number) => (
              <li key={index}>
                <Link
                  className={`${page.link === currentRoute ? "text-primary-100" : "text-black"} text-xl`}
                  href={page.link}
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-gray-100 my-1 lg:m-5 w-full h-0"></div>
        <div className="lg:flex lg:flex-row-reverse lg:items-center lg:justify-between lg:gap-10">
          <div>
            <ul className="flex flex-col lg:flex-row gap-3 text-center">
              {subPages?.map((page: any, index: number) => (
                <li key={index}>
                  <Link className="text-xl text-gray-100" href={page.link}>
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:hidden border-t border-gray-100 my-1 w-full h-0"></div>
          <div className="flex flex-col items-center gap-6 flex-1">
            <p className="text-xl text-center">Volg ons</p>
            <div className="flex flex-row gap-8">
              <div className="bg-offWhite-100 p-4 rounded-full">
                <ArchiveBoxXMarkIcon className="h-8 w-8 text-secondary-100 " />
              </div>
              <div className="bg-offWhite-100 p-4 rounded-full">
                <ArchiveBoxXMarkIcon className="h-8 w-8 text-secondary-100 " />
              </div>
              <div className="bg-offWhite-100 p-4 rounded-full">
                <ArchiveBoxXMarkIcon className="h-8 w-8 text-secondary-100 " />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image
        alt="Buurbak logo"
        src={LogoMedium}
        className="self-center lg:hidden"
      />
    </div>
  );
};

export default Footer;
