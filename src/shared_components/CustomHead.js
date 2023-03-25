export default function CustomHead({ title, description, image, alt, url }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <title>{title}</title>
                <meta property="fb:app_id" content="5439766236043603" />
                <meta key="description" property="og:description" content={description} />
                <meta key="image" property="og:image" content={image} />
                <meta key="width" property="image:width" content="800" />
                <meta key="height" property="image:height" content="600" />
                <meta key="alt" property="image:alt" content={alt} />
            </Head>
            <Head> 
                {/* <!-- Open Graph / Facebook --> */}
                <meta key="og:type" property="og:type" content="website" />
                <meta key="og:title" property="og:title" content={title} />
                <meta key="og:url" property="og:url" content={url} />
                <meta key="og:description" property="og:description" content={description} />
                <meta key="og:image" property="og:image" content={image} />
                <meta key="og:width" property="og:image:width" content="800" />
                <meta key="og:height" property="og:image:height" content="600" />
                <meta key="og:alt" property="og:image:alt" content={alt} />
            </Head>
            <Head>
                {/* <!-- Twitter --> */}
                <meta key="twitter:card" property="twitter:card" content="summary_large_image" />
                <meta key="twitter:title" property="twitter:title" content={title} />
                <meta key="twitter:url" property="twitter:url" content={url} />
                <meta key="twitter:description" property="twitter:description" content={description} />
                <meta key="twitter:image" property="twitter:image" content={image} />
                <meta key="twitter:width" property="twitter:image:width" content="800" />
                <meta key="twitter:height" property="twitter:image:height" content="600" />
                <meta key="twitter:alt" property="twitter:image:alt" content={alt} />
            </Head>
        </>
    )
}