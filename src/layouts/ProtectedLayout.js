import { useOutlet } from "react-router-dom";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";

export const ProtectedLayout = () => {
    const { user } = useAuth();
    const outlet = useOutlet();

    if (!user) {
        return <Link to="/" />;
    }

    return (
        <div className="ml-16 min-h-screen">
          {outlet}
        </div>
    );
};
