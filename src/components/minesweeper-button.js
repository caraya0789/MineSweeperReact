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
		let classes = ['btn'];
		let numClasses = ['empty', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

		if(this.props.button.selected == 1) {
			classes.push('selected');
		}

		if(this.props.button.count != 0) {
			classes.push(numClasses[this.props.button.count]);
		}

		if(this.props.button.bomb == 1) {
			classes.push('bomb');
		}

		if(this.props.button.step == 1) {
			classes.push('step');
		}

		if(this.props.button.flag == 1) {
			classes.push('flag');
		}

		if(this.props.button.wrong == 1) {
			classes.push('wrong');
		}

		return <button onClick={this.buttonClick} onContextMenu={this.buttonClick} className={classes.join(' ')}>{this.props.button.count}</button>;
	}

	buttonClick(e) {
		let flag = false;
		if(e.type == 'contextmenu') {
			e.preventDefault();
			flag = true;
		}
		this.props.onClick(this.props.row, this.props.col, flag);
	}
}