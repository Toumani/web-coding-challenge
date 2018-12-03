import React, { Component } from 'react';
import { Thumbnail, Button, Glyphicon } from 'react-bootstrap';

import './Shop.css';

class Shop extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			view: this.props.view
		}
	}
	render() {
		var buttonContainer;
		if (this.props.view === 'nearby')
			buttonContainer = (
				<p className="button-container">
					<Button bsSize="large" onClick={ this.props.liked }>
						<Glyphicon glyph="heart" /> Like
					</Button>
					<Button bsSize="large" onClick={ this.props.disliked }>
						<Glyphicon glyph="thumbs-down" /> Dislike
					</Button>
				</p>
			);
		else {
			buttonContainer = (
				<p className="button-container">
					<Button bsSize="large" onClick={ this.props.liked }>
						<Glyphicon glyph="minus" /> Remove
					</Button>
				</p>
			)
		}
		return (
			<Thumbnail src={ this.props.image } alt={ this.props.name }>
				<h3>{ this.props.name }</h3>
				<p>{ this.props.distance } km</p>
				{ buttonContainer }
			</Thumbnail>
		);
	}
}

export default Shop;