import React, {Component} from 'react'
import styles from './addTaskStyle'
import InputText from '../../atoms/form/InputText/index'
import ButtonSubmit from '../../atoms/form/ButtonSubmit/index'

const inputStyle = {
	width: '100%',
	border: 'none'
}

class AddTask extends Component {
	constructor(props) {
		super(props)

		this.state = {
			title: '',
			subTitle: '',
			labels: ['code'],
			status: 'todo',
			billable: false,
		}

		this.returnTypedValue = this.returnTypedValue.bind(this)
		this.onEnter = this.onEnter.bind(this)
	}

	returnTypedValue(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	onEnter(e) {
		if(e.key === 'Enter' && this.state.title.length > 2) {
			this.props.addNewTask('projects/add', this.state)
			this.setState({
				title: '',
				subTitle: ''
			}, () => {
				this.form.reset()
				this.form.blur()
				this.props.onKeyUp(e)
			})
		}
	}

	render() {
		return (
			<div className="addTask single">
				<div className="plusIcon"></div>

				<div className="input" onKeyUp={this.onEnter}>
					<form ref={node => this.form = node}>
						<InputText autofocus type="text" name="title" onChange={this.returnTypedValue} style={{...inputStyle, fontSize: 14, color: '#424459'}}/>
						<InputText type="text" name="subTitle" onChange={this.returnTypedValue} style={{...inputStyle, fontSize: 12, color: '#7D7D7D', marginTop: 8}}/>
					</form>
				</div>
				{ /* <ButtonSubmit onClick={ e => this.props.addNewTask('projects/add', this.state) }/> */ }
				<style jsx>{ styles }</style>
			</div>
		)
	}
}

export default AddTask
