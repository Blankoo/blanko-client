import React from 'react'
import Link from 'next/link'
import router from 'next/router'
import http from '../utils/http'
import config from '../utils/config'

import InputText from '../components/atoms/form/InputText'
import InputPassword from '../components/atoms/form/InputPassword'

import styles from '../styles/pages/login'

class Login extends React.Component {
	constructor(props) {
		super()

		this.state = {
			username: '',
			password: '',
			message: null
		}

		this.onType = this.onType.bind(this)
		this.login = this.login.bind(this)
		this.onEnter = this.onEnter.bind(this)
	}

	async login() {
		try {
			const { data: { message, success, user, token, id }} = await http.post(`${config.apiUrl}/account/login`, this.state)

			if(success) {
					localStorage.setItem('USER', user)
					localStorage.setItem('USER_TOK', token)
					localStorage.setItem('USER_ID', id)
					router.push('/start')
			} else {
				this.setState({ message })
			}
		} catch(err) {
			console.error(err)
		}
	}

	onEnter(e) {
		if (e.key === 'Enter' && this.state.username !== '' && this.state.password !== '') {
			this.login()
		} else {
			this.setState({
				message: 'Please provide your email & password'
			})
		}
	}

	onType(e) { this.setState({ [e.target.name]: e.target.value }) }

	render() {
		return (
			<div className="login" onKeyUp={this.onEnter}>
				<div className="sidebar-left">
					<div className="blanko">Blanko.</div>
					<div className="error-message">{this.state.message}</div>
					<div className="input-fields">
						<input type="text" onChange={this.onType} name="username" placeholder="Username" autoFocus={true}/>
						<input type="password" onChange={this.onType} name="password" placeholder="Password"/>
						<button onClick={this.login} className="login-button">Login</button>
					</div>
				</div>

				<div className="skeleton"></div>
				<style jsx global>{ styles }</style>
			</div>
		)
	}
}

export default Login
