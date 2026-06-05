import { createClient } from "contentful";

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_API_TOKEN;

if (!space || !accessToken) {
    console.warn("Contentful client is not configured. Missing environment variables.");
}

const client = createClient({
    space: space!,
    accessToken: accessToken!,
    host: "cdn.contentful.com",
});

export default client;
