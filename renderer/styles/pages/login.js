export default `
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: -apple-system, BlinkMacSystemFont, 'Verdana', sans-serif;
	cursor: default;
}

body {
	margin: 0;
	padding: 0;
	background: #FBFBFD;
	color: #9B9B9B;
	overflow: hidden;
}

.blanko {
	font-size: 32px;
	color: #7A848F;
	letter-spacing: 0;
	font-weight: 700;
	user-select: none;
}

.login {
	background: #fff;
	display: flex;
}

.sidebar-left {
	padding-top: 56px;
	width: 1081px;
	height: 100vh;
	padding-left: 48px;
	box-sizing: content-box;
}

.input-fields {
	margin-top: 170px;
}

.input-fields input {
	font-size: 14px;
	width: 282px;
	display: block;
	background: transparent;
	border: 0;
	font-size: 14px;
	outline: none;
	color: #7A848F;
	letter-spacing: 0;
	border-bottom: 1px solid #7A848F;
	padding: 0 0 8px;
}

.input-fields input:nth-child(2) {
	margin: 32px 0 64px;
}

.input-fields input:focus {
	border-color: #007aff;
}

.login-button {
	border: 0;
	outline: none;
	background: #007aff;
	color: #fff;
	font-weight: bold;
	display: flex;
	width: 100%;
	box-shadow: 0 2px 8px 0 rgba(0,122,255,0.33);
	border-radius: 4px;
	width: 282px;
	text-align: center;
	height: 48px;
	font-size: 14px;
	justify-content: center;
	align-items: center;
	transition: 300ms ease-in-out;
}

.login-button:hover {
	background: #0063cc;
	box-shadow: 0 2px 8px 0 rgba(0,122,255,0.33);
}

.login-button:active {
	background: #0063CC;
	box-shadow: 0 2px 8px 0 rgba(0,99,204,0.33), inset 0 0 8px 2px rgba(0,55,115,0.30);
}

.skeleton {
	width: 1440px;
	height: 100vh;
	display: flex;
	background: #FBFBFD;
	box-shadow: 0 5px 10px 0 #EEEEF3;
	border-radius: 10px;
	background-image: url("../../static/skeleton.svg");
	background-position: top left;
	background-repeat: no-repeat;
	background-size: cover;
}
`
