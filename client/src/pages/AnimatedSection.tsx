import { FC, ReactNode, useEffect, useRef } from "react"
import { ScrollTrigger } from "gsap/src/all";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
    children: ReactNode;
    animationDelay?: number;
}

const AnimatedSection: FC<AnimatedSectionProps> = ({ children, animationDelay = 0 }) => {
    const sectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const element = sectionRef.current;
        if (!element) return;

        const animation = gsap.fromTo(
            element,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: animationDelay,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
            }
        )

        return () => {
            animation.kill();
            ScrollTrigger.getById(element.id)?.kill();
        };
    }, [animationDelay]);

    return <div ref={sectionRef}>{children}</div>;
}

export default AnimatedSection;