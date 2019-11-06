import React from 'react';

class RemoveBuilding extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			code: '',
			error: false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.closeButtonRef = React.createRef();
	}

	handleSubmit(event) {
		event.preventDefault();

		const code = this.state.code.toUpperCase();

		const exists = this.props.buildings.find((building, i) => {
			if (building === undefined) {
				console.log('undefined at: ' + i);
				return 0;
			}
			return building.code === code;
		});

		if (exists) {
			this.props.removeBuilding(code);
			this.closeButtonRef.current.click();
			this.setState({ error: false });
			event.target.reset();
		}
		else {
			this.setState({ error: true });
		}
	}

	handleChange(event) {
		this.setState({ code: event.target.value });
	}

	render() {
		return (
			<div
				className="modal fade"
				id="removeBuildingModal"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="removeBuildingModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5
								className="modal-title"
								id="removeBuildingModalLabel"
							>
								Remove Building
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
									No building with this code exists!
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
									></input>
								</div>
								<div className="row justify-content-end">
									<button
										type="submit"
										className="btn btn-danger"
									>
										Remove
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

export default RemoveBuilding;