import './style.css'
import React from 'react';
import ReactDOM from 'react-dom';

import ChildComponent from './content'

class App extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = { message: 'Stars comes closer when you will come to place' }
	}
	render() {
		console.log(this.state.message)
		return (
			<div>
				<button onClick={() => this.setState({ message: "Booom!" })}>Destroy message</button>
				<ChildComponent message={this.state.message} />
			</div>
		)
	}
}
ReactDOM.render(
	<App />,
	document.getElementById('root')
);