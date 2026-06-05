import client from "./contentfulClient";

export interface DropdownItem {
    sys: { id: string };
    fields: {
        title: string;
        slug: string;
        imageUrl?: {
            fields: {
                file: {
                    url: string;
                };
            };
        } | null;
    };
}

export interface NavItem {
    sys: { id: string };
    fields: {
        title: string;
        slug?: string;
        dropdownItems?: DropdownItem[];
    };
}

export interface Navigation {
    navItems: NavItem[];
}

export const fetchNavigation = async (): Promise<Navigation | null> => {
    try {
        const response = await client.getEntries({
            content_type: "navigation1",
            include: 2,
        });

        if (response.items.length > 0) {
            return response.items[0].fields as unknown as Navigation;
        }

        return null;
    } catch (error) {
        console.error("Error fetching navigation:", error);
        return null;
    }
};
