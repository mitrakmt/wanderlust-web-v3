import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          {/* Include your code snippet here */}
        <meta name="verification" content="460bfd25b57ffced74edf7530b43e59eb4f1c5b7" />
        <script
            id="hydro_config"
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                window.Hydro_tagId = "e30a9634-8798-4872-9366-27b30c358235";
              `,
            }}
          />
          <script id="hydro_script" src="https://track.hydro.online/" async />
        </Head>
      <body className="w-full">
        <Main className="overflow-scroll scroll-smooth" />
        <Script
          type="text/javascript"
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        />
        <NextScript />
      </body>
    </Html>
  )
}
