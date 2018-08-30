export default `
	.blanko,
	.blanko-small {
		font-size: 32px;
		color: #7A848F;
		letter-spacing: 0;
		font-weight:700;
		margin-top:64px;
		padding-left: 48px;
		user-select: none;
		cursor: default;
	}

	.blanko-small {
		display: none;
		font-size: 42px;
		padding-left: 22px;
	}

	.favorites {
		margin-top:64px;
	}

	.projectList {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.favorites .label,
	.projectList .label {
		padding-left:48px;
	}

	.logout-icon {
		display: block;
		position: absolute;
		bottom: 24px;
		left: 12px;
		width: 12px;
		height: 12px;
		object-fit: cover;
		opacity: 0.7;
	}

	.logout-icon:hover svg g {
		transition: 200ms ease;
		fill: #FB1C1C;
	}

	.logout-icon svg {
		width: 100%;
		transition: 200ms;
	}

	.all-tasks {
		position: absolute;
		bottom: 12px;
		right: 12px;
	}
`
