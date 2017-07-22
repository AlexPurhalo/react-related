import React from 'react'
import axios from 'axios'

class ChildComponent extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			message: props.message,
			posts: []
		}
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
			<div>{this.state.message}</div>
		)
	}
}

export default ChildComponent