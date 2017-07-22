import React from 'react'

class ChildComponent extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = { message: props.message }
	}
	
	componentWillReceiveProps(nextProps) {
		this.setState({ message: nextProps.message })
	}
	
	
	render() {
		return (
			<div>{this.state.message}</div>
		)
	}
}

export default ChildComponent