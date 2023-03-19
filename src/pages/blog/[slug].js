import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head'
import { useRouter } from 'next/router';

// Utils
import request from '../../utils/request';
import trackClick from "../../utils/trackClick";

// Hooks
import { useAuth } from '../../hooks/useAuth';

// Components
import Footer from '../../components/Footer';
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';

export async function getStaticProps({ params: { slug } }) {
    if (!slug) {
        return;
    }

    const response = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/blog/${slug}`)
    const blog = await response.json()

    return {
        props: {
            blog: blog.data
        },
        revalidate: 320,
    };
}

export async function getStaticPaths() {
    const response = await fetch('https://wanderlust-api-production.up.railway.app/api/v1/sitemap/blogs')
    const blogs = await response.json()
    const paths = blogs.data.map((blog) => (
        {
            params: {
                slug: blog.slug,
            },
        }
    ))

    return {
        paths,
        fallback: true,
    }
}

// export async function getServerSideProps({ query }) {
//     const res = await fetch(`https://www.example.com/api/blog/${query.slug}`);
//     const data = await res.json();
  
//     return {
//       props: {
//         blog: data,
//       },
//     };
//   }

export default function BlogPost({ blog }) {
    // Hooks

    // Hooks
    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8">
            <h3>hi</h3>
        </section>
    )
}