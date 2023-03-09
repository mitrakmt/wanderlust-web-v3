// Components
import TextH4 from "../Text/TextH4";
import TextP from "../Text/TextP";
import Button from '../Button/Button';

// Hooks
import { useRouter } from "next/router";

function ProBanner({ styles }) {
    // Hooks
    const router = useRouter();
    
    return (
        <div style={styles} className="flex flex-col sm:flex-row items-start sm:items-center justify-center w-full p-8 m-0 sm:m-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-700 dark:border-gray-700">
            <div>
                <TextH4 styles={{ margin: 0, marginBottom: '8px' }}>Switch to Premium plan today and save 35% off</TextH4>
                <TextP>Our premium members get access to nearly a dozen (and growing) features from a virtual passport to community access. Find more details on our premium member page. Sign up today for over 35% off, limited time offer!</TextP>
            </div>
            <Button text="Learn More" onClick={() => router.push('/pro')} styles={{ width: '150px', marginLeft: '40px', marginTop: '12px' }} />
        </div>
    );
}

export default ProBanner;