import React from 'react';

class AddBuilding extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			code: '',
			name: '',
			address: '',
			coordinates: '',
			error: false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.closeButtonRef = React.createRef();
	}

	handleSubmit(event) {
		event.preventDefault();

		const code = this.state.code.toUpperCase();
		const { name, address, coordinates } = this.state;

		const exists = this.props.buildings.find(building => {
			return (building.code === code || building.name === name);
		});

		if (!exists) {
			this.props.addBuilding(code, name, address, coordinates);
			this.closeButtonRef.current.click();
			this.setState({ error: false });
			event.target.reset();
		}
		else {
			this.setState({ error: true });
		}
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	
	render() {
		return (
			<div
				className="modal fade"
				id="addBuildingModal"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="addBuildingModalLabel"
				aria-hidden="true"
			>
				<div
					className="modal-dialog"
					role="document"
				>
					<div className="modal-content">
						<div className="modal-header">
							<h5
								className="modal-title"
								id="addBuildingModalLabel"
							>
								Add Building
							</h5>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
								ref={this.closeButtonRef}
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							{this.state.error &&
								<div
									className="alert alert-danger"
									role="alert"
								>
									A building with this code or name already exists!
								</div>	
							}
							<form onSubmit={this.handleSubmit}>
								<div className="form-group">
									<label
										htmlFor="building-code"
										className="col-form-label required-field"
									>
										Code:
									</label>
									<input
										type="text"
										className="form-control"
										id="building-code"
										name="code"
										onChange={this.handleChange}
										required
										pattern="[a-zA-Z]{3}|[a-zA-Z]{4}"
									></input>
									<small
										id="codeHelpBlock"
										className="form-text text-muted"
									>
										Building codes should be 3-4 characters.
									</small>
								</div>
								<div className="form-group">
									<label
										htmlFor="building-name"
										className="col-form-label required-field"
									>
										Name:
									</label>
									<input
										type="text"
										className="form-control"
										id="building-name"
										name="name"
										onChange={this.handleChange}
										required
									></input>
								</div>
								<div className="form-group">
									<label
										htmlFor="building-address"
										className="col-form-label"
									>
										Address:
									</label>
									<input
										type="text"
										className="form-control"
										id="building-address"
										name="address"
										onChange={this.handleChange}
									></input>
								</div>
								<div className="form-group">
									<label
										htmlFor="building-coordinates"
										className="col-form-label"
									>
										Coordinates:
									</label>
									<input
										type="text"
										className="form-control"
										id="building-coordinates"
										name="coordinates"
										onChange={this.handleChange}
									></input>
								</div>
								<div className="row justify-content-end">
								<button
									type="submit"
									className="btn btn-primary"
								>
									Add
								</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AddBuilding;