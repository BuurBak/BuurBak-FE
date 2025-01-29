"use client";

import { Facebook, Linkedin } from "lucide-react";
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
  ];
  const subPages: Link[] = [
    {
      title: "Privacy policy",
      link: "https://drive.google.com/file/d/12uOHI1prSnsfgaYo3nR8YhIy0UNVzukr/view",
    },
    {
      title: "Algemene voorwaarden",
      link: "https://drive.google.com/file/d/1D9S05Qn7hC3bsEi_ElAqz8uX1s6Se5UZ/view",
    },
    { title: "©2024", link: "/" },
  ];

  return (
    <div className="flex flex-col lg:flex-row justify-around px-20 w-full pb-8 mt-16">
      <Link href={"/"}>
        <Image
          alt="Buurbak logo"
          src={LogoBig}
          className="w-fit h-fit hidden lg:block"
        />
      </Link>
      <div className="lg:max-w-[50vw] lg:w-full flex flex-col items-centers">
        <div className="w-full">
          <ul className="flex flex-col lg:flex-row lg:justify-evenly gap-3 text-center">
            {pages?.map((page: any, index: number) => (
              <li key={index}>
                <Link
                  className={`${
                    page.link === currentRoute
                      ? "text-primary-100"
                      : "text-black"
                  } text-xl`}
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
                  <Link
                    className="text-xl text-gray-100"
                    href={page.link}
                    target="_blank"
                  >
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
              <a
                href="https://www.linkedin.com/company/buurbak/"
                target="_blank"
                className="bg-offWhite-100 p-4 rounded-full"
              >
                <Linkedin className="h-8 w-8 text-secondary-100 " />
              </a>
              <a
                href="https://www.facebook.com/BuurBak"
                target="_blank"
                className="bg-offWhite-100 p-4 rounded-full"
              >
                <Facebook className="h-8 w-8 text-secondary-100 " />
              </a>
            </div>
          </div>
        </div>
      </div>
      <Link href={"/"}>
        <Image
          alt="Buurbak logo"
          src={LogoMedium}
          className="self-center lg:hidden pt-5"
        />
      </Link>
    </div>
  );
};

export default Footer;
