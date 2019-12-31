import React, { Component } from 'react';

class Stopwatch extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            time: 0,
            timeStart: 0,
            isOn: false
        }
        this.stopTimer = this.stopTimer.bind(this)
    }

    componentDidMount() {
        this.setState({
            isOn: true,
            time: this.state.time,
            timeStart: Date.now() - this.state.time
          })
          this.Stopwatch = setInterval(() => this.setState({
            time: Date.now() - this.state.timeStart
          }), 10);
    }

    stopTimer() {
        this.setState({isRunning: false})
    }

    render() {
        const { time } = this.state;
        let seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
        let mins = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(time / 3600000)).slice(-2);
        return (
            <div className="Stopwatch">
                {hours}:{mins}:{seconds}
            </div>
        )
    }
}

export default Stopwatch;