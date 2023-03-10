export default function StatCard({ stat, label, svg }) {
    return (
      <div className="mt-4 mr-4 text-center">
              <div className="inline-block w-auto border rounded-lg shadow">
                  <div className="flex p-5">
                      <div className="p-4 m-2 text-white bg-primary-600 rounded">
                          {svg}
                      </div>
                      <div className="w-auto mx-4 my-auto">
                          <div className="text-sm font-medium text-gray-500 dark:text-white">{label}</div>
                          <div className="mt-1 text-3xl dark:text-white">{stat}</div>
                      </div>
                  </div>
              </div>
          </div>
    )
  }