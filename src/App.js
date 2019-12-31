import React, { Component } from 'react';
import './App.css';
import Stopwatch from './components/Stopwatch'

class App extends Component {
  
  state = {
    activities: [],
    newActivityDescription: '',
    newActivityId: 0
  }

  createNewActivity = () => {
    if (this.state.newActivityDescription) {
      var timeNow = Date.now();
      this.setState({ activities: [ ...this.state.activities, { description: this.state.newActivityDescription, id: this.state.newActivityId, startTime: JSON.stringify(timeNow), endTime: null } ] })

      this.setState({ newActivityId: this.state.newActivityId + 1 })
      this.setState({ newActivityDescription: '' })

      sessionStorage.setItem('activities', JSON.stringify(this.state.activities))
    }
    else {
      alert("Activity not added. Please add a description and try again")
    }
  }

  handleInputChange = (e) => {
    this.setState({ newActivityDescription: e.target.value }, () => {
    })
  }

  retrieveStoredActivities = () => {
    var storage = sessionStorage.getItem('activities')
  }

  completeActivity = (id) => {
    var updatedActivities = JSON.parse(JSON.stringify(this.state.activities))
    updatedActivities[id].endTime = Date.now();
    this.setState({activities: updatedActivities})
  }

  elapsedTime = (start, end) => {
    var time = new Date(JSON.parse(end)) - new Date(JSON.parse(start))

    var seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
    var mins = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
    var hours = ("0" + Math.floor(time / 3600000)).slice(-2);

    console.log(hours + ':' + mins + ':' + seconds)
    return hours + ':' + mins + ':' + seconds
  }

  render() {

    
    return (
      <div className="App">
        <header>
          <div className="header-title">Activity Tracker</div>
        </header>
        <div className="tracker-container">
          <div className="tracker-activity-spreadsheet">
            <h3 className="spreadsheet-title">Tracked Activities</h3>
            <div className="spreadsheet-data">
                <div className="spreadsheet-header spreadsheet-row">
                  <div className="header-cell spreadsheet-cell">
                    Description
                  </div>
                  <div className="header-cell spreadsheet-cell">
                    Started
                  </div>
                  <div className="header-cell spreadsheet-cell">
                    Completed
                  </div>
                  <div className="header-cell spreadsheet-cell">
                    Duration
                  </div>
                </div>
                {this.state.activities.map((activityList) => (
                  <div className="spreadsheet-row" key={activityList.id}>
                    <div className="spreadsheet-cell">
                      {activityList.description}
                    </div>
                    <div className="spreadsheet-cell">
                      {new Intl.DateTimeFormat('en-US', {
                        hour: "2-digit",
                        minute: "2-digit",
                        month: "2-digit",
                        day: "2-digit"
                      }).format(new Date(JSON.parse(activityList.startTime)))}
                    </div>
                    <div className="spreadsheet-cell">
                      {activityList.endTime ? new Intl.DateTimeFormat('en-US', {
                        hour: "2-digit",
                        minute: "2-digit",
                        month: "2-digit",
                        day: "2-digit"
                      }).format(new Date(JSON.parse(activityList.endTime))) : 'Ongoing'}
                    </div>
                    <div className="spreadsheet-cell">
                      {activityList.endTime ? <span>{this.elapsedTime(activityList.startTime, activityList.endTime)}</span> : <Stopwatch startTime={activityList.startTime} />}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="tracker-punchclock">
            <div className="create-activity">
              <h3>Create A New Activity</h3>
              <div className="input-group">
                <label htmlFor="new-activity-description">Enter a Description</label>
                <input type="text" name="new-activity-description" className="input-description" value={this.state.newActivityDescription} onChange={this.handleInputChange} placeholder="Create A New Activity" />
              </div>
              <button className="add-activity" onClick={this.createNewActivity}>Start New Activity</button>
            </div>
            <div className="running-activities">
              <h3>Currently Running</h3>
              <div className="card-grid">
                {this.state.activities.map((activityCard) => (
                  <div className="activity-card" key={activityCard.id}>
                    <div className="description">{activityCard.description}</div>
                    <div className="duration">Duration: {activityCard.endTime ? <span>{this.elapsedTime(activityCard.startTime, activityCard.endTime)}</span> : <Stopwatch startTime={activityCard.startTime} />} </div>
                    <div className="actions">
                        <button className="end-timer" onClick={ () => this.completeActivity(activityCard.id) }>End Activity Timer</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
