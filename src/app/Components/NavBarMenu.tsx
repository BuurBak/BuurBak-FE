import { LinkData } from "@/lib/interfaces/LinkData";
import { Button } from "@heroui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
} from "@heroui/navbar";

export const NavBarMenu = ({ links }: { links: LinkData[]; }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const getNavbarLink = (linkData: LinkData) => {
        return (
            <>
                {linkData.displayAsButton ?
                    //TODO: Created this manual button creation since our version of NextUI (renamed to HeroUI some time ago) is very outdated.
                    <Button className="bg-primary-100 hover:bg-primary-200 text-white h-12 px-4 mx-2 font-bold" onPress={() => router.push(linkData.href)}>{linkData.name}</Button> :
                    <Link className="text-secondary-100 mx-2" href={linkData.href}>{linkData.name}</Link>
                }
            </>
        );
    };
    // return (
    //     <div className="md:hidden"
    //         onClick={() => setOpen(!open)}
    //     >
    //         {!open ?
    //             <Menu size={36} /> :
    //             (
    //                 <div className="fixed h-100 bg-white">
    //                     <div className="flex items-center pb-12 absolute z-[-1] h-screen bg-white px-9 md:pr-0 pt-20 transition-all duration-50 ease-in">
    //                         <X size={36} />
    //                         <div>
    //                             {links.map((link) => getNavbarLink(link))}
    //                         </div>
    //                     </div>
    //                 </div>
    //             )
    //         }
    //     </div>
    // );

};