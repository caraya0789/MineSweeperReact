import React, { Component } from 'react';
import Button from './minesweeper-button.js';

export default class MineSweeperRow extends Component {

	render() {
		this.buttons = this.props.buttons.map((e,i) => {
			return <Button button={e} onClick={this.props.onClick} key={this.props.time + 'b' + i} col={i} row={this.props.row} />;
		});

		return (
      		<div className="minerow">
      			{this.buttons}
      		</div>
      	);
	}
}