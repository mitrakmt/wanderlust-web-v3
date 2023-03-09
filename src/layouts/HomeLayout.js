import { useOutlet } from "react-router-dom";

export const HomeLayout = () => {
    const outlet = useOutlet();

    return (
        <div className="ml-16 min-h-screen">
            {outlet}
        </div>
    );
};