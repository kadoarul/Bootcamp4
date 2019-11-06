import React from 'react';

export default ({id, code, name, handleSelectedUpdate}) => (
	<tr
		key={id}
		onClick={() => handleSelectedUpdate(id)}
	>
		<td>{code}</td>
		<td>{name}</td>
	</tr>
);