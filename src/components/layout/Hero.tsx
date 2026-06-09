import Image from "next/image";
import { HiMiniArrowTurnRightDown } from "react-icons/hi2";

type HeroProps = {
    children?: React.ReactNode;
    showArrow?: boolean;
    className?: string;
    imageSrc?: string;
    imageAlt?: string;
};

const Hero = ({
    children,
    showArrow = true,
    className = '',
    imageSrc = '/images/hero.webp',
    imageAlt = 'Internal Photo of The Adamas Kallos Beauty Salon',
}: HeroProps) => {
    return (
        <section className={`relative w-full flex items-end bg-cover bg-center ${className}`}>
            <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                className="object-cover object-center"
            />
            <div className="relative z-10 container mx-auto px-7">
                <div className="text-white pt-20 pb-6">
                    {children}
                </div>
                {showArrow && (
                    <button type="button" title="Scroll down" className="absolute bottom-4 right-2.5">
                        <HiMiniArrowTurnRightDown className="text-white text-8xl w-16 md:w-24" />
                    </button>
                )}
            </div>
        </section>
    );
};

export default Hero;
