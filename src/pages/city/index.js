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
                <meta name="description" content="Wanderlust App Cities lets you explore cities around the world, from popular tourist destinations to hidden gems. Our curated list of cities offers in-depth information on local culture, attractions, and experiences. Browse our city guides to discover new destinations and plan your next adventure. Wanderlust App Cities is your go-to resource for travel inspiration and planning." />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Explore Cities Around the World | Wanderlust App Cities" />
                <meta property="og:url" content="https://www.wanderlustapp.io/city" />
                <meta property="og:description" content="Wanderlust App Cities lets you explore cities around the world, from popular tourist destinations to hidden gems. Our curated list of cities offers in-depth information on local culture, attractions, and experiences. Browse our city guides to discover new destinations and plan your next adventure. Wanderlust App Cities is your go-to resource for travel inspiration and planning." />
                {/* <meta property="og:image" content={blog?.image_url} /> */}

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="Explore Cities Around the World | Wanderlust App Cities" />
                <meta property="twitter:url" content="https://www.wanderlustapp.io/city" />
                <meta property="twitter:description" content="Wanderlust App Cities lets you explore cities around the world, from popular tourist destinations to hidden gems. Our curated list of cities offers in-depth information on local culture, attractions, and experiences. Browse our city guides to discover new destinations and plan your next adventure. Wanderlust App Cities is your go-to resource for travel inspiration and planning." />
                {/* <meta property="twitter:image" content={blog?.image_url} /> */}
            </Head>
            <h1>Cities</h1>
        </section>
    )
}