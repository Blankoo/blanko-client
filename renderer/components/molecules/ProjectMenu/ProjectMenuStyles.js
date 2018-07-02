export default `
	.action-bar {
		position: absolute;
		right: 40px;
		font-size: 12px;
		color: #9B9B9B;
		top: 0;
	}

	.action-bar-icon {
		right: 0;
		position: absolute;
		width: 12px;
		z-index: 1;
	}

	.action-bar-icon img {
		width: 100%;
	}

	.action-bar-menu {
		background: #fff;
		box-shadow: 0 5px 32px 0 rgba(213, 213, 221, .54);
		border-radius: 4px;
		padding: 8px;
		position: relative;
		font-size: 10px;
		text-align: center;
		z-index: 5;
		top: 24px;
		right: calc(-50% + 6px);
	}

	.action-bar-menu:before {
		content: '';
		display: block;
		width: 0;
		height: 0;
		position: absolute;
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
		border-bottom: 8px solid #fff;
		top: -8px;
		left: calc(50% - 8px);
	}

	.action-bar-menu ul {
		list-style: none;
	}

	.action-bar-menu ul li {
		transition: 220ms ease;
	}

	.action-bar-menu ul li:hover {
		color: #424459;
	}

	.action-bar-menu ul li:first-child {
		margin-bottom: 8px;
	}

	.action-bar-menu ul li:first-child:hover {
		/* color: #1C87FB; */
	}

	.action-bar-menu ul li:last-child:hover {
		/* color: #FB1C1C; */
	}
`
