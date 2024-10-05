export async function auth() {
    console.log("Auth function running...")
    const access_token = localStorage.getItem("access_token");

    if (!access_token) {
        throw {
            message: "user does not have an access token"
        }
    }
    return access_token;
}