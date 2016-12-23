import React, { Component } from 'react';
import Row from './minesweeper-row.js';

export default class MineSweeper extends Component {
	constructor(props) {
		super(props);

		this.rows = [];
		this.gameLogic = [];
		// this.buttonClick = this.buttonClick.bind(this);
	}

	render() {
		this.rows = this.props.buttons.map((e,i) => {
			return <Row buttons={e} onClick={this.props.onClick} time={this.props.time} key={this.props.time + 'r' + i} row={i} cols={this.props.cols} />;
		});

		let className = 'game s'+this.props.size;

		return (
			<div className={className}>
				{this.rows}
	      	</div>
      	);
	}

	unmaskSiblings() {

	}
}