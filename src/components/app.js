import React, { Component } from 'react';
import Controls from './controls.js';
import MineSweeper from './minesweeper.js';

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			lost:false,
			size:'9x9',
			rows:9,
			cols:9,
			time:(new Date()).getTime(),
			buttons: Array.apply(null, Array(9)).map((e,i) => {
				return Array.apply(null, Array(9)).map((e,i) => {
					return {
						selected:0,
						count:'',
						step:0,
						bomb:0,
						flag:0,
						wrong:0
					};
				});
			})
		};

		this.restart = this.restart.bind(this);
		this.buttonClick = this.buttonClick.bind(this);

		this.regenerateMines(this.state.rows, this.state.cols);
	}

  	render() {
	    return (
	    	<div className="app">
		      	<Controls onRestart={this.restart} />
		      	<MineSweeper onClick={this.buttonClick} buttons={this.state.buttons} size={this.state.size} rows={this.state.rows} cols={this.state.cols} />
	      	</div>
	    );
  	}

  	regenerateMines(rows, cols) {
  		this.gameLogic = Array.apply(null, Array(rows)).map((e,i) => {
			return Array.apply(null, Array(cols)).map((e,i) => {
				return 0;
			});
		});

		let totalButtons = rows * cols;
		this.mines = Math.floor(totalButtons * 0.2);

		for(let i = 0; i < this.mines; i++) {
			let currentValue = 1;
			while(currentValue == 1) {
				let randRow = this.random(rows);
				let randCol = this.random(cols);

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

  	restart(size) {
  		let values = size.split('x');

  		this.regenerateMines(parseInt(values[1]), parseInt(values[0]));

  		this.setState({
  			lost:false,
  			size:size,
  			rows:parseInt(values[1]),
  			cols:parseInt(values[0]),
  			time:(new Date()).getTime(),
  			buttons: Array.apply(null, Array(parseInt(values[1]))).map((e,i) => {
				return Array.apply(null, Array(parseInt(values[0]))).map((e,i) => {
					return {
						selected:0
					};
				});
			})
  		});
  	}

	buttonClick(row, col, flag) {
		if(this.state.lost) 
			return;

		let lost = false;
		let buttons = this.state.buttons;

		if(flag) {
			if(buttons[row][col].selected == 1)
				return;

			buttons[row][col].flag = (buttons[row][col].flag == 1) ? 0 : 1;
			
			return this.setState({
				lost:lost,
				buttons:buttons
			});	
		} else if(buttons[row][col].flag == 1) 
			return;

		if(this.gameLogic[row][col] == 1) {
			lost = true;

			buttons[row][col].selected = 1;
			buttons[row][col].step = 1;
			buttons[row][col].bomb = 1;

			for(let rowi in buttons) {
				for(let coli in buttons) {
					if(buttons[rowi][coli].selected == 0 && this.gameLogic[rowi][coli] == 1) {
						console.log(buttons[rowi][coli]);
						if(buttons[rowi][coli].flag == 1)
							buttons[rowi][coli].flag = 0;
						buttons[rowi][coli].bomb = 1;
					}
					if(buttons[rowi][coli].flag == 1 && this.gameLogic[rowi][coli] != 1) {
						buttons[rowi][coli].flag = 0;
						buttons[rowi][coli].wrong = 1;
						buttons[rowi][coli].bomb = 1;
					}
				}
			}
		} else {
			let siblings = this.getSiblings(row, col);
			if(buttons[row][col].selected == 1) {
				console.log(buttons[row][col]);
				let flagged = 0;
				for(let i in siblings) {
					if(buttons[siblings[i][0]][siblings[i][1]].flag == 1)
						flagged++;
				}
				console.log(flagged, buttons[row][col].count);
			} else {
				let count = 0;
				for(let i in siblings) {
					if(this.gameLogic[siblings[i][0]][siblings[i][1]] == 1)
						count++;
				}

				if(count == 0) {
					buttons[row][col].selected = 1;
					for(let i in siblings) 
						buttons = this.unmaskSiblings(buttons, siblings[i][0], siblings[i][1]);
				} else {
					buttons[row][col].selected = 1;
					buttons[row][col].count = count;
				}
			}
		}

		let unselected = 0;
		for(let rowi in buttons) {
			for(let coli in buttons) {
				if(buttons[rowi][coli].selected == 0) {
					unselected++;
				}
			}
		}

		if(this.mines == unselected) {
			for(let rowi in buttons) {
				for(let coli in buttons) {
					if(buttons[rowi][coli].selected == 0 && this.gameLogic[rowi][coli] == 1) {
						buttons[rowi][coli].bomb = 1;
					}
				}
			}
		}

		this.setState({
			lost:lost,
			buttons:buttons
		});	
	}

	getSiblings(row, col) {
		let siblings = [];
		if(col != 0) 
			siblings.push([row, col - 1]);
		if(col != (parseInt(this.state.cols) - 1))
			siblings.push([row, col + 1]);
		if(row != 0 && col != (parseInt(this.state.cols) - 1))
			siblings.push([row - 1, col + 1]);
		if(row != 0)
			siblings.push([row - 1, col]);
		if(row != 0 && col != 0)
			siblings.push([row - 1, col - 1]);
		if(row != (parseInt(this.state.rows) - 1) && col != (parseInt(this.state.cols) - 1))
			siblings.push([row + 1, col + 1]);
		if(row != (parseInt(this.state.rows) - 1))
			siblings.push([row + 1, col]);
		if(row != (parseInt(this.state.rows) - 1) && col != 0)
			siblings.push([row + 1, col - 1]);
		return siblings;
	}

	unmaskSiblings(buttons, row, col) {
		if(this.gameLogic[row][col] == 1 || buttons[row][col].selected == 1 || buttons[row][col].flag == 1) {
			return buttons;
		}

		let siblings = this.getSiblings(row, col);
		let count = 0;
		for(let i in siblings) {
			if(this.gameLogic[siblings[i][0]][siblings[i][1]] == 1)
				count++;
		}

		if(count == 0) {
			buttons[row][col].selected = 1;

			for(let i in siblings) {
				buttons = this.unmaskSiblings(buttons, siblings[i][0], siblings[i][1]);
			}
		} else {
			buttons[row][col].selected = 1;
			buttons[row][col].count = count;
		}

		return buttons;
	}
}
