import React, { Component } from 'react';
import Row from './minesweeper-row.js';

export default class MineSweeper extends Component {
	constructor(props) {
		super(props);

		this.rows = [];

		this.gameLogic = [];

		this.getValue = this.getValue.bind(this);
	}

	render() {
		this.rows = Array.apply(null, Array(parseInt(this.props.rows))).map((e,i) => {
			return <Row getValue={this.getValue} key={i} row={i} cols={this.props.cols} />;
		});

		let className = 'game s'+this.props.size;

		this.regenerateMines();

		return (
			<div className={className}>
				{this.rows}
	      	</div>
      	);
	}

	regenerateMines() {
		this.gameLogic = Array.apply(null, Array(parseInt(this.props.rows))).map((e,i) => {
			return Array.apply(null, Array(parseInt(this.props.cols))).map((e,i) => {
				return 0;
			});
		});

		let totalButtons = parseInt(this.props.rows) * parseInt(this.props.cols);
		let mines = Math.floor(totalButtons * 0.2);

		for(let i = 0; i < mines; i++) {
			let currentValue = 1;
			while(currentValue == 1) {
				let randRow = this.random(parseInt(this.props.rows));
				let randCol = this.random(parseInt(this.props.cols));

				currentValue = this.gameLogic[randRow][randCol];

				if(currentValue == 0) 
					this.gameLogic[randRow][randCol] = 1;
			}	
		}

		console.table(this.gameLogic);
	}

	random(max) {
		let min = 0;
		max = max - 1;
	    return Math.floor(Math.random()*(max-min+1)+min);
	}

	getValue(row, col) {
		if(this.gameLogic[row][col] == 1) {
			return 'boom';
		} else {
			let siblings = this.getSiblings(row, col);
			let count = 0;
			console.log(siblings);
			for(let i in siblings) {
				if(siblings[i] == 1)
					count++;
			}

			return count;
		}
	}

	getSiblings(row, col) {
		console.log(row, col);
		let siblings = [];
		if(col != 0) {
			console.log('col != 0');
			siblings.push(this.gameLogic[row][col - 1]);
			console.log(this.gameLogic[row][col - 1]);
		}
		if(col != (parseInt(this.props.cols) - 1)) {
			console.log('col != last');
			siblings.push(this.gameLogic[row][col + 1]);
			console.log(this.gameLogic[row][col + 1]);
		}
		if(row != 0 && col != (parseInt(this.props.cols) - 1)) {
			console.log('row != 0 && col != last');
			siblings.push(this.gameLogic[row - 1][col + 1]);
			console.log(this.gameLogic[row - 1][col + 1]);
		}
		if(row != 0) {
			console.log('row != 0');
			siblings.push(this.gameLogic[row - 1][col]);
			console.log(this.gameLogic[row - 1][col]);
		}
		if(row != 0 && col != 0) {
			console.log('row != 0 && col != 0');
			siblings.push(this.gameLogic[row - 1][col - 1]);
			console.log(this.gameLogic[row - 1][col - 1]);
		}
		if(row != (parseInt(this.props.rows) - 1) && col != (parseInt(this.props.cols) - 1)) {
			console.log('row != last && col != last');
			siblings.push(this.gameLogic[row + 1][col + 1]);
			console.log(this.gameLogic[row + 1][col + 1]);
		}
		if(row != (parseInt(this.props.rows) - 1)) {
			console.log('row != last');
			siblings.push(this.gameLogic[row + 1][col]);
			console.log(this.gameLogic[row + 1][col]);
		}
		if(row != (parseInt(this.props.rows) - 1) && col != 0) {
			console.log('row != last && col != 0');
			siblings.push(this.gameLogic[row + 1][col - 1]);
			console.log(this.gameLogic[row + 1][col - 1]);
		}
		return siblings;
	}
}