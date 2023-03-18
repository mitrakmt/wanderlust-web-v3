import Profile from '../../shared_pages/profile';
import Head from 'next/head';

export async function getStaticProps() {
    const response = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/locations/recommendations`)
    const recommendedLocations = await response.json()

    return {
        props: {
            recommendedLocations: recommendedLocations.data
        },
        revalidate: 300
    };
}

export default function ProfilePage({ recommendedLocations }) {
    return (
        <>
            <Head>
                <title>Your Personal Wanderlust App Profile | Edit Your Information</title>
                <meta
                    name="description"
                    content="Your Wanderlust App Profile is your personal space to save and access your travel information. Edit your profile to include your travel preferences and destinations, and view your saved trips and favorite places. Customize your experience and make the most of your travels with Wanderlust App Profile."
                />
            </Head>
            <Profile publicUser={false} recommendedLocations={recommendedLocations} />
        </>
    )
}