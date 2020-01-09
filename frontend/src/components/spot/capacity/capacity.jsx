import React from 'react';
import './capacity.css';
import { connect } from 'react-redux';
import { updateSpot, fetchSpot } from '../../../actions/spot_actions';
class Capacity extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            maxGuestSize: this.props.spot.capacity.maxGuestSize ? this.props.spot.capacity.maxGuestSize : 25,
            rooms: this.props.spot.capacity.rooms ? this.props.spot.capacity.rooms : 3
        }
    }

    componentDidMount(){
        this.props.fetchSpot(this.props.match.params.spotId)
    }
    
    increase = arg => {
        this.setState(prevState => (
            { [arg]: prevState[arg] + 1 }
        ))
    }

    decrease = arg => {
        if (this.state[arg] > 0){
            this.setState(prevState => (
                { [arg]: prevState[arg] - 1 }
            ))
        } else return;
    }
    render() {
        return (
            <div className="capacity">
                <div className="white-background">
                    <p className="form-header">How many guests can your place</p>
                    <p className="form-header">accomodate?</p>
                    <p className="form-description">Check that you have enough rooms to accommodate all your guests comfortably.</p>
                    <div className='space-between'>
                        <p className="capacity-label">Guests</p>
                        <p className={`form-decrement ${this.state.maxGuestSize === 0 && "dull"}`}
                            onClick={() => this.decrease('maxGuestSize')}>-</p>
                        <p className="value">{this.state.maxGuestSize}</p>
                        <p onClick={() => this.increase('maxGuestSize')}
                            className="form-increment">+</p>
                    </div>
                    <p className="form-question">How many rooms can guests use?</p>
                    <div className='space-between'>
                        <p className="capacity-label">Rooms</p>
                        <p className={`form-decrement ${this.state.rooms === 0 && "dull"}`}
                            onClick={() => this.decrease('rooms')}>-</p>
                        <p className="value">{this.state.rooms}</p>
                        <p className="form-increment"
                            onClick={() => this.increase('rooms')}>+</p>
                    </div>
                    <div className="next-back">
                        <p>Back</p>
                        <button className="next-btn"
                        onClick={() => {
                            this.props.updateSpot(this.props.match.params.spotId, {
                                capacity: this.state
                            });
                            console.log("pressed");
                        }}>Next</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    spot: state.entities.spotForm
})

const mapDispatchToProps = dispatch => ({
    updateSpot: (spotId, updatePayload) => dispatch(updateSpot(spotId, updatePayload)),
    fetchSpot: (spotId) => dispatch(fetchSpot(spotId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Capacity);
