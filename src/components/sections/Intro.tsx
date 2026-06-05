import client from "@/lib/contentfulClient";

interface IntroFields {
    heading: string;
    strapline: string;
    paragraph: string;
    outro: string;
}

const Intro = async () => {
    const response = await client.getEntries({ content_type: "intro" });
    const items = response.items as any[];
    console.log("Intro content:", items);

    if (!items.length) return null; 

    return ( 
        <section className="intro bg-babyblue"> 
            <div className="container mx-auto px-7 py-12">
                {items.map((item) => {
                    const fields = item.fields as IntroFields;
                    return (
                        <div key={item.sys.id} className="grid md:grid-cols-2 gap-5">
                            <div className="col">
                                <h3 className="uppercase text-primaryContent playfair text-2xl md:text-xl pb-4">
                                    {fields.heading}
                                </h3>
                                <h3 className="playfair-italic-700 text-tiffanyblue text-3xl leading-10 md:text-5xl md:leading-12">
                                    {fields.strapline}
                                </h3>
                            </div>
                            <div className="col">
                                <p className="playfair text-primaryContent text-xl md:text-2xl mb-2 md:text-justify">
                                    {fields.paragraph}
                                </p>
                                <p className="playfair-800 text-tiffanyblue bg-primaryContent px-2 inline">
                                    {fields.outro}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Intro;
