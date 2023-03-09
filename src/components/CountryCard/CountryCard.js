import Image from 'next/image'

export default function CountryCard({ name, image_url_small, visited = false, index }) {
  return (
    <span className="relative">
      <div className="flex items-center w-full text-center group space-between brightness-150 dark:brightness-100" style={{ height: '200px', width: '100%', position: 'relative' }}>
          <div className="z-20 flex flex-col items-center justify-center w-full mt-4 text-center">
              <div>
                  <h3 className="z-20 text-xl font-extrabold text-white" style={{ textShadow: '1px 1px 0 rgb(0 0 0 / 35%), 1px 1px 5px rgb(0 0 0 / 50%)' }}>
                  <span aria-hidden="true" className="absolute inset-0" />
                      {name}
                  </h3>
              </div>
          </div>
          <div style={{ top: 0, left: 0, padding: '15px' }} className="absolute z-20">
              <h3 className="z-20 text-xl font-extrabold text-white" style={{ textShadow: '1px 1px 0 rgb(0 0 0 / 35%), 1px 1px 5px rgb(0 0 0 / 50%)' }}>
                  {index + 1}
              </h3>
          </div>
          {
            visited && <div style={{ top: 0, right: 0, padding: '15px 5px' }} className="absolute z-20">
                <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Visited</span>
            </div>
          }
          <div className="w-full bg-gray-200 rounded-md min-h-80 aspect-w-1 aspect-h-1 lg:h-80 lg:aspect-none" style={{ position: 'absolute', height: "100%" }}>
                <Image
                    src={image_url_small}
                    alt={name}
                    fill
                    className="object-cover object-center w-full h-full rounded-md lg:w-full lg:h-full brightness-50"
                />
          </div>
      </div>
    </span>
  )
}