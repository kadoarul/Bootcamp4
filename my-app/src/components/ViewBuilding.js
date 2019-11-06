import React from 'react';

class ViewBuilding extends React.Component {
	render() {
		const { buildings, selectedBuilding, selectedUpdate } = this.props;

		const buildingInfo = buildings.filter(building => {
			return building.id === selectedBuilding;
		})
		.map(building => {
			var hasAddress = false;
			var hasCoordinates = false;

			if (building.address && (building.address !== '')) {
				hasAddress = true;
				var addressURL = "https://www.google.com/maps/search/?api=1&query=" + building.address.split(' ').join('+');
			}

			if (building.coordinates && building.coordinates.latitude !== '' && building.coordinates.longitude !== '') {
				hasCoordinates = true;
				var coordinatesURL = "https://www.google.com/maps/search/?api=1&query=" + building.coordinates.latitude + "," + building.coordinates.longitude;
			}

			return (
				<div
					key={building.id}
					className="card bg-light"
				>
					<h5 className="card-header">
						Building Information
						<button
							type="button"
							className="close"
							aria-label="Close"
							onClick={() => selectedUpdate(0)}
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</h5>
					<div className="card-body">
						<p className="card-text">Code: {building.code}</p>
						<p className="card-text">Name: {building.name}</p>
						{hasAddress && <p className="card-text">Address: <a href={addressURL} rel="noopener noreferrer" target="_blank">{building.address}</a></p>}
						{hasCoordinates && <p className="card-text">Coordinates: <a href={coordinatesURL} rel="noopener noreferrer" target="_blank">{building.coordinates.latitude}, {building.coordinates.longitude}</a></p> }
					</div>
				</div>
			);
		});

		return (
			<div>
				{selectedBuilding ?
					<div>
						{buildingInfo}
					</div> :
					<p className="info-text">
						<i>Click on a name to view more information</i>
					</p>
				}
			</div>
		);
	}
}

export default ViewBuilding;