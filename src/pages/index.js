import Image from 'next/image';

// Hooks
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';

// Main components
import CustomHead from '../shared_components/CustomHead';
import GuestHomePage from "../components/HomePage/GuestHomePage";
import UserHomePage from "../components/HomePage/UserHomePage";
import Footer from "../components/Footer";

// Styling
import 'mapbox-gl/dist/mapbox-gl.css';

// Utils
import request from "../utils/request";

export async function getStaticProps() {
  // fetch no longer needs to be imported from isomorphic-unfetch
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
  const posts = await res.json();

  return {
    props: {
      posts: posts.data,
    },
  };
}

export default function Home({ posts }) {
  // Hooks
  const { user, userLoading } = useAuth();
  const router = useRouter();

  return (
    <section className="relative min-h-screen overflow-scroll max-w-full">
      <CustomHead
        title="A Digital Nomad's Ultimate Travel Companion - Wanderlust App"
        description="Wanderlust App is your ultimate travel companion helping you find beautiful places to travel to, plan and organize every aspect of your trip."
        image="https://uploads-ssl.webflow.com/62893f6b6c73c80d757c8d0d/629378f07e3c95055ebae0ca_Screen%20Shot%202022-05-29%20at%204.38.07%20PM%20(1).jpg"
        alt="Wanderlust App"
        url="https://www.wanderlustapp.io"
      />

      {/* NEW USER HOMGEPAGE  */}
      <section className="w-full absolute overflow-hidden pr-0 top-0 left-0 right-0 ml-0 flex flex-col justify-center items-center min-h-screen bg-gray-200/80 dark:bg-gray-900/80" style={{ zIndex: 49 }}>
        {
          !user ? <GuestHomePage router={router} request={request} posts={posts} /> : <UserHomePage router={router} user={user} userLoading={userLoading} request={request} posts={posts} />
        }
        {/* <GuestHomePage router={router} request={request} posts={posts} /> */}
        <div className="pl-0 sm:pl-16 w-full">
          <Footer />
        </div>
      </section>

      <div className="w-full h-full fixed">
        <Image
            className="wanderlustImage"
            src="https://wanderlust-extension.s3.us-west-2.amazonaws.com/hallstatt_austria.jpg"
            alt={`Hallstatt, Austria`}
            priority
            fill
        />
      </div>
    </section>
  )
}
