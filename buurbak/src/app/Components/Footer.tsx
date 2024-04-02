"use client";

import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../Assets/buurbakLogoBigColor.svg";
import LogoM from "../Assets/buurbakLogoMediumColor.svg";

const Footer = () => {
  const currentRoute = usePathname();

  const pages = [
    { title: "Home", link: "/" },
    { title: "Aanbod", link: "/aanbod" },
    { title: "Verhuren", link: "/verhuren" },
    { title: "Contact", link: "/contact" },
    { title: "Veel gestelde vragen", link: "/faq" },
    { title: "Inloggen", link: "/inloggen" },
  ];
  const subPages = [
    { title: "Privacy policy", link: "/" },
    { title: "Algemene voorwaarden", link: "/" },
    { title: "©2024", link: "/" },
  ];

  return (
    <div>
      <div
        id="desktop"
        className="hidden w-dvw h-fit lg:flex flex-row justify-between border-t border-gray-100 py-12 px-24"
      >
        <Image alt="Buurbak logo" src={Logo} className="w-fit h-52" />
        <div className="flex flex-col gap-10">
          <div className="flex justify-center">
            <ul className="flex flex-row gap-11">
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
          <div className="border-t border-gray-100 py-1 w-full h-0"></div>
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-6 flex-1">
              <p className="text-xl text-center">Volg ons op social media</p>
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
            <div className="flex justify-end w-full">
              <ul className="flex justify-between gap-5 ">
                {subPages?.map((page: any, index: number) => (
                  <li key={index}>
                    <Link className="text-xl text-gray-100" href={page.link}>
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        id="mobile"
        className="lg:hidden flex flex-col gap-8 px-3 w-dvw pb-8"
      >
        <div className="w-full">
          <ul className="flex flex-col gap-3 text-center">
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
        <div className="border-t border-gray-100 py-1 w-full h-0"></div>
        <div>
          <ul className="flex flex-col gap-3 text-center">
            {subPages?.map((page: any, index: number) => (
              <li key={index}>
                <Link className="text-xl text-gray-100" href={page.link}>
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-gray-100 py-1 w-full h-0"></div>
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
        <Image alt="Buurbak logo" src={LogoM} className="self-center" />
      </div>
    </div>
  );
};

export default Footer;
