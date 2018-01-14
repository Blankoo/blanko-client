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
	}
	.projects-list li.active {
		font-weight: bold;
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
`
