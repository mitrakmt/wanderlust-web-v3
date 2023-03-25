import Profile from '../../shared_pages/profile';
import Head from 'next/head';
import CustomHead from '@/shared_components/CustomHead';

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
            <CustomHead
                title="Your Personal Wanderlust App Profile | Edit Your Information"
                description="Your Wanderlust App Profile is your personal space to save and access your travel information. Edit your profile to include your travel preferences and destinations, and view your saved trips and favorite places. Customize your experience and make the most of your travels with Wanderlust App Profile."
                url="https://www.wanderlustapp.io/profile"
                image="https://uploads-ssl.webflow.com/62893f6b6c73c80d757c8d0d/629378f07e3c95055ebae0ca_Screen%20Shot%202022-05-29%20at%204.38.07%20PM%20(1).jpg"
                alt="Wanderlust App"
            />

            <Profile publicUser={false} recommendedLocations={recommendedLocations} />
        </>
    )
}