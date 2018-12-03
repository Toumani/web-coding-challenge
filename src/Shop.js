// External imports
import React, { Component } from 'react';
import { Thumbnail, Button, Glyphicon } from 'react-bootstrap';

import $ from "jquery";

import * as cookie from './cookies';

// In-app imports
import './Shop.css';

class Shop extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			view: this.props.view
		}
	}
	/**
	 * Called at any interaction with a shop
	 * @param interaction enum { 'like', 'dislike', 'remove' }
	 */
	interactWithShop(interaction) {
		var url = 'http://localhost:9090/';
		var hashcode = cookie.readCookie('hashcode');
		cookie.setCookie('hashcode', hashcode, 60); // Extending cookie timeout
		var data = JSON.stringify({
			hashcode: hashcode,
			shop: {
				id: this.props.id,
				name: "",
				image: "",
				location: {
					latitude: 0.0,
					longitude: 0.0
				}
			}
		});
		/* var data = "{\
			\"hashcode\": \"b8adf586687809a7d4d6eb61f62549209e218c75\",\
			\"shop\": {\
				\"id\": " + this.props.id + ",\
				\"name\": \"\",\
				\"image\": \"\",\
				\"location\": {\
					\"latitude\": 0.0,\
					\"longitude\": 0.0\
				}\
			}\
		}"; */
		var afterwards;
		switch (interaction) {
			case 'like': // Like
				url += 'like';
				afterwards = this.props.liked;
				break;
			case 'dislike': // Dislike
				url += 'dislike';
				afterwards = this.props.disliked;
				break;
			case 'remove': // Remove from favorite
				url += 'remove';
				afterwards = this.props.removed;
				break;
			default:
				break;
		}
		$.ajax({
			type: 'POST',
			url: url,
			processData: false,
			data: data,
			headers: {
				"Content-Type": "application/json"
			},
			dataType: 'JSON',
			encode: true,
			success: (response, status, xhr) => {
				console.log(url);
				afterwards();
			},
			error: function(xhr, status, error) {
				console.log("Something went wrong!");
			}
		});
	}
	/**
	 * Handles like event
	 */
	likeShop = (e) => {
		console.log("Like event sent");
		this.interactWithShop('like');
	}

	/**
	 * Handles dislike event
	 */
	dislikeShop = (e) => {
		console.log("Dislike event sent");
		this.interactWithShop('dislike');
	}

	/**
	 * Handles remove event
	 */
	removeShop = (e) => {
		console.log("Remove event sent");
		this.interactWithShop('remove');
	}

	render() {
		var buttonContainer;
		if (this.props.view === 'nearby')
			buttonContainer = (
				<p className="button-container">
					<Button bsSize="large" onClick={ this.likeShop }>
						<Glyphicon glyph="heart" /> Like
					</Button>
					<Button bsSize="large" onClick={ this.dislikeShop }>
						<Glyphicon glyph="thumbs-down" /> Dislike
					</Button>
				</p>
			);
		else {
			buttonContainer = (
				<p className="button-container">
					<Button bsSize="large" onClick={ this.removeShop }>
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