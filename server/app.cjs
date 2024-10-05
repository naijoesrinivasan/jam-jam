const express = require('express')
const dotenv = require('dotenv')
const request = require('request')
const cors = require('cors')

dotenv.config()

global.access_token = ''
function generateRandomString(length) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  for(let i=0;i<length;++i)
    text += possible.charAt(Math.floor(Math.random() * 26))

  return text
}


const spotify_client_id = process.env.SPOTIFY_CLIENT_ID
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET
const spotify_redirect_uri = "http://localhost:5173/auth/callback"

const app = express()

// app.use(cors({
//   origin: ["http://localhost:5173"],
//   methods: ['GET', 'PUT', 'POST']
// }))

app.get('/auth/login', (req, res) => {
  const scope = "streaming user-read-email user-read-private user-top-read playlist-read-private playlist-read-collaborative user-library-read user-read-playback-state user-modify-playback-state user-read-currently-playing"
  const state = generateRandomString(16)

  const authParams = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: spotify_redirect_uri,
    state: state
  })

  res.redirect("https://accounts.spotify.com/authorize?" + authParams.toString())
})

app.get('/auth/callback', (req, res) => {
  const code = req.query.code

  const options = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: spotify_redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    json: true
  }

  request.post(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
      res.redirect('/')
    }
  })
})

app.get('/auth/token', (req, res) => {
  console.log("Received access token request")
  res.json({ access_token: access_token })
})

app.get('/', (req, res) => {
  console.log("Received a request at API Home")
  res.send({message: "Received Message"})
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log("Express server listening on port: ", port)
})