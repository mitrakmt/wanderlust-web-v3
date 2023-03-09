import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="w-full overflow-scroll scroll-smooth">
        <Main className="overflow-scroll scroll-smooth" />
        <script
          type="text/javascript"
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        />
        <NextScript />
      </body>
    </Html>
  )
}
