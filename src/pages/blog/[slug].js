import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

// Utils
import request from '../../utils/request';
import trackClick from "../../utils/trackClick";

// Hooks
import { useAuth } from '../../hooks/useAuth';

// Components
import Footer from '../../components/Footer';
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import BlogCard from '../../components/BlogCard';

export async function getStaticProps({ params: { slug, city, country } }) {
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
        const relatedResponse = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/blog/search?category=${blog.data.category.replace(/\ /g, '+')}&limit=4`)
        relatedArticles = await relatedResponse.json()
    }

    return {
        props: {
            blog: blog.data,
            relatedArticles: relatedArticles.data
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
                city: blog.city,
                country: blog.country,
            },
        }
    ))

    return {
        paths,
        fallback: true,
    }
}

export default function BlogPost({ blog, relatedArticles }) {
    console.log('relatedArticles', relatedArticles)
    // Hooks
    const { user, userLoading } = useAuth();
    const router = useRouter();

    // State
    const [comments, setBlogComments] = useState([]);
    const [comment, setComment] = useState("");
    const [showCommentDropdown, setShowCommentDropdown] = useState(null);

    // UseEffect
    useEffect(() => {
        if (blog && user) {
            request(`/blog-comment/${blog.id}`)
                .then(res => {
                    setBlogComments(res.data);
                })
        }
    }, [blog]);

    useEffect(() => {
        trackClick('blog-view')
    }, [])

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

        if (comment.length === 0) {
            return;
        }

        request(`/blog-comment/${blog.id}`, {
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

    if (!blog || userLoading) return (<p>Loading...</p>)

    // Hooks
    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8">
            <NextSeo
                title={`${blog.title} | Wanderlust App Blogs`}
                description={`${blog?.summary}. Read ${blog?.title} and discover what you need to know. Get travel inspiration and tips from Wanderlust App Blogs, and stay up-to-date on the latest travel trends. Let Wanderlust App inspire you to explore new destinations and make the most of your travels.`}
                canonical={`https://www.wanderlustapp.io/blog/${blog?.slug}`}
                openGraph={{
                    url: `https://www.wanderlustapp.io/blog/${blog?.slug}`,
                    title: `${blog.title} | Wanderlust App Blogs`,
                    description: `${blog?.summary}. Read ${blog?.title} and discover what you need to know. Get travel inspiration and tips from Wanderlust App Blogs, and stay up-to-date on the latest travel trends. Let Wanderlust App inspire you to explore new destinations and make the most of your travels.`,
                    images: [
                        {
                            url: blog?.image_url,
                            width: 800,
                            height: 600,
                            alt: `${blog?.title} | Wanderlust App Blogs`,
                            type: 'image/jpeg',
                        },
                    ],
                    siteName: 'Wanderlust App Blogs',
                }}
                twitter={{
                    handle: '@mike_mitrakos',
                    site: '@wanderlustext',
                    cardType: 'summary_large_image',
                }}
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
                description={`${blog?.summary}. Read ${blog?.title} and discover what you need to know. Get travel inspiration and tips from Wanderlust App Blogs, and stay up-to-date on the latest travel trends. Let Wanderlust App inspire you to explore new destinations and make the most of your travels.`}
                isAccessibleForFree={true}
            />
            <BreadCrumb breadCrumbHome={"Blogs"} goToHome={() => router.push('/blog')} secondName={blog.title} />
            <main className="pt-8 mt-4 pb-16 lg:pt-16 lg:pb-24 dark:bg-gray-900">
                <div className="flex flex-col justify-between px-4 mx-auto max-w-screen-xl ">
                    <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                        <header className="mb-4 lg:mb-6 not-format">
                            <address className="flex items-center mb-6 not-italic">
                                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                    <Image className="relative mr-4 w-16 h-16 rounded-full" src={blog.author.profile_image} alt={`${blog.author.name} Avatar`} height={120} width={120} />
                                    <div>
                                        <Link href={`/profile/${blog.author.username}`} className="text-xl font-bold text-gray-900 dark:text-white">{blog.author.username}</Link>
                                        <p className="text-base font-light text-gray-500 dark:text-gray-400">{blog.author.job}</p>
                                        <p className="text-base font-light text-gray-500 dark:text-gray-400"><time pubdate="true" dateTime="2022-02-08" title="February 8th, 2022">{blog.publishedOn}</time></p>
                                    </div>
                                </div>
                            </address>
                            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{blog.title}</h1>
                        </header>
                        {
                            blog.image_url && (
                                <Image priority src={blog?.image_url} alt={blog?.title} height={600} width={800} className="rounded-lg w-full" />
                            )
                        }
                        {
                            blog.content.map((content, index) => {
                                switch (content.type) {
                                    case 'p':
                                        return (
                                            <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300" key={`blog-${content.type}-${index}`}>{content.text}</p>
                                        )
                                    case 'image':
                                        return (
                                            <div className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300" key={`blog-${content.type}-${index}`}>
                                                <Image src={content?.image} alt={blog?.title} height={600} width={800} className="rounded-lg w-full" />
                                            </div>
                                        )
                                    case 'h1':
                                        return (
                                            <h1 className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300" key={`blog-${content.type}-${index}`}>{content.text}</h1>
                                        )
                                    case 'h2':
                                        return (
                                            <h2 className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300" key={`blog-${content.type}-${index}`}>{content.text}</h2>
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
                                    case 'list':
                                        return (
                                            <ul className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300" key={`blog-${content.type}-${index}`}>
                                                {
                                                    content.content.map((item, index) => {
                                                        return (
                                                            <li key={`blog-list-${content.type}-${item}-${index}`}>{item}</li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        )
                                    case 'quote':
                                        return (
                                            <blockquote className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300" key={`blog-${content.type}-${index}`}>{content.content}</blockquote>
                                        )
                                    default:
                                        return null;
                                }
                            })
                        }
                        {/* DIVIDER */}
                        <div className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                            <hr />
                        </div>
                        <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">Wanderlust App was created to make it easy to discover the most beautiful places across the world. From an AI travel assistant to planning the perfect trip and tracking all the places you want to visit around the world, <a href="https://wanderlustapp.io">Wanderlust App</a> will help you do it all.</p>
                        {/* COMMENTS */}
                        <section className="not-format">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({ comments.length })</h2>
                            </div>
                            {/* Show UI that adding comments is for logged in users only */}
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
                                    <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center">
                                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                                    <Image
                                                        className="mr-2 w-6 h-6 rounded-full relative" width={120} height={120}
                                                        src={comment.user.profile_image} alt={comment.user.username} />
                                                    {comment.user.username}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400"><time pubdate="true" dateTime="2022-02-08"
                                                    title="February 8th, 2022">{comment.createdOn}</time></p>
                                            </div>
                                            <div className="flex items-center flex-col relative">
                                                {
                                                    comment.user.id === user.id && (
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
            </main>

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