"use client";

import {
  Car,
  Mail,
  Tag,
  X,
  Menu
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LogoWhite from "../Assets/Frame.svg";
import LogoColor from "../Assets/horizontalColorLogo.svg";
import { PlateauTrailer } from "../icons/TrailerIcons";

import Authentication from "./Authentication";
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
import { MotionProps } from "framer-motion";


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links: LinkData[] = [
    { name: "Aanbod", href: "/aanbod", icon: PlateauTrailer },
    { name: "Ik wil verhuren", href: "/verhuren", icon: Tag, displayAsButton: true },
    { name: "Over ons", href: "/over_ons", icon: Car },
    { name: "Contact", href: "/contact", icon: Mail }
  ];

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

  const getMenuIcon = () => {
    return (
      isMenuOpen ?
        <X className="h-full" size={36} /> :
        <Menu size={36} />
    );
  };

  const menuMotionProps = {
    initial: {
      y: '-100vh',
      type: 'spring',
      top: '4rem',
    },
    animate: {
      y: '0vh',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    }
  } satisfies MotionProps;

  return (
    <NavbarElement className="bg-white h-16" onMenuOpenChange={setIsMenuOpen} >
      <NavbarMenu motionProps={menuMotionProps} className="bg-white items-center absolute inset-x-auto right-0 w-64">
        {links.map((linkData, index) => (
          <NavbarMenuItem key={`${linkData}-${index}`}>
            {getNavbarLink(linkData)}
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Authentication />
        </NavbarMenuItem>
      </NavbarMenu>
      <NavbarBrand>
        <Link href={"/"}>
          <Image
            alt="Buurbak logo"
            src={isScrolled ? LogoWhite : LogoColor}
          />
        </Link>
      </NavbarBrand>
      <NavbarContent className="md:hidden" justify="end">
        <NavbarMenuToggle
          className="w-12"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          icon={getMenuIcon()}
        />
      </NavbarContent>

      <NavbarContent className="hidden md:flex" justify="end">
        {links.map((linkData, index) => (
          <NavbarItem key={`${linkData}-${index}`}>
            {getNavbarLink(linkData)}
          </NavbarItem>
        ))}
        <NavbarItem>
          <Authentication />
        </NavbarItem>
      </NavbarContent>
    </NavbarElement >
  );
};

export default Navbar;;