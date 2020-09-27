import React from 'react'
import './PausePlayIcon.css';
import Audio from '../Audio/Audio';

class PausePlayIcon extends React.Component {

    render() {
        return(                      
            <div>
                <Audio 
                    activeElement={this.props.activeElement}
                    preview={this.props.preview}
                    toggleIndex={this.props.toggleIndex}
                    index={this.props.index}
                    id={this.props.index}
                />          
            </div>
        )
    }
}

export default PausePlayIcon;