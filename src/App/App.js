import React, { Component } from 'react';
import './App.css';
import ResyTile from '../ResyTile/ResyTile';
import Form from '../Form/Form';

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

  addResy = (newResy) => {
    console.log(newResy)
    this.setState({ reservations: [...this.state.reservations, newResy]})
    fetch('http://localhost:3001/api/v1/reservations', {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(newResy)
    })
    .then(response => response.json())
    .then(data => console.log(data))
  }

  cancelResy = (id) => {
    const newResyList = this.state.reservations.filter(resy => resy.id !== id)
    this.setState({reservations: newResyList})
  }

  render() {
    return (
      <div className="App">
        <h1 className='app-title'>Turing Cafe Reservations</h1>
        <div className='resy-form'>
          <Form addResy={this.addResy} />
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
