import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';
import PausePlayIcon from '../PausePlayIcon/PausePlayIcon';

const elements = [];

class TrackList extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          activeElement: null,
          allElements: elements
        };
        this.toggleIndex = this.toggleIndex.bind(this);
    }

    toggleIndex(index) {        
        let audio = document.getElementById(index);
        let allAudios = document.querySelectorAll('audio');
        audio.volume = 0.1;

        if(this.state.activeElement === index) {
            this.setState({ activeElement: null });
            audio.pause();
        }
        else {
            this.setState({ activeElement: index });
            allAudios.forEach(function(audio){
                audio.pause();
            });
            audio.play();
        }
    }

    render() {
        return (
            <div className="TrackList">
                {
                    this.props.tracks.map((track, index) => {
                        elements.push(index)
                        return  (
                            <div key={index}>
                                <PausePlayIcon
                                    allElements={this.state.allElements}
                                    activeElement={this.state.activeElement}
                                    toggleIndex={this.toggleIndex}
                                    preview={track.preview}
                                    index={index}
                                />
                                <Track
                                    track={track}
                                    key={track.id}
                                    onAdd={this.props.onAdd}
                                    onRemove={this.props.onRemove}
                                    isRemoval={this.props.isRemoval}
                                />
                            </div>
                        )                
                    })
                }
            </div>
        )
    }
}

export default TrackList;