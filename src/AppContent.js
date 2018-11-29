import React, { Component } from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';

import Shop from './Shop';
import Links from './Links';

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
		this.getNerbyShops();
	}

	/**
	 * This function request by AJAX this list of nearby shops and set the state to the obtained value
	 * A shop is defined by an array of objects containing the name, the distance and the image of the shop
	 */
	getNerbyShops() {
		// Mocking
		this.setState({ shops:
			[
				{
					name: "Range Motors",
					distance: 12,
					image: "./Range Rover.jpeg"
				},
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

	render() {
		var shops = null;
		if (this.state.shops !== null) {
			shops = this.state.shops.map((shop) =>
				<Col md={ 4 } sm={ 6 } xs={ 12 }>
					<Shop
						name={ shop.name}
						distance={ shop.distance }
						image={ shop.image }
					/>
				</Col>
			);
		}
		return (
			<div>
				<Links />
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