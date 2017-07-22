import React from 'react'
import axios from 'axios'

class ChildComponent extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			message: props.message,
			posts: [],
			count: 1
		}
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.message !== nextProps.message) {
			return true;
		}
		
		if (this.state.count !== nextState.count) {
			return true
		}
		
		return false
	}
	
	componentWillReceiveProps(nextProps) {
		this.setState({ message: nextProps.message })
	}
	
	componentWillMount() {
		axios.get('https://jsonplaceholder.typicode.com/posts/')
			.then((res) => this.setState({ posts: res.data }))
	}
	
	render() {
		return (
			<div>
				<button
					onClick={() => this.setState(state => ({count: state.count + 1}))}
				>
					More!!!
				</button>
				<h5>Counter: {this.state.count}</h5>
				<h4>
					{this.state.message}
				</h4>
			</div>
		)
	}
}

export default ChildComponent