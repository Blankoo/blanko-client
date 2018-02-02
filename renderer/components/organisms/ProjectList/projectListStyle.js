export default `
	.projects-list {
		list-style: none;
		overflow-y: scroll;
		display: block;
	}

	.title {
		padding-left: 48px;
	}

	.projects-list li {
		margin: 16px 0;
		line-height: 1;
		user-select: none;
		cursor: default;
		position: relative;
		padding-left: 48px;
		transition: 100ms linear;
		color: #9B9B9B;
	}

	.projects-list li.active {
		/* font-weight: bold; */
		color: #7A848F;
	}

	.projects-list li.active:before {
		content: url('../../static/activeProjectLine.svg');
		display: flex;
		position: absolute;
		left:0;
		top:0;
		width: 3px;
		height:16px;
		border-radius: 100%;
		background-color: #7A848F;
	}

	.set-favorite {
		position: absolute;
		right:16px;
		opacity: 0;
		font-size: 8px;
		transition: 200ms ease;
	}

	.projects-list li:hover {
		color: #7A848F;
	}

	.projects-list li:hover .set-favorite {
		opacity: 1;
	}

	.label {
		max-width: 200px;
	}

	.label .add-project img {
		float:right;
		width: 8px;
		height: 8px;
	}
`
