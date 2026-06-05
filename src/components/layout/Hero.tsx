import { HiMiniArrowTurnRightDown } from "react-icons/hi2";

type HeroProps = {
	children?: React.ReactNode;
	showArrow?: boolean;
	className?: string;
};

const Hero = ({
	children,
	showArrow = true,
	className = '',
}: HeroProps) => {
	return (
		<section className={`relative w-full flex items-end bg-cover bg-center ${className}`}>
			<div className="container mx-auto px-7">
				<div className="text-white pt-20 pb-6">
					{children}
				</div>
				{showArrow && (
					<button className="absolute bottom-4 right-2.5">
						<HiMiniArrowTurnRightDown className="text-white text-8xl w-16 md:w-24" />
					</button>
				)}
			</div>
		</section>
	);
};

export default Hero;
