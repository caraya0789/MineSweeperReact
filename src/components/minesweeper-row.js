import React, { Component } from 'react';
import Button from './minesweeper-button.js';

export default class MineSweeperRow extends Component {

	render() {
		this.buttons = Array.apply(null, Array(parseInt(this.props.cols))).map((e,i) => {
			return <Button getValue={this.props.getValue} key={(new Date()).getTime() + '' + i} col={i} row={this.props.row} />;
		});

		return (
      		<div className="minerow">
      			{this.buttons}
      		</div>
      	);
	}
}