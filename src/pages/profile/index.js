import Profile from '../../shared_pages/profile';

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
        <Profile publicUser={false} recommendedLocations={recommendedLocations} />
    )
}