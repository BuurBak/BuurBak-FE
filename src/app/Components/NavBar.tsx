"use client";

import {
  Car,
  Mail,
  Tag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LogoWhite from "../Assets/Frame.svg";
import LogoColor from "../Assets/horizontalColorLogo.svg";
import { PlateauTrailer } from "../icons/TrailerIcons";

import Authentication from "./Authentication";
import { useRouter } from "next/navigation";
import { LinkData } from "@/lib/interfaces/LinkData";
import {
  Navbar as NavbarElement,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@heroui/navbar";
import { HeroUIBasedButton } from "./HeroUIBasedButton";



const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links: LinkData[] = [
    { name: "Aanbod", href: "/aanbod", icon: PlateauTrailer },
    { name: "Ik wil verhuren", href: "/verhuren", icon: Tag, displayAsButton: true },
    { name: "Over ons", href: "/over_ons", icon: Car },
    { name: "Contact", href: "/contact", icon: Mail }
  ];
  const router = useRouter();

  const getNavbarLink = (linkData: LinkData) => {
    return (
      <>
        {linkData.displayAsButton ?
          <HeroUIBasedButton as={Link} buttonVariant="primary" size="lg" className="font-semibold p-4 h-10" href={linkData.href}>{linkData.name}</HeroUIBasedButton> :
          <Link className="text-secondary-100" href={linkData.href}>{linkData.name}</Link>
        }
      </>
    );
  };

  return (
    <NavbarElement className="bg-white h-16" onMenuOpenChange={setIsMenuOpen} >
      <NavbarBrand>
        <Link href={"/"}>
          <Image
            alt="Buurbak logo"
            src={isScrolled ? LogoWhite : LogoColor}
          />
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
      </NavbarContent>

      <NavbarContent className="hidden" justify="end">
        {links.map((linkData, index) => (
          <NavbarItem key={`${linkData}-${index}`}>
            {getNavbarLink(linkData)}
          </NavbarItem>
        ))}
        <NavbarItem>
          <Authentication />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="bg-white items-center">
        {links.map((linkData, index) => (
          <NavbarMenuItem key={`${linkData}-${index}`}>
            {getNavbarLink(linkData)}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NavbarElement >
  );
};

export default Navbar;;