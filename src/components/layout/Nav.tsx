"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchNavigation, NavItem } from "@/lib/contentfulNav";

export default function Nav() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
    const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
    const [navItems, setNavItems] = useState<NavItem[] | null>(null);
    const [hoveredImage, setHoveredImage] = useState<string | null>(null);

    const toggleMobileMenu = () => {
        setMobileOpen(!mobileOpen);
    };

    const toggleMobileDropdown = (id: string) => {
        setMobileDropdown(mobileDropdown === id ? null : id);
    };

    useEffect(() => {
        fetchNavigation().then((data) => {
            if (data) {
                setNavItems(data.navItems);
                const firstItem = data.navItems[0];
                const firstDropdownImage = firstItem?.fields.dropdownItems?.[0]?.fields?.imageUrl?.fields?.file?.url;
                if (firstDropdownImage) {
                    setHoveredImage(`https:${firstDropdownImage}`);
                }
            }
        });
    }, []);

    if (!navItems) {
        return <div className="h-20" />;
    }

    return (
        <nav 
            className={`
                playfair-600 
                text-lg 
                w-full 
                fixed 
                top-0 
                left-0 
                right-0 
                h-20 
                z-20             
                border-b
                border-tiffanyBlue
                bg-babyblue                
            `}
        >
            <div className="flex items-center justify-between container mx-auto px-7 h-full">
                <h1 className="playfair-italic-700 text-2xl text-primaryContent">
                    <Link href="/">Logo goes here</Link>
                </h1>

                {/* Desktop Menu */}
                <ul className="uppercase hidden lg:flex gap-6 items-center">
                    {navItems.map((item) => (
                        <li
                            key={item.sys.id}
                            className="relative text-primaryContent text-xl"
                            onMouseEnter={() => {
                                setHoveredDropdown(item.sys.id);
                                const firstDropdownImage = item.fields.dropdownItems?.[0]?.fields?.imageUrl?.fields?.file?.url;
                                setHoveredImage(firstDropdownImage ? `https:${firstDropdownImage}` : null);
                            }}
                            onMouseLeave={() => setHoveredDropdown(null)}
                        >
                            {item.fields.dropdownItems ? (
                                <span className="relative flex items-center h-20 cursor-pointer transition-transform duration-200 hover:scale-105">
                                    {item.fields.title}
                                </span>
                            ) : (
                                <Link
                                    href={item.fields.slug || "/"}
                                    className="flex items-center h-20 transition-transform duration-200 hover:scale-105"
                                >
                                    {item.fields.title}
                                </Link>
                            )}
                            {item.fields.dropdownItems && (
                                <div className={`
                                    submenu-container
                                    fixed
                                    left-0
                                    right-0
                                    bg-babyblue
                                    text-primaryContent
                                    shadow-lg
                                    transition-all
                                    duration-500
                                    ease-in-out
                                    overflow-hidden 
                                    ${hoveredDropdown === item.sys.id ? "max-h-500" : "max-h-0"}
                                `}>
                                    <div className="container mx-auto px-7 py-10 grid grid-cols-3 gap-x-2.5">
                                        <div className="submenu w-full">
                                            <ul>
                                                {item.fields.dropdownItems.map((dropdownItem) => (
                                                    <li
                                                    key={dropdownItem.sys.id}
                                                    className="mb-2.5"
                                                    onMouseEnter={() => {
                                                            const imgUrl = dropdownItem.fields?.imageUrl?.fields?.file?.url;
                                                            if (imgUrl) setHoveredImage(`https:${imgUrl}`);
                                                        }}
                                                    >
                                                        <Link href={dropdownItem.fields.slug || "/"} className="cursor-pointer inline-block transition-transform duration-200 hover:translate-x-1">
                                                            {dropdownItem.fields.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>                                    
                                        {hoveredImage && (
                                            <div className="col-span-1 col-start-3 w-full">
                                                <Image
                                                    src={hoveredImage}
                                                    alt="Image related alt goes here"
                                                    width={400}
                                                    height={260}
                                                    className="w-full h-64 object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <button type="button" title="Mobile Menu Button" onClick={toggleMobileMenu} className="lg:hidden flex flex-col justify-between w-8 h-6 relative z-30 cursor-pointer">
                    <div className={`h-1 w-full transition-transform duration-500 ${mobileOpen ? "bg-primaryContent rotate-45 translate-y-2.5" : "bg-primaryContent"}`}></div>
                    <div className={`h-1 w-full transition-opacity duration-500 ${mobileOpen ? "bg-primaryContent opacity-0" : "bg-primaryContent"}`}></div>
                    <div className={`h-1 w-full transition-transform duration-500 ${mobileOpen ? "bg-primaryContent -rotate-45 -translate-y-2.5" : "bg-primaryContent"}`}></div>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`
                z-20
                fixed
                inset-0
                bg-babyblue
                transition-transform
                duration-700
                flex
                flex-col
                lg:hidden
                ${mobileOpen ? "translate-x-0" : "translate-x-full"}
            `}>
                <ul className="p-5 text-2xl playfair-600 uppercase text-primaryContent">
                    {navItems.map((item) => (
                        <li key={item.sys.id}>
                            <div onClick={() => toggleMobileDropdown(item.sys.id)}>
                                {item.fields.dropdownItems ? (
                                    <span className="cursor-pointer inline-block mt-2.5 mb-2.5 transition-transform duration-200 hover:translate-x-1">
                                        {item.fields.title}
                                    </span>
                                ) : (
                                    <Link
                                        href={item.fields.slug || "/"}
                                        onClick={toggleMobileMenu}
                                        className="inline-block mt-2.5 mb-2.5 transition-transform duration-200 hover:translate-x-1"
                                    >
                                        {item.fields.title}
                                    </Link>
                                )}
                            </div>
                            {item.fields.dropdownItems && (
                                <ul className={`
                                    playfair-700 text-lg mb-2.5 capitalize transition-all duration-500 ease-in-out overflow-hidden
                                    ${mobileDropdown === item.sys.id ? "max-h-500" : "max-h-0"}
                                `}>
                                    {item.fields.dropdownItems.map((submenuItem) => (
                                        <li key={submenuItem.sys.id} className="ml-5">
                                            <Link href={submenuItem.fields.slug || "/"} onClick={toggleMobileMenu} className="inline-block hover:underline">
                                                {submenuItem.fields.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <div className={`border border-primaryContent transition-all duration-2000ms ${mobileOpen ? "w-full" : "w-0"}`}></div>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
