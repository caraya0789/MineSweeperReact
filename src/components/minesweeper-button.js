import React, { Component } from 'react';

export default class MineSweeperButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			className : 'btn'
		};

		this.buttonClick = this.buttonClick.bind(this);
	}

	render() {
		return <button onClick={this.buttonClick} className={this.state.className}>{this.state.count}</button>;
	}

	buttonClick() {
		let result = this.props.getValue(this.props.row, this.props.col);

		let classes = ['empty', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
		if(result == 'boom') {
			this.setState({
				'className':'btn selected bomb step'
			});
		}
		else if(result != 0) {
			this.setState({
				'count':result,
				'className':'btn selected '+classes[result]
			});
		} else {
			this.setState({
				'className':'btn selected '+classes[result]
			});
		}
	}
}