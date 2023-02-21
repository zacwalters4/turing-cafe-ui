import React, { Component } from 'react';
import './App.css';
import ResyTile from '../ResyTile/ResyTile'

class App extends Component {
  constructor() {
    super()
    this.state = {
      reservations: []
    }
  }
  componentDidMount = () => {
    fetch('http://localhost:3001/api/v1/reservations')
      .then(response => response.json())
      .then(data => this.setState({ reservations: [...data] }))
  }

  cancelResy = (id) => {
    const newResyList = this.state.reservations.filter(resy => resy.id != id)
    this.setState({reservations: newResyList})
  }

  render() {
    return (
      <div className="App">
        <h1 className='app-title'>Turing Cafe Reservations</h1>
        <div className='resy-form'>

        </div>
        <div className='resy-container'>
          {this.state.reservations.map((resy, index) => {
            return (<ResyTile key={index} reservation={resy} cancelResy={this.cancelResy}/>)
          })}
        </div>
      </div>
    )
  }
}

export default App;
