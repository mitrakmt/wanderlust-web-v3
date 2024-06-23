/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArticleJsonLd } from 'next-seo';
import { useRouter } from 'next/router';
import Script from 'next/script'

// Utils
import request from '../../utils/request';

// Hooks
import { useAuth } from '../../hooks/useAuth';
 
// Components
import CustomHead from '../../shared_components/CustomHead';
import Footer from '../../components/Footer';
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import BlogCard from '../../components/BlogCard';
import CityRow from '../../components/CityRow';
import CityEmbed from '../../components/CityEmbed';
import CountryEmbed from '../../components/CountryEmbed';
import UserEmbed from '../../components/UserEmbed';
import BlogEmbed from '../../components/BlogEmbed';

export async function getStaticProps({ params: { slug, city, country } }) {
    try {
        if (!slug) {
            return;
        }

        const response = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/blog/${slug}`)
        const blog = await response.json()

        // Get related articles
        let relatedArticles;

        if (city) {
            // Get related articles by city
            const relatedResponse = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/blog/city/${city}?limit=4`)
            relatedArticles = await relatedResponse.json()

        } else if (country) {
            // Get related articles by country
            const relatedResponse = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/blog/country/${country}?limit=4`)
            relatedArticles = await relatedResponse.json()

        } else {
            // Get related articles by category
            const relatedResponse = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/blog/search?category=${blog?.data.category.replace(/\ /g, '+')}&limit=4`)
            relatedArticles = await relatedResponse.json()
        }

        return {
            props: {
                blog: blog?.data,
                relatedArticles: relatedArticles.data
            },
            revalidate: 320,
        };
    } catch (err) {
        console.log('ERROR HERE', err);
        return {
            props: {
                blog: {},
                relatedArticles: []
            },
            revalidate: 320,
        };
    }
}

export async function getStaticPaths() {
    const response = await fetch('https://wanderlust-api-production.up.railway.app/api/v1/sitemap/blogs')
    const blogs = await response.json()
    const paths = blogs.data.map((blog) => (
        {
            params: {
                slug: blog?.slug,
                city: blog?.city,
                country: blog?.country,
            },
        }
    ))

    return {
        paths,
        fallback: true,
    }
}

