// Hooks
import { useRouter } from "next/router";

function ProBanner() {
    // Hooks
    const router = useRouter();
    
    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                <figure className="max-w-screen-md mx-auto">
                    <h2 className="mb-4 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-white sm:text-4xl sm:leading-10">
                        Upgrade to Wanderlust Pro
                    </h2>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">Wanderlust Pro gives you access to all of our premium features. You'll get access to nearly a dozen (and growing) features from a virtual passport to community access. Find more details on our premium member page. Sign up today for over 35% off, limited time offer!</p>
                    <button
                        className="px-4 py-2 mt-4 text-sm font-semibold text-white uppercase transition-all duration-300 ease-in-out bg-primary-500 rounded-md hover:bg-primary-600"
                        onClick={() => router.push("/pro")}
                    >
                        Upgrade
                    </button>
                </figure>
            </div>
        </div>
    );
}

export default ProBanner;