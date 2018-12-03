// External imports
import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

import $ from "jquery";

// In-app imports
import Shop from './Shop';
import Links from './Links';

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
	 * This function requests by AJAX a list of shops and set the state to the obtained value
	 * A shop is defined by an array of objects containing the id, the name, the distance and the image of the shop
	 * @param {String} shops Accepted values: nearby and favorite
	 */
	getShops(shops) {
		var url = 'http://localhost:9090/';
		var data = "{\
			\"hashcode\": \"b8adf586687809a7d4d6eb61f62549209e218c75\",\
			\"location\": {\
				\"latitude\": 32.288742,\
				\"longitude\": -9.236141\
			}\
		}";
		switch(shops) {
			case 'nearby':
				url += 'shops';
				break;
			case 'favorite':
				url += 'favorite';
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
				this.setState({ shops: response, view: shops });
			},
			error: function(xhr, status, error) {
				console.log("Something went wrong!");
			}
		});
	}

	/**
	 * Requests nearby shops from server
	 */
	getNearbyShops() {
		console.log('Showing nearby shops');
		this.getShops('nearby');
	}

	/**
	 * Requests favorite shops from server
	 */
	getFavoriteShops()  {
		console.log('Showing favorite shops');
		this.getShops('favorite');
	}

	/**
	 * Hadles nearby shops request event
	 */
	getNearbyShopsFromEvent = (e) => {
		this.getNearbyShops();
	}

	/**
	 * Hadles favorite shops request event
	 */
	getFavoriteShopsFromEvent = (e) => {
		this.getFavoriteShops();
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
						removed={ this.getFavoriteShopsFromEvent }

						view={ this.state.view }
						id={ shop.id }
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