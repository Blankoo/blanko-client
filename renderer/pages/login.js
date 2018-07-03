import React from 'react'
import Link from 'next/link'
import router from 'next/router'
import http from '../utils/http'
import config from '../utils/config'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import InputText from '../components/atoms/form/InputText'
import InputPassword from '../components/atoms/form/InputPassword'

import add from '../utils/add'

import styles from '../styles/pages/login'

class Login extends React.Component {
	constructor(props) {
		super()

		this.state = {
			username: '',
			password: '',
			message: null,
			success: true,
			forgotPassword: false,
			skeletonLeft: 40
		}

		this.onType = this.onType.bind(this)
		this.login = this.login.bind(this)
		this.onEnter = this.onEnter.bind(this)
		this.toggleForgotPassword = this.toggleForgotPassword.bind(this)
		this.sendForgotUsernameMail = this.sendForgotUsernameMail.bind(this)
	}

	async login() {
		console.log('Login');
		try {
			const { data: { message, success, user, token, id }} = await http.post(`${config.apiUrl}/account/login`, this.state)
			this.setState({ success })

			if(success) {
					localStorage.setItem('USER', user)
					localStorage.setItem('USER_TOK', token)
					localStorage.setItem('USER_ID', id)

					this.setState({
						skeletonLeft: 0
					}, () => {
						setTimeout(() => {
							router.push('/start')
						}, 420)
					})
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
		}
	}

	onType(e) { this.setState({ [e.target.name]: e.target.value }) }

	toggleForgotPassword() {
		this.setState(({ forgotPassword }) => ({
			forgotPassword: !forgotPassword
		}))
	}

	sendForgotUsernameMail() {
		const { username } = this.state
		console.log(username);
		add('account/forgot', undefined, { username })
			.then(res => {
				console.log('forgot email: ', res)
			})
	}

	render() {
		const transitionOptions = {
      transitionName: 'fade',
			transitionEnterTimeout: 0,
      transitionEnter: true,
      transitionLeave: false
		}

		return (
			<div className="login" onKeyUp={this.onEnter}>
				<div className="sidebar-left">
					<div className="blanko">Blanko.</div>
						<ReactCSSTransitionGroup {...transitionOptions}>
						{ !this.state.forgotPassword  ?
						<div className="input-fields" key={1}>
							<input type="text" onChange={this.onType} name="username" placeholder="Username" autoFocus={true}
								className={this.state.success ? '' : 'error'}/>

							<input type="password" onChange={this.onType} name="password" placeholder="Password"
								className={this.state.success ? '' : 'error'}/>
							<button onClick={this.login} className="login-button">Login</button>

							<span className="links">
								<button className="link small">Sign up</button>
								<button className="link small" onClick={this.toggleForgotPassword}>Forgot password</button>
							</span>
						</div>
						:
						<div className="forgot-password" key={2}>
							<button className="link move-to-left" onClick={this.toggleForgotPassword}>← Go back to login</button>
							<p>Please provide the email your account is registerd with so we can send you a recovery email.</p>

							<input type="text" onChange={this.onType} name="username" placeholder="Email address" autoFocus={true}
								className={this.state.success ? '' : 'error'}/>
							<button onClick={this.sendForgotUsernameMail} className="login-button">Send reset email</button>
						</div>
					}
					</ReactCSSTransitionGroup>
				</div>

				<div className="skeleton" style={{ left: `${this.state.skeletonLeft}vw` }}></div>
				<style jsx global>{ styles }</style>
			</div>
		)
	}
}

export default Login
