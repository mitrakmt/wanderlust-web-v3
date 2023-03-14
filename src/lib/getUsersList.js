export async function getUsersList() {
    const users = await fetch('https://wanderlust-api-production.up.railway.app/api/v1/sitemap/users')
    .then((res) => res.json())

    return users.data.map((user) => ({
        params: {
            username: user.username,
        },
    }))
}
