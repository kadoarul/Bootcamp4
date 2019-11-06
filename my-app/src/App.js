import React from 'react';
import Search from './components/Search';
import ViewBuilding from './components/ViewBuilding';
import BuildingList from './components/BuildingList';
import Credit from './components/Credit';
import AddBuilding from './components/AddBuilding';
import RemoveBuilding from './components/RemoveBuilding';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      selectedBuilding: 0,
      buildings: this.props.data
    };
    this.filterUpdate = this.filterUpdate.bind(this);
    this.selectedUpdate = this.selectedUpdate.bind(this);
    this.addBuilding = this.addBuilding.bind(this);
    this.removeBuilding = this.removeBuilding.bind(this);
  }

  filterUpdate(value) {
    this.setState({ filterText: value });
  }

  selectedUpdate(id) {
    this.setState({ selectedBuilding: id });
  }

  addBuilding(code, name, address, coordinates) {
    var newBuildings = this.state.buildings.concat({
      code: code,
      name: name,
      address: address,
      coordinates: coordinates
    });

    newBuildings.sort((a, b) => {
      if (a.code < b.code) {
        return -1;
      }
      if (a.code > b.code) {
        return 1;
      }
      return 0;
    })
    .forEach((building, i) => {
      building.id = i + 1;
    });

    this.setState({ buildings: newBuildings });
  }

  removeBuilding(code) {
    const index = this.state.buildings.findIndex(building => {
      return building.code === code;
    });

    // check if 'selectedBuilding' is the same as the building being removed
    // if so, change 'selectedBuilding' to 0 to stop viewing building information
    if (this.state.selectedBuilding === index + 1) {
      this.setState({ selectedBuilding: 0 });
    }

    const newBuildings = [
      ...this.state.buildings.slice(0, index),
      ...this.state.buildings.slice(index + 1)
    ];

    newBuildings.forEach((building, i) => {
      building.id = i + 1;
    });

    this.setState({ buildings: newBuildings });
  }

  render() {
    return(
      <div className="bg">
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="/">UF Directory App</a>
        </nav>
        <Search
          filterText={this.state.filterText}
          filterUpdate={this.filterUpdate}
        />
        <main>
          <div className="row">
            <div className="column1">
              <div className="row">
                <div className="col-2">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#addBuildingModal"
                  >
                    Add Building
                  </button>
                </div>
                <div className="col-2">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-toggle="modal"
                    data-target="#removeBuildingModal"
                  >
                    Remove Building
                  </button>
                </div>
              </div>
              <AddBuilding
                buildings={this.state.buildings}
                addBuilding={this.addBuilding}
              />
              <RemoveBuilding
                buildings={this.state.buildings}
                removeBuilding={this.removeBuilding}
              />
              <div className="tableWrapper">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Building</th>
                    </tr>
                  </thead>
                  <BuildingList
                    buildings={this.state.buildings}
                    filterText={this.state.filterText}
                    selectedUpdate={this.selectedUpdate}
                  />
                </table>
              </div>
            </div>
            <div className="column2">
              <ViewBuilding
                buildings={this.state.buildings}
                selectedBuilding={this.state.selectedBuilding}
                selectedUpdate={this.selectedUpdate}
              />
            </div>
          </div>
          <Credit />
        </main>
      </div>
    );
  }
}

export default App;