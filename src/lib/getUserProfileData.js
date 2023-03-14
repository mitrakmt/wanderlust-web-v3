export async function getUserProfileData(slug) {
    const user = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/user/public/user/${slug}`)
    .then((res) => res.json())

    return {
        user: user.data,
    }
}
