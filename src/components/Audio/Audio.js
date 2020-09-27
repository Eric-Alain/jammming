import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class Audio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeElement: this.props.index
        }
    }    

    render() {
        return(           
            <div>                
                <audio id={this.props.id} volume="0.1">
                    <source src={this.props.preview}></source>
                </audio>
                <FontAwesomeIcon
                    className="Pause-play"
                    icon={this.state.activeElement === this.props.activeElement ? "pause" : "play"}
                    onClick={() => {
                        this.props.toggleIndex(this.props.index);
                    }}
                /> 
            </div>
        )
    }
}

export default Audio;