import React, { Component } from 'react';

export default class Controls extends Component {

	constructor(props) {
		super(props);

		this.restart = this.restart.bind(this);
	}

	render() {
		return (
			<div className="controls form-inline">
	      		<div className="form-group">
		      		<select ref={select => this.sizeSelected = select} className="form-control">
		      			<option>9x9</option>
		      			<option>16x16</option>
		      			<option>16x30</option>
		      			<option>30x30</option>
		      		</select>
		      		<button onClick={this.restart} className="btn btn-primary">Restart</button>
	      		</div>
	      	</div>
		);
	}

	restart() {
		this.props.onRestart(this.sizeSelected.value);
	}
}