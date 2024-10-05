export async function auth() {
    console.log("Auth function running...")
    const loggedIn = localStorage.getItem("loggedIn");

    if (!loggedIn) {
        throw {
            message: "user is not logged in"
        }
    }
    return loggedIn;
}