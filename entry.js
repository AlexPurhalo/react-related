import './style.css'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Counter from './content'

class App extends Component {
	//MOUNTING
	state = {
		counter: 0
	}
	
	incrementCounter = () => {
		this.setState({
			counter: ++this.state.counter
		});
	};
	
	render() {
		return (
			<div>
				<Counter counter={this.state.counter} />
				<button onClick={this.incrementCounter}>Click1</button>
			</div>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
)