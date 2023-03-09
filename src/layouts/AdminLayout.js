import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AdminLayout = () => {
    const { user } = useAuth();
    const outlet = useOutlet();

    if (!user || !user.role === 'admin') {
        return <Navigate to="/" />;
    }

    return (
        <div className="ml-16 min-h-screen">
          {outlet}
        </div>
    );
};
