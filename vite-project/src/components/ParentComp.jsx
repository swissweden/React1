import ChildComp from "./ChildComp";
import viteLogo from "../assets/vite.svg";
import reactLogo from "../assets/oia-uia.png";

export default function ParentComp() {
    return (
        <>
            <ChildComp 
                
                imageInfo={
                {
                    src: viteLogo,
                    alt: "vite",
                }
            }
                
                width={200}
                height={300}
            />
            <ChildComp 
                
                imageInfo={
                {
                    src: reactLogo,
                    alt: "React",
                }
            }
                
                width={400}
                height={300}
            />
        </>
    );
}