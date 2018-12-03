import React, { Component } from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';

import Shop from './Shop';
import Links from './Links';


import $ from "jquery";

class AppContent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			shops: null
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
		// var data = {};
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
			success: function(response, status, xhr) {
				console.log("Fine");
				this.setState({ shops: response });
			},
			error: function(xhr, status, error) {
			  console.log("Something went wrong!");
			}
		  });

		var settings1 = {
			"async": true,
			"crossDomain": true,
			"url": "http://localhost:9090/shops",
			"method": "POST",
			"headers": {
			  "Content-Type": "application/json",
			  "cache-control": "no-cache",
			},
			"data": {
				hashcode: "b8adf586687809a7d4d6eb61f62549209e218c75",
				location: {
					latitude: 32.288742,
					longitude: -9.236141
				}
			},
			"success": function(response) {
				console.log('Done');
				console.log(response);
			},
			"error": function (xhr, status, error) {
				console.log('No way! Why isn\'t that sh*t working !!!');
			}
		  }
	}

	/**
	 * This is a debugging function. Acutally, server handles refleshed list
	 */
	getRefreshedNearbyShops = (e) => {
		// Mocking
		this.setState({ shops:
			[
				{
					name: "Strings",
					distance: 7,
					image: "./Strings.jpg"
				},
				{
					name: "Wind",
					distance: 17,
					image: "./Strings.jpg"
				}
			]
		});
	}

	/**
	 * Request favorite shops from server
	 */
	getRefreshedFavoriteShops = (e) => {
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

	render() {
		var shops = null;
		if (this.state.shops !== null) {
			shops = this.state.shops.map((shop) =>
				<Col md={ 4 } sm={ 6 } xs={ 12 }>
					<Shop
						name={ shop.name}
						distance={ shop.distance }
						image={ shop.image }

						liked={ this.getRefreshedNearbyShops }
						disliked={ this.getRefreshedNearbyShops }
					/>
				</Col>
			);
		}
		return (
			<div>
				<Links nearby={ this.getRefreshedNearbyShops } favorite={ this.getRefreshedFavoriteShops }/>
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