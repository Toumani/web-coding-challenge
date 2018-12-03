import React, { Component } from 'react';
import { Thumbnail, Button, Glyphicon } from 'react-bootstrap';

import './Shop.css';

import $ from "jquery";

class Shop extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			view: this.props.view
		}
	}

	likeShop = (e) => {
		console.log("Like event sent");
		var data = "{\
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
		}";
		$.ajax({
			type: 'POST',
			url: "http://localhost:9090/like",
			processData: false,
			data: data,
			headers: {
				"Content-Type": "application/json"
			},
			dataType: 'JSON',
			encode: true,
			success: (response, status, xhr) => {
				console.log("Liking shop with id: " + this.props.id);
				console.log(response);
				// this.setState({ shops: response, view: 'favorite' });
				this.props.liked();
			},
			error: function(xhr, status, error) {
				console.log("Something went wrong!");
			}
		});
	}

	dislikeShop = (e) => {
		console.log("Dislike event sent");
		var data = "{\
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
		}";
		$.ajax({
			type: 'POST',
			url: "http://localhost:9090/dislike",
			processData: false,
			data: data,
			headers: {
				"Content-Type": "application/json"
			},
			dataType: 'JSON',
			encode: true,
			success: (response, status, xhr) => {
				console.log("Disliking shop with id: " + this.props.id);
				console.log(response);
				// this.setState({ shops: response, view: 'favorite' });
				this.props.disliked();
			},
			error: function(xhr, status, error) {
				console.log("Something went wrong!");
			}
		});
	}

	removeShop = (e) => {
		console.log("Remove event sent");
		var data = "{\
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
		}";
		$.ajax({
			type: 'POST',
			url: "http://localhost:9090/remove",
			processData: false,
			data: data,
			headers: {
				"Content-Type": "application/json"
			},
			dataType: 'JSON',
			encode: true,
			success: (response, status, xhr) => {
				console.log("Removing shop with id: " + this.props.id);
				console.log(response);
				// this.setState({ shops: response, view: 'favorite' });
				this.props.removed();
			},
			error: function(xhr, status, error) {
				console.log("Something went wrong!");
			}
		});
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