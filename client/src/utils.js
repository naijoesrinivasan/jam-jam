export async function auth() {
    const loggedIn = localStorage.getItem("loggedIn");

    if (!loggedIn) {
        throw {
            message: "user is not logged in"
        }
    }
    return loggedIn;
}

const endPoint = 'https://accounts.spotify.com/authorize?';
const response_type = 'code';
const redirect_uri = 'http://localhost:5173/home';
const client_id = '856e9ad5e4a946d2aee20e5a7f3aae75';
const scope = 'user-read-private user-read-email user-top-read playlist-read-private playlist-read-collaborative user-library-read';
const params = new URLSearchParams({
    client_id: client_id,
    response_type: response_type,
    redirect_uri: redirect_uri,
    scope: scope,
    state: "123"
});

export const spotifyLoginEndpoint = `${endPoint}${params}`;