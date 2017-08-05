import React, { Component } from 'react';
import {
  Row,
  Col,
  Button,
  FormGroup,
  FormControl,
  } from 'react-bootstrap';


class Player {
  constructor() {
    this.cooperationLiklihood = Math.random();
    this.value = 0;
  }
}


class Podcasts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      populationSize: 10,
      population: []
    };
    this.timer = null;
    this.game = 0;
  }

  spawnPopulation() {
    const population = [];
    for (let i = 0; i < this.state.populationSize; i++) {
      population.push(new Player());
    }
    this.setState({population});
  }

  tick() {
    if (this.state.population.length === 0) this.spawnPopulation();
    console.log('.');
    // put cooperation/betrayal logic here
    const {population} = this.state;
    let a, b;
    for (let i = 0; i < population.length; i++) {
      if (i === population.length - 1) break;
      a = population[i].cooperationLiklihood > Math.random() ? 1 : -1;
      b = population[i+1].cooperationLiklihood > Math.random() ? 1 : -1;
      if (a > b) {
        population[i+1].value += 2;
      }
      if (b > a) {
        population[i].value += 2;
      }
      if (b === a && a === 1) {
        population[i].value += 1.5;
        population[i+1].value += 1.5;
      }
      if (b === a && a === -1) {
        // nobody gets anything
      }
    }
    this.game++;
    this.setState({population});
  }

  handleChange(e) {
    e.preventDefault();
    console.log('handleChange', e);
    this.setState({populationSize: parseInt(e.target.value) || 0});
  }

  start(e) {
    e.preventDefault();
    console.log('start');
    if (this.timer) return;
    this.timer = setInterval(() => this.tick(), 1000);
  }

  pause(e) {
    e.preventDefault();
    console.log('pause');
    clearTimeout(this.timer);
    this.timer = null;
  }

  reset(e) {
    e.preventDefault();
    console.log('reset');
    clearTimeout(this.timer);
    this.timer = null;
    this.game = 0;
    this.setState({population: []});
  }

  renderCooperationChart() {
    return <div>
      <h2>Game { this.game }</h2>
      {
        this.state.population.map((n) => {
        return (
            <div 
              key={ n.cooperationLiklihood }
              style={{background: `rgb(${n.cooperationLiklihood * 255 | 0},255,255)`}}>
              [ { n.cooperationLiklihood } ] { n.value }
            </div>
          )
        })
      }
    </div>
  }

  render() {
    return (
      <div className="Simulation">
        <h2>Simulation</h2>
        <FormGroup controlId='add-podcast' >
          <Row>
            <Col xs={ 12 } md={ 8 }>
              <FormControl
                type="text"
                name="population-size"
                value={ this.state.populationSize }
                placeholder="Add a podcast URL"
                onChange={ (e) => this.handleChange(e) }
              />
            </Col>
            <Col xs={ 12 } md={ 2 }>
              <Button block onClick={(e) => this.reset(e) } >Reset</Button>
            </Col>
            <Col xs={ 12 } md={ 1 }>
              <Button block onClick={(e) => this.pause(e) } >Pause</Button>
            </Col>
            <Col xs={ 12 } md={ 1 }>
              <Button block onClick={(e) => this.start(e) } >Start</Button>
            </Col>
          </Row>
        </FormGroup>
        <Row><Col xs={12}>{ this.renderCooperationChart() }</Col></Row>
      </div>
    );
  }
}

export default Podcasts;
