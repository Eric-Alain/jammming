import clientID from './SpotifyCredentials.js';
/*const redirectURI = 'http://eric-jammming.surge.sh/';*/
const redirectURI = 'http://localhost:3000/';

let accessToken;

const Spotify = {
    getAccessToken() {
        if(accessToken) {
            return accessToken;
        }

        //Check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            //This clears the parameters, allowing us to grab a new access token when it expires. 
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }

        else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessURL;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => response.json()
        ).then(jsonResponse => {
            if(!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track =>
                ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0],
                    album: track.album.name,
                    uri: track.uri,
                    preview: track.preview_url  
                })
            );            
        })
    },

    savePlaylist(name, trackURIs) {
        if (!name || !trackURIs.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const bearer = {Authorization: `Bearer ${accessToken}`}
        let userId;

        return fetch(`https://api.spotify.com/v1/me`, {headers: bearer}
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
                {
                    headers: bearer,
                    method: 'POST',
                    body: JSON.stringify({name: name})
                }).then(response => response.json()
                ).then(jsonResponse => {
                    const playlistId = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                        {
                            headers: bearer,
                            method: 'POST',
                            body: JSON.stringify({uris: trackURIs})
                        }
                    )
                })
        })
    },

    playTrack(name, trackURIs) {
        if (!name || !trackURIs.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const bearer = {Authorization: `Bearer ${accessToken}`}

        return fetch(`https://api.spotify.com/v1/me`, {headers: bearer}
        ).then(response => response.json()
        ).then(jsonResponse => {
            return fetch(`https://api.spotify.com/v1/me/player/play`,
                {
                headers: bearer,
                method: 'POST',
                body: JSON.stringify(
                    {
                        name: name,
                        "context_uri": "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr",
                        "offset": {"position": 5},
                        "position_ms": 0
                    }
                )
            })
        })
    }

}



export default Spotify;