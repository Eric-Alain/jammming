import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: 'Search Result Name One',
          artist: 'Search Result Artist One',
          album: 'Search Result Album One',
          id: 1
        },
        {
          name: 'Search Result Name Two',
          artist: 'Search Result Artist Two',
          album: 'Search Result Album Two',
          id: 2
        },
        {
          name: 'Search Result Name Three',
          artist: 'Search Result Artist Three',
          album: 'Search Result Album Three',
          id: 3
        }
      ],
      playlistName: "Eric's Playlist",
      playlistTracks: [
        {
          name: 'Playlist Name One',
          artist: 'Playlist Artist One',
          album: 'Playlist Album One',
          id: 4
        },
        {
          name: 'Playlist Name Two',
          artist: 'Playlist Artist Two',
          album: 'Playlist Album Two',
          id: 5
        },
        {
          name: 'Playlist Name Three',
          artist: 'Playlist Artist Three',
          album: 'Playlist Album Three',
          id: 6
        }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if(tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({
      playlistTracks: tracks
    })
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id)
    this.setState({
      playlistTracks: tracks
    })
  }
  
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
            />
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
