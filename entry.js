import './style.css'
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'

class Hello extends React.Component {
	state = {
		show: true
	}
	
	componentWillUpdate(nextProps, nextState){
		$(ReactDOM.findDOMNode(this.refs.elem)).css({
			'opacity': nextState.show ? 0 : 1
		})
	}
	
	toggleHandler = () => this.setState({ show: !this.state.show })
	
	componentDidUpdate(preProps, prevState) {
		$(ReactDOM.findDOMNode(this.refs.elem)).css({
			'opacity': this.state.show ? '1' : '0'
		})
	}
	
	render() {
		const className = this.state.show? "myelem show" : "myelem "
		
		return (
			<div ref="mydom">
				<button  onClick={this.toggleHandler}>
					Click me
				</button>
				<div className={className} ref="elem">
					SHOW
				</div>
			</div>
		)
	}
}

ReactDOM.render(
	<Hello name="World" />,
	document.getElementById('root')
)
