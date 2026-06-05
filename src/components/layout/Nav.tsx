"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchNavigation, NavItem } from "@/lib/contentfulNav";

export default function Nav() {
    const [navItems, setNavItems] = useState<NavItem[]>([]);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        fetchNavigation().then((data) => {
            if (data) setNavItems(data.navItems);
        });
    }, []);

    return (
        <nav className="w-full bg-white shadow-sm px-8 py-4">
            <ul className="flex gap-8 list-none">
                {navItems.map((item) => (
                    <li
                        key={item.sys.id}
                        className="relative"
                        onMouseEnter={() => setActiveDropdown(item.sys.id)}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <Link
                            href={item.fields.slug || "/"}
                            className="text-sm font-medium text-gray-800 hover:text-gray-500"
                        >
                            {item.fields.title}
                        </Link>

                        {/* Dropdown */}
                        {item.fields.dropdownItems && activeDropdown === item.sys.id && (
                            <ul className="absolute top-full left-0 bg-white shadow-lg p-4 min-w-48 flex flex-col gap-2">
                                {item.fields.dropdownItems.map((dropdownItem) => (
                                    <li key={dropdownItem.sys.id} className="flex items-center gap-3">
                                        {dropdownItem.fields.imageUrl && (
                                            <img
                                                src={`https:${dropdownItem.fields.imageUrl?.fields?.file?.url}`}
                                                alt={dropdownItem.fields.title}
                                                className="w-8 h-8 object-cover rounded"
                                            />
                                        )}
                                        <Link
                                            href={dropdownItem.fields.slug || "/"}
                                            className="text-sm text-gray-600 hover:text-gray-900"
                                        >
                                            {dropdownItem.fields.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
