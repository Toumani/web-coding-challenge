import React, { Component } from 'react';
import { Thumbnail, Button, Glyphicon } from 'react-bootstrap';

import './Shop.css';

class Shop extends React.Component {
	render() {
		return (
			<Thumbnail src={ this.props.image } alt={ this.props.name }>
				<h3>{ this.props.name }</h3>
				<p>{ this.props.distance } km</p>
				<p className="button-container">
					<Button bsSize="large" onClick={ this.props.liked }>
						<Glyphicon glyph="heart" /> Like
					</Button>
					<Button bsSize="large" onClick={ this.props.disliked }>
						<Glyphicon glyph="thumbs-down" /> Dislike
					</Button>
				</p>
			</Thumbnail>
		);
	}
}

export default Shop;