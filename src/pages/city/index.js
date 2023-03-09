// Hooks
import { useAuth } from '../../hooks/useAuth';

export default function Cities() {
    // Hooks
    const { user } = useAuth();
  
    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8">
            <h1>Cities</h1>
        </section>
    )
}