import React from 'react';
import Building from './Building';

class BuildingList extends React.Component {
	selectedUpdate(id) {
		this.props.selectedUpdate(id);
	}

	render() {
		const { buildings, filterText } = this.props;

		const buildingList = buildings.filter(building => {
			return (building.name.toLowerCase().indexOf(filterText.toLowerCase()) >= 0) || (building.code.indexOf(filterText.toUpperCase()) >= 0);
		})
		.map((directory, i) => {
			return (
				<Building
					key={i}
					id={directory.id}
					code={directory.code}
					name={directory.name}
					handleSelectedUpdate={(id) => this.selectedUpdate(id)}
				/>
			);
		});

		return <tbody>{buildingList}</tbody>;
	}
}

export default BuildingList;