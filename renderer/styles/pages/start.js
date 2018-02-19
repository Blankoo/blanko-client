export default `
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: -apple-system, BlinkMacSystemFont, 'Verdana', sans-serif;
	}

	::-webkit-scrollbar {
    display: none;
	}

	:root {
		--sizebar-width: 256px;
	}

	body {
		margin: 0;
		padding: 0;
		padding-left: var(--sizebar-width);
		background: #FBFBFD;
		color: #9B9B9B;
	}

	.container {
		padding: 0 64px 32px;
		margin-right: 30%;
		transition: all .2s ease-in-out;
		max-width: 763px;
		width: 100%;
	}

	@media screen and (max-width: 1320px) {
		.container {
			width: auto;
			padding: 0 64px 32px 32px;
			width: 100%;
		}

		.container.toggleTaskDetail {
			padding: 0 64px 32px 32px;
		}
	}

	.container.toggleTaskDetail {
		margin-right: 420px;
		max-width: 720px;
		padding: 0 64px 32px 32px;
	}

	.sidebar {
		width: var(--sizebar-width);
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		background: #FBFBFD;
		box-shadow: inset 0 2px 40px 0 rgba(114,114,114,0.07);
	}

	@media screen and (max-width: 850px) {
		:root {
			--sizebar-width: 78px;
		}

		.blanko-small {
			display: block !important;
		}

		.blanko,
		.description,
		.favorites,
		.projectList {
			display: none;
		}
	}

	.label {
		font-size: 10px;
		user-select: none;
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
