import React, { Component } from 'react';
import { Button, Grid, Row, Col, PageHeader } from 'react-bootstrap';

import Shop from './Shop';
import Links from './Links';


import $ from "jquery";

class AppContent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			shops: null,
			view: 'nearby'
		}
	}

	/**
	 * Initialize the shop list
	 */
	componentDidMount() {
		this.getNearbyShops();
	}

	/**
	 * This function request by AJAX this list of nearby shops and set the state to the obtained value
	 * A shop is defined by an array of objects containing the name, the distance and the image of the shop
	 */
	getNearbyShops() {
		var data = "{\
			\"hashcode\": \"b8adf586687809a7d4d6eb61f62549209e218c75\",\
			\"location\": {\
				\"latitude\": 32.288742,\
				\"longitude\": -9.236141\
			}\
		}";
		$.ajax({
			type: 'POST',
			url: "http://localhost:9090/shops",
			processData: false,
			data: data,
			headers: {
				"Content-Type": "application/json"
			},
			dataType: 'JSON',
			encode: true,
			success: (response, status, xhr) => {
				console.log("Fine");
				console.log(response);
				this.setState({ shops: response, view: 'nearby' });
			},
			error: function(xhr, status, error) {
				console.log("Something went wrong!");
			}
		});
	}

	getNearbyShopsFromEvent = (e) => {
		this.getNearbyShops();
	}

	getFavoriteShopsFromEvent = (e) => {
		this.getFavoriteShops();
	}

	/**
	 * This is a debugging function. Acutally, server handles refleshed list
	 */
	getRefreshedNearbyShops = (e) => {
		// Mocking
		this.setState({ shops:
			[
				{
					name: "Range Motors",
					distance: 12,
					image: "./Range Rover.jpeg"
				}
			]
		});
	}

	/**
	 * Request favorite shops from server
	 */
	getFavoriteShops = (e) => {
		var data = "{\
			\"hashcode\": \"b8adf586687809a7d4d6eb61f62549209e218c75\",\
			\"location\": {\
				\"latitude\": 32.288742,\
				\"longitude\": -9.236141\
			}\
		}";
		$.ajax({
			type: 'POST',
			url: "http://localhost:9090/favorite",
			processData: false,
			data: data,
			headers: {
				"Content-Type": "application/json"
			},
			dataType: 'JSON',
			encode: true,
			success: (response, status, xhr) => {
				console.log("Fine");
				console.log(response);
				this.setState({ shops: response, view: 'favorite' });
			},
			error: function(xhr, status, error) {
				console.log("Something went wrong!");
			}
		});
	}

	render() {
		var shops = null;
		if (this.state.shops !== null) {
			shops = this.state.shops.map((shop) =>
				<Col md={ 4 } sm={ 6 } xs={ 12 }>
					<Shop
						name={ shop.name }
						distance={ Math.round(shop.distanceToUser*10)/10 }
						image={ shop.image }

						liked={ this.getNearbyShopsFromEvent }
						disliked={ this.getNearbyShopsFromEvent }

						view={ this.state.view }
					/>
				</Col>
			);
		}
		return (
			<div>
				<PageHeader>
					{ this.state.view === 'nearby' ? 'Nearest shops. Favorite and disliked aren\'t shown' : 'Favorite shops' }
				</PageHeader>
				<Links nearby={ this.getNearbyShopsFromEvent } favorite={ this.getFavoriteShopsFromEvent }/>
				<Grid>
					<Row>
						{ shops }
					</Row>
				</Grid>
			</div>
		);
	}
}

export default AppContent;