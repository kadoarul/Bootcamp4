import React from 'react';

class Search extends React.Component {
	filterUpdate() {
		const val = this.filterValue.value;
		this.props.filterUpdate(val);
	}

	render() {
		return (
			<form>
				<input
					type="text"
					className="searchbar"
					ref={ (value) => { this.filterValue = value } }
					placeholder="Type to filter..."
					onChange={this.filterUpdate.bind(this)}
				/>
			</form>
		);
	}
}

export default Search;