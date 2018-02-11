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
			password: ''
		}

		this.onType = this.onType.bind(this)
		this.login = this.login.bind(this)
	}

	async login() {
		try {
			const loginResolve = await http.post(`${config.apiUrl}/account/login`, this.state)
			localStorage.setItem('USER', loginResolve.data.user) // eslint-disable-line no-undef
			localStorage.setItem('USER_TOK', loginResolve.data.token) // eslint-disable-line no-undef
			localStorage.setItem('USER_ID', loginResolve.data.id) // eslint-disable-line no-undef
			router.push('/start')
		} catch(err) { return err }
	}

	onType(e) { this.setState({ [e.target.name]: e.target.value }) }

	render() {
		return (
			<div className="login">
				<div className="sidebar-left">
					<div className="blanko">Blanko.</div>
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
