import React, { Component } from 'react';
import Controls from './controls.js';
import MineSweeper from './minesweeper.js';

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			size:'9x9',
			rows:9,
			cols:9
		};
		this.restart = this.restart.bind(this);
	}

  	render() {
	    return (
	    	<div className="app">
		      	<Controls onRestart={this.restart} />
		      	<MineSweeper size={this.state.size} rows={this.state.rows} cols={this.state.cols} />
	      	</div>
	    );
  	}

  	restart(size) {
  		let values = size.split('x');
  		this.setState({
  			size:size,
  			rows:parseInt(values[1]),
  			cols:parseInt(values[0])
  		});
  	}
}