export default function BlogPost({ blog, relatedArticles }) {
    // Hooks
    const { user } = useAuth();
    const router = useRouter();

    // State
    const [comments, setBlogComments] = useState([]);
    const [comment, setComment] = useState("");
    const [showCommentDropdown, setShowCommentDropdown] = useState(null);

    console.log('blog', blog)

    // UseEffect
    useEffect(() => {
        if (blog?.author?.username !== user?.username) {
            request(`/blog/see/${blog?.id}`)
        }
    }, []);

    useEffect(() => {
        if (blog?.author?.username !== user?.username) {
            const intervalId = setInterval(() => {
                request(`/blog/time/${blog?.id}`)
            }, 5000);
    
            return () => clearInterval(intervalId);
        }
    }, []);

    useEffect(() => {
        if (blog) {
            request(`/blog-comment/${blog?.id}`)
                .then(res => {
                    setBlogComments(res.data);
                })
        }
    }, [blog]);

    useEffect(() => {
        const handleRouteChange = () => {
            if (document.getElementById('top')) {
                document.getElementById('top').scrollIntoView();
            }
        }
        router.events.on('routeChangeComplete', handleRouteChange)

        return () => {
            window.removeEventListener("routeChangeComplete", handleRouteChange) // this event listener is removed after the new route loads
        }
    }, []);

    // Functions
    const removeComment = (id) => {
        if (!user) return;

        setShowCommentDropdown(null);
        request(`/blog-comment/comment/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                // Remove comment from state
                const newComments = comments.filter(comment => comment.id !== id);
                setBlogComments(newComments);
            })
    }

    const addComment = () => {
        if (!user) return;

        if (comment?.length === 0) {
            return;
        }

        request(`/blog-comment/${blog?.id}`, {
            body: {
                text: comment,
            },
            method: 'POST'
        })
            .then(res => {
                setBlogComments([...[res.data], ...comments]);
                setComment("");
            })
    }

    const shareToFacebook = (req, res) => {
        window.open(`https://www.facebook.com/dialog/share?app_id=5439766236043603&display=popup&href=https://www.wanderlustapp.io/blog/${blog?.slug}&redirect_uri=https://wanderlustapp.io/blog/${blog?.slug}`, '_blank');
    }

    const shareToMastadon = (req, res) => {
        window.open(`https://mastodon.social/share`, '_blank');
    }

    const options = { month: 'short', day: 'numeric', year: 'numeric' };

    // Hooks
    return (
        <section className="relative ml-0 sm:ml-16 px-2 sm:px-6 py-8">
            <CustomHead
                title={`${blog?.title} | Wanderlust App Blogs`}
                description={`${blog?.summary}`}
                image={blog?.image_url}
                url={`https://www.wanderlustapp.io/blog/${blog?.slug}`}
                alt={`${blog?.title} - Wanderlust App`}
                contentCreator={blog?.author?.twitter}
            />
            <ArticleJsonLd
                url={`https://www.wanderlustapp.io/blog/${blog?.slug}`}
                title={`${blog?.title} | Wanderlust App Blogs`}
                images={[
                    blog?.image_url,
                ]}
                datePublished={blog?.publishedOn}
                dateModified={blog?.updatedOn || undefined}
                authorName={[
                    {
                        name: blog?.author?.name,
                        url: `https://www.wanderlustapp.io/profile/${blog?.author?.username}`,
                    }
                ]}
                publisherName="Wanderlust App"
                publisherLogo="https://wanderlust-extension.s3.us-west-2.amazonaws.com/logo.jpg"
                description={`${blog?.summary}`}
                isAccessibleForFree={true}
            />
            <BreadCrumb breadCrumbHome={"Blogs"} goToHome={() => router.push('/blog')} secondName={blog?.title} />
            <main className="pt-8 mt-4 pb-16 lg:pt-16 lg:pb-8 dark:bg-gray-900" id="top">
                <div className="flex flex-col justify-between px-4 mx-auto ">
                    <article className="mx-auto w-full max-w-4xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                        <header className="mb-4 lg:mb-6 not-format">
                            {/* <address className="flex items-center mb-6 not-italic">
                                <div className="flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                    <Image
                                        className="relative mr-4 w-16 h-16 rounded-full"
                                        src={blog?.author.profile_image}
                                        alt={`${blog?.author.name} Avatar`}
                                        height={120}
                                        width={120}
                                    />
                                    <div>
                                        <Link href={`/profile/${blog?.author.username}`} className="text-xl font-bold text-gray-900 dark:text-white">{blog?.author.username}</Link>
                                        <p className="text-base font-light text-gray-500 dark:text-gray-400">{blog?.author.job}</p>
                                        <p className="text-base font-light text-gray-500 dark:text-gray-400"><time pubdate="true" dateTime="2022-02-08" title="February 8th, 2022">{blog?.publishedOn}</time></p>
                                    </div>
                                </div>
                            </address> */}
                            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{blog?.title}</h1>
                            <p className="text-base font-light text-gray-500 dark:text-gray-400"><time pubdate="true" dateTime="2022-02-08" title="February 8th, 2022">{blog?.publishedOn}</time></p>
                            {/* City info */}
                            {
                                blog?.city && <CityRow cities={[blog?.city]} pageIndex="1" />
                            }

                        </header>
                        {
                            blog?.image_url && (
                                <Image
                                    priority
                                    src={blog?.image_url}
                                    alt={blog?.title}
                                    height={600}
                                    width={800}
                                    className="rounded-lg w-full"
                                />
                            )
                        }

                        {
                            blog?.content.map((content, index) => {
                                switch (content.type) {
                                    case 'p':
                                        return (
                                            <>
                                                <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300" key={`blog-${content.type}-${index}`}>{content.text}</p>
                                                {
                                                    // TODO: break this into one component so it's cleaner
                                                    content.rich === 'city' ?
                                                        <></> :
                                                        content.rich === 'user' ?
                                                            <></> :
                                                            content.rich === 'blog' ?
                                                                <></> :
                                                                content.rich === 'country' ? 
                                                                    <></> :
                                                                    content.rich === 'place' &&
                                                                        <></>
                                                }
                                            </>
                                        )
                                    case 'image':
                                        return (
                                            <div className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300" key={`blog-${content.type}-${index}`}>
                                                <Image
                                                    src={content?.src}
                                                    alt={content?.alt}
                                                    height={600}
                                                    width={800}
                                                    className="rounded-lg w-full"
                                                />
                                            </div>
                                        )
                                    case 'youtube':
                                        return (
                                            <div className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300" key={`blog-${content.type}-${index}`}>
                                                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${content?.src}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                            </div>
                                        )
                                    case 'instagram':
                                        return (
                                            <div className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300" key={`blog-${content.type}-${index}`}>
                                                <iframe src={`https://www.instagram.com/p/${content?.src}/embed`} width="560" height="315" frameBorder="0" scrolling="no" allowFullScreen={true}></iframe>
                                            </div>
                                        )
                                    case 'twitter':
                                        return (
                                            <div className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300" key={`blog-${content.type}-${index}`}>
                                                <blockquote className="twitter-tweet">
                                                    <a href={`https://twitter.com/${content?.src}`}></a>
                                                </blockquote>
                                            </div>
                                        )
                                    case 'blockquote':
                                        return (
                                            <blockquote className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300" key={`blog-${content.type}-${index}`}>{content.text}</blockquote>
                                        )
                                    case 'h1':
                                        return (
                                            <h1 className="mb-6 text-xl leading-relaxed text-gray-700 dark:text-gray-300" key={`blog-${content.type}-${index}`}>{content.text}</h1>
                                        )
                                    case 'h2':
                                        return (
                                            <h2 className="mb-6 text-xl leading-relaxed text-gray-700 dark:text-gray-300" key={`blog-${content.type}-${index}`}>{content.text}</h2>
                                        )
                                    case 'h3':
                                        return (
                                            <h3 className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300" key={`blog-${content.type}-${index}`}>{content.text}</h3>
                                        )
                                    case 'h4':
                                        return (
                                            <h4 className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300" key={`blog-${content.type}-${index}`}>{content.text}</h4>
                                        )
                                    case 'h5':
                                        return (
                                            <h5 className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300" key={`blog-${content.type}-${index}`}>{content.text}</h5>
                                        )
                                    case 'ul':
                                        return (
                                            <ul className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300" key={`blog-${content.type}-${index}`}>
                                                {
                                                    content.items.map((item, itemIndex) => (
                                                        <li key={`blog-list-ul-${index}-${itemIndex}`}>
                                                            {item.text}
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        );
                                    case 'ol':
                                        return (
                                            <ol className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300" key={`blog-${content.type}-${index}`}>
                                                {
                                                    content.items.map((item, itemIndex) => (
                                                        <li key={`blog-list-ol-${index}-${itemIndex}`}>
                                                            {item.text}
                                                        </li>
                                                    ))
                                                }
                                            </ol>
                                        );
                                    case 'blockquote':
                                        return (
                                            <blockquote className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300" key={`blog-${content.type}-${index}`}>{content.content}</blockquote>
                                        )
                                    case 'quote':
                                        return (
                                            <blockquote className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300" key={`blog-${content.type}-${index}`}>{content.content}</blockquote>
                                        )
                                    case 'city':
                                        return (
                                            <CityEmbed id={content.id} key={`blog-${content.type}-${content.id}-${index}`} />
                                        )
                                    // case 'country':
                                    //     return (
                                    //         <CountryEmbed id={content.id} key={`blog-${content.type}-${content.id}-${index}`} />
                                    //     )
                                    case 'blog':
                                        return (
                                            <BlogEmbed id={content.id} key={`blog-${content.type}-${content.id}-${index}`} />
                                        )
                                    case 'user':
                                        return (
                                            <UserEmbed id={content.id} key={`blog-${content.type}-${content.id}-${index}`} />
                                        )
                                    case 'link':
                                        return (
                                            <a href={content.url} target="_blank" title={content.text} className="px-6 py-4 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-200 no-underline hover:text-primary-600 dark:hover:text-primary-600 transition-colors">{content.text}</a>
                                        )
                                    case 'place':
                                        return (
                                            // <PlaceEmbed key={`blog-${content.type}-${content.id}`} />
                                            null
                                        )
                                    default:
                                        return null;
                                }
                            })
                        }

                        {/* SOCIAL */}
                        <div className="sharing-buttons flex flex-wrap mb-4">
                            <a className="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700" target="_blank" rel="noopener" href={`https://www.linkedin.com/sharing/share-offsite/?url=https://wanderlustapp.io/blog/${blog?.slug}`} aria-label="Share on Linkedin">
                                <svg aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6">
                                    <title>Linkedin</title>
                                    <path d="M136 183v283H42V183h94zm6-88c1 27-20 49-53 49-32 0-52-22-52-49 0-28 21-49 53-49s52 21 52 49zm333 208v163h-94V314c0-38-13-64-47-64-26 0-42 18-49 35-2 6-3 14-3 23v158h-94V183h94v41c12-20 34-48 85-48 62 0 108 41 108 127z">
                                    </path>
                                </svg>
                            </a>
                            
                            <a href={`https://twitter.com/share?text=${blog?.title} by @${blog?.author.twitter}&url=https://wanderlustapp.io/blog/${blog?.slug}&hashtags=${blog?.city ? blog?.city : "wanderlust"}&via=wanderlustext`} className="border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700" target="_blank" rel="noopener">
                                <svg aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6">
                                    <title>Twitter</title>
                                    <path d="m459 152 1 13c0 139-106 299-299 299-59 0-115-17-161-47a217 217 0 0 0 156-44c-47-1-85-31-98-72l19 1c10 0 19-1 28-3-48-10-84-52-84-103v-2c14 8 30 13 47 14A105 105 0 0 1 36 67c51 64 129 106 216 110-2-8-2-16-2-24a105 105 0 0 1 181-72c24-4 47-13 67-25-8 24-25 45-46 58 21-3 41-8 60-17-14 21-32 40-53 55z">
                                    </path>
                                </svg>
                            </a>

                            {/* FACEBOOK  */}
                            <a onClick={shareToFacebook} className="cursor-pointer border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700" rel="noopener" aria-label="Share on Facebook">
                                <svg aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6">
                                    <title>Facebook</title>
                                    <path d="M379 22v75h-44c-36 0-42 17-42 41v54h84l-12 85h-72v217h-88V277h-72v-85h72v-62c0-72 45-112 109-112 31 0 58 3 65 4z">
                                    </path>
                                </svg>
                            </a>

                            {/* Mastadon */}
                            <a onClick={shareToMastadon} className="w-14 h-14 cursor-pointer border-2 duration-200 ease inline-flex items-center mb-1 mr-1 transition p-3 rounded-lg text-white border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700" rel="noopener" aria-label="Share on Instagram">
                                <svg height="2500" width="2331" xmlns="http://www.w3.org/2000/svg" viewBox="-0.41 0.22 747.62 801.4499999999999">
                                    <path d="M729.94 479.5c-10.96 56.4-98.17 118.12-198.34 130.08-52.23 6.23-103.66 11.96-158.49 9.44-89.68-4.1-160.45-21.4-160.45-21.4 0 8.73.54 17.04 1.62 24.81 11.66 88.52 87.76 93.82 159.84 96.29 72.76 2.49 137.55-17.94 137.55-17.94l2.99 65.79s-50.89 27.32-141.55 32.35c-50 2.75-112.07-1.26-184.37-20.39C31.94 737.02 4.97 569.86.85 400.26-.41 349.9.37 302.42.37 262.7.37 89.27 113.99 38.44 113.99 38.44 171.28 12.12 269.59 1.06 371.79.22h2.52c102.19.84 200.57 11.9 257.86 38.22 0 0 113.62 50.83 113.62 224.26 0 0 1.42 127.96-15.85 216.8" fill="#3088d4" />
                                    <path d="M611.77 276.16v209.99h-83.2V282.33c0-42.97-18.07-64.77-54.23-64.77-39.98 0-60.01 25.86-60.01 77.02v111.57h-82.71V294.58c0-51.16-20.04-77.02-60.01-77.02-36.16 0-54.24 21.8-54.24 64.77v203.82h-83.19V276.16c0-42.92 10.93-77.03 32.88-102.26 22.63-25.23 52.27-38.17 89.07-38.17 42.57 0 74.81 16.37 96.12 49.1l20.72 34.74 20.73-34.74c21.31-32.73 53.55-49.1 96.12-49.1 36.79 0 66.44 12.94 89.07 38.17 21.95 25.23 32.88 59.34 32.88 102.26z" fill="#fff" />
                                </svg>
                            </a>
                        </div>

                        {/* DIVIDER */}
                        <div className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                            <hr />
                        </div>
                        <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">Wanderlust App was created to make it easy to discover the most beautiful places across the world. From an AI travel assistant to planning the perfect trip and tracking all the places you want to visit around the world, <a href="https://wanderlustapp.io">Wanderlust App</a> will help you do it all.</p>
                
                        
                        {/* COMMENTS */}
                        <section className="not-format">
                            <div className="flex justify-between items-center mb-6">
                                <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({ comments.length })</p>
                            </div>
                            {
                                !user && <div className="mb-6">
                                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                        <p className="text-sm text-gray-900 dark:text-white">You must be logged in to comment.</p>
                                    </div>
                                </div>
                            }
                            {
                                user ? <div className="mb-6">
                                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                        <label htmlFor="comment" className="sr-only">Your comment</label>
                                        <textarea id="comment" rows="6" value={comment} onChange={(e) => setComment(e.target.value)}
                                            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                            placeholder="Write a comment..."></textarea>
                                    </div>
                                    <button type="submit" onClick={addComment}
                                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                        Post comment
                                    </button>
                                </div> : null
                            }
                            
                            {
                                comments && comments.map((comment) => (
                                    <article key={`blog-comments-${comment.id}`} className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center">
                                                <Link href={`/profile/${comment?.user.username}`} className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                                    <Image
                                                        className="mr-2 w-10 h-10 rounded-full relative"
                                                        width={160}
                                                        height={160}
                                                        src={comment?.user.profile_image}
                                                        alt={comment?.user.username}
                                                    />
                                                    <p className="text-lg font-bold hover:text-primary-600 transition-colors">{comment?.user.username}</p>
                                                </Link>
                                                <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate="true" dateTime={new Date(comment.createdAt).toLocaleDateString('en-US', options)}
                                                    title={new Date(comment.createdAt).toLocaleDateString('en-US', options)}>{new Date(comment.createdAt).toLocaleDateString('en-US', options)}</time></p>
                                            </div>
                                            <div className="flex items-center flex-col relative">
                                                {
                                                    comment?.user.id === user?.id && (
                                                        <button
                                                            onClick={showCommentDropdown ? () => setShowCommentDropdown(null) : () => setShowCommentDropdown(comment.id)}
                                                            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                                            type="button"
                                                        >
                                                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                                                                </path>
                                                            </svg>
                                                            <span className="sr-only">Comment settings</span>
                                                        </button>
                                                    )
                                                }
                                                {/* <!-- Dropdown menu --> */}
                                                {
                                                    showCommentDropdown === comment.id && (
                                                        <div className="absolute top-8 right-8 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                                                aria-labelledby="dropdownMenuIconHorizontalButton">
                                                                <li>
                                                                    <a onClick={() => removeComment(comment.id)}
                                                                        className="cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <p>{comment.text}</p>
                                    </article>
                                ))
                            }
                        </section>
                    </article>
                </div>
                {/* City info */}
                {
                    blog?.city && <CityRow cities={[blog?.city]} pageIndex="2" />
                }
            </main>

            <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
                <div className="relative isolate overflow-hidden dark:bg-gray-900 bg-gray-200 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                    <svg
                        viewBox="0 0 1024 1024"
                        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                        aria-hidden="true"
                    >
                        <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                        <defs>
                        <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                            <stop stopColor="#7775D6" />
                            <stop offset={1} stopColor="#E935C1" />
                        </radialGradient>
                        </defs>
                    </svg>
                    <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight dark:text-white text-gray-800 sm:text-4xl">
                            Discover Premium Features.
                            <br />
                            Your ultimate travel app.
                        </h2>
                        <p className="mt-6 text-lg leading-8 dark:text-gray-300 text-gray-800">
                            Unlock the full WanderlustApp experience with our premium subscription. Enjoy exclusive benefits designed to enhance your travel adventures.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                            <Link href={`/pro`} className="text-xl font-bold dark:text-white text-gray-800">Learn More</Link>
                        </div>
                    </div>
                    <div className="relative mt-16 h-80 lg:mt-8">
                        <Image
                            className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                            width={1824}
                            height={1080}
                            src={"/haveTraveledToDark.png"}
                            alt="Wanderlust screenshot"
                        />
                    </div>
                </div>
            </div>

            <aside aria-label="Related articles" className="py-8 lg:py-24">
                <div className="px-4 mx-auto max-w-screen-xl">
                    <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Related articles</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            relatedArticles && relatedArticles.map((article) => (
                                <BlogCard post={article} key={`blogPost-relatedArticles-${article.id}`} />
                            ))
                        }
                    </div>
                </div>
            </aside>

            {/* <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-md sm:text-center">
                        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">Sign up for our newsletter</h2>
                        <p className="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400">Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to sign up with your email.</p>
                        <form action="#">
                            <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                                <div className="relative w-full">
                                    <label htmlFor="email" className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                                    </div>
                                    <input className="block p-3 pl-10 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter your email" type="email" id="email" required="" />
                                </div>
                                <div>
                                    <button type="submit" className="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Subscribe</button>
                                </div>
                            </div>
                            <div className="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300">We care about the protection of your data. <a href="#" className="font-medium text-primary-600 dark:text-primary-500 hover:underline">Read our Privacy Policy</a>.</div>
                        </form>
                    </div>
                </div>
            </section> */}

            <Footer />
        </section>
    )
}