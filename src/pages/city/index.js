// Hooks
import { useAuth } from '../../hooks/useAuth';
import Head from 'next/head'

export default function Cities() {
    // Hooks
    const { user } = useAuth();
  
    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8">
            <Head>
                <title>Explore Cities Around the World | Wanderlust App Cities</title>
                <meta
                    name="description"
                    content="Wanderlust App Cities lets you explore cities around the world, from popular tourist destinations to hidden gems. Our curated list of cities offers in-depth information on local culture, attractions, and experiences. Browse our city guides to discover new destinations and plan your next adventure. Wanderlust App Cities is your go-to resource for travel inspiration and planning."
                />
            </Head>
            <h1>Cities</h1>
        </section>
    )
}