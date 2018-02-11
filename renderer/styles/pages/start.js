export default `
	* {
		margin:0;
		padding:0;
		box-sizing:border-box;
		font-family: -apple-system, BlinkMacSystemFont, 'Verdana', sans-serif;
	}

	body {
		margin:0;
		padding:0;
		padding-left:332px;
		background:#FBFBFD;
		color:#9B9B9B;
	}

	.container {
		padding:0 64px 32px;
	}

	.sidebar {
		width:332px;
		height:100vh;
		position: fixed;
		top:0;
		left:0;
		background: #FBFBFD;
		box-shadow: inset 0 2px 40px 0 rgba(114,114,114,0.07);
	}


	.label {
		font-size: 10px;
		user-select:none;
		color: #7A848F;
		letter-spacing: 0.5px;
		text-transform: uppercase;
		font-weight: bold;
	}

	h1,
	h2 {
		font-size: 32px;
		color: #7A848F;
		letter-spacing: 0;
		font-weight:700;
		user-select: none;
		cursor: default;
	}

	h2 {
		font-size: 24px;
	}

`
