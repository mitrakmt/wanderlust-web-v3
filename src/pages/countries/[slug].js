import Image from "next/image";
import { useState, useEffect } from "react";
import request from '../../utils/request';

// Components
import BlogCard from "@/components/BlogCard";
import CityCard from "../../components/CityCard/CityCard";
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import TextH3 from '../../components/Text/TextH3';
import Timeline from '../../components/Timeline/Timeline';
import Footer from '../../components/Footer';

// Hooks
import CustomHead from '@/shared_components/CustomHead';
import { useRouter } from 'next/router'

export async function getStaticProps({ params: { slug } }) {
    const response = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/countries/slug/${slug}`)
    const countrySelected = await response.json()

    // Get blogs for country
    const countryResponse = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/blog/country/${countrySelected?.data?.id}`)
    const blogs = await countryResponse.json()

    // Get cities for country
    const citiesResponse = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/cities/country/${countrySelected?.data?.id}`)
    const cities = await citiesResponse.json()

    return {
        props: {
            countrySelected: countrySelected?.data || {},
            blogs: blogs.data || [],
            cities: cities.data || [],
        },
    };
}

export async function getStaticPaths() {
    const response = await fetch('https://wanderlust-api-production.up.railway.app/api/v1/sitemap/countries')
    const countries = await response.json()
    const paths = countries.map((country) => (
        {
            params: {
                slug: country.slug,
            },
        }
    ))

    return {
        paths,
        fallback: true,
    }
}

export default function CountryPage({ countrySelected, blogs, cities }) {
    const router = useRouter()
    const [countryTabSelected, setCountryTabSelected] = useState('about');
    const [holidays, setHolidays] = useState([]);

    // Functions
    function getNotUnique(a) {
        var seen = {};
        return a?.filter(function(item) {
            return seen.hasOwnProperty(item.urlid) ? false : (seen[item.urlid] = true);
        });
    }

    useEffect(() => {
        request(`/holiday/country/${countrySelected?.alpha2Code}`)
            .then(res => {
                setHolidays(getNotUnique(res.data));
            })
    }, [countrySelected])

    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8">
            <CustomHead
                title={`Explore New Countries Around the World | Wanderlust App Countries`}
                description={`Wanderlust App Countries lets you explore countries around the world, from popular tourist destinations to hidden gems. Our curated list of cities in each country offers in-depth information on local culture, attractions, and experiences. Browse our city guides to discover new destinations and plan your next adventure. Wanderlust App Countries is your go-to resource for travel inspiration and planning.`}
                url={`https://www.wanderlustapp.io/country/${countrySelected?.name}`}
                image="/cityDetailsDark1.png"
                alt={`${countrySelected?.name} Country Page`}
            />
            <BreadCrumb breadCrumbHome={"Countries"} goToHome={() => router.push(`/countries`)} secondName={countrySelected?.name} />

            {
                countrySelected?.image_url_medium && 
                    <Image
                        src={countrySelected?.image_url_medium}
                        alt={`${countrySelected?.name} Country Page`}
                        width={1800}
                        height={400}
                        className="w-full rounded-lg mt-4"
                        style={{ height: '140px' }}
                        quality={100}
                    />
            }

            <h1 className="text-3xl my-4 text-gray-700 dark:text-white">{countrySelected?.name}</h1>

            <div className="w-full my-8">
                <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-4">
                        <p className="text-gray-500 dark:text-gray-400">Country Information</p>
                    </div>
                    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
                        <li className="mr-2">
                            <button onClick={() => setCountryTabSelected('about')} type="button" role="tab" className={`inline-block p-4 ${countryTabSelected === 'about' ? "text-primary-600 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-primary-500" : "hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300"} rounded-tl-lg`}>About</button>
                        </li>
                        <li className="mr-2">
                            <button onClick={() => setCountryTabSelected('geographic')} type="button" role="tab" className={`inline-block p-4 ${countryTabSelected === 'geographic' ? "text-primary-600 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-primary-500" : "hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300"}`}>Geographic</button>
                        </li>
                        <li className="mr-2">
                            <button onClick={() => setCountryTabSelected('holidays')} type="button" role="tab" className={`inline-block p-4 ${countryTabSelected === 'holidays' ? "text-primary-600 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-primary-500" : "hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300"}`}>Holidays</button>
                        </li>
                        <li className="mr-2">
                            <button onClick={() => setCountryTabSelected('translations')} type="button" role="tab" className={`inline-block p-4 ${countryTabSelected === 'translations' ? "text-primary-600 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-primary-500" : "hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300"}`}>Translations</button>
                        </li>
                    </ul>
                    <div id="defaultTabContent">
                        <div className={`${countryTabSelected === 'about' ? "" : "hidden"} p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800 flex flex-col sm:flex-row`} id="about" role="tabpanel" aria-labelledby="about-tab">
                            <Image src={countrySelected?.image_url_medium} alt={countrySelected?.name} height={250} width={400} className="rounded-lg" />
                            <div className="mt-4 sm:mt-0 sm:ml-4">
                                <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">{countrySelected?.official_name}</h2>
                                {
                                    countrySelected?.nativeNames && <p className="mb-1 text-gray-500 dark:text-gray-400">Native Names: {Object.keys(countrySelected?.nativeNames).map((key) => (
                                        countrySelected?.nativeNames[key].common
                                    ))}</p>
                                }
                                {
                                    countrySelected?.translations && <p className="mb-1 text-gray-500 dark:text-gray-400">Currencies: {Object.keys(countrySelected?.translations).map((key) => (
                                        countrySelected?.translations[key].name
                                    ))}</p>
                                }
                                <p className="mb-1 text-gray-500 dark:text-gray-400">Capital: {countrySelected?.capital}</p>
                                <p className="mb-1 text-gray-500 dark:text-gray-400">Population: {countrySelected?.population}</p>
                                {
                                    countrySelected?.gini !== "Not Available" && <p className="mb-1 text-gray-500 dark:text-gray-400 flex flex-col">Gini Score: {Object.keys(countrySelected?.gini).map((key) => (
                                        <span className="text-xs ml-4" key={`giniScore-${key}`}>{`${key}: ${countrySelected?.gini[key]}`}</span>
                                    ))}</p>
                                }
                            </div>
                        </div>
                        <div className={`${countryTabSelected === 'geographic' ? "" : "hidden"} p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`} id="geographic" role="tabpanel" aria-labelledby="geographic-tab">
                            {
                                countrySelected?.region && <p className="mb-1 text-gray-500 dark:text-gray-400">Region: {countrySelected?.region}</p>
                            }
                            {
                                countrySelected?.continent && <p className="mb-1 text-gray-500 dark:text-gray-400">Continent: {countrySelected?.continent}</p>
                            }
                            {
                                countrySelected?.borders && <p className="mb-1 text-gray-500 dark:text-gray-400">Borders: {countrySelected?.borders.map((border) => (
                                    <span key={`timezones-${border}`} className="text-xs mr-1">{border}, </span>
                                ))}</p>
                            }
                            {
                                countrySelected?.subregion && <p className="mb-1 text-gray-500 dark:text-gray-400">Sub Region: {countrySelected?.subregion}</p>
                            }
                            {
                                countrySelected?.latLng && <p className="mb-1 text-gray-500 dark:text-gray-400">Lat/Long: {`${countrySelected?.latLng.country[0]}, ${countrySelected?.latLng.country[1]}`}</p>
                            }
                            {
                                countrySelected?.timezones && <p className="mb-1 text-gray-500 dark:text-gray-400">Timezones: {countrySelected?.timezones.map((timezone) => (
                                    <span key={`timezones-${timezone}`} className="text-xs mr-1">{timezone}, </span>
                                ))}</p>
                            }
                        </div>
                        <div className={`${countryTabSelected === 'holidays' ? "" : "hidden"} p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`} id="holidays" role="tabpanel" aria-labelledby="statistics-tab">
                            {
                                holidays?.length > 0 ? (
                                    <div className="w-full my-12">
                                        <TextH3 classes="mb-4">Holidays</TextH3>
                                        <div className="block w-full p-8 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                            <Timeline data={holidays} />
                                        </div>
                                    </div>
                                ) : <TextH3 classes="mb-4">No Holidays for this location (yet)!</TextH3>
                            }
                        </div>
                        <div className={`${countryTabSelected === 'translations' ? "" : "hidden"} p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800`} id="translations" role="tabpanel" aria-labelledby="statistics-tab">
                            {
                                countrySelected?.translations && <p className="mb-1 text-gray-500 dark:text-gray-400">{Object.keys(countrySelected?.translations).map((key) => (
                                    <span key={`translations-${key}`}><span className="font-bold mr-2 text-gray-800 dark:text-gray-300">{key}:</span> {countrySelected?.translations[key]}, </span>
                                ))}</p>
                            }
                        </div>
                    </div>
                </div>

            </div>

            {
                cities && cities.length > 0 && <div className="w-full">
                    <h2 className="text-xl my-4 text-gray-700 dark:text-white">Best cities to travel to in {countrySelected?.name}</h2>
                    <div className="flex flex-wrap gap-x-4 gap-y-4">
                        {
                            cities.map((city, index) => (
                                <div className="w-52" key={`countriesPage-cities-${city.slug}`}>
                                    <CityCard priority={true} data={{ city }} hideLikeCount={true} index={index} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            }

            {
                blogs && blogs.length > 0 && <div className="w-full">
                    <h2 className="text-xl my-4 text-gray-700 dark:text-white">{countrySelected?.name} Travel Blogs</h2>
                    <div className="flex flex-wrap">
                        {
                            blogs.map(post => (
                                <BlogCard key={`countriesPage-blogs-${post.slug}`} post={post} />
                            ))
                        }
                    </div>
                </div>
            }

            <Footer />
        </section>
    )
}