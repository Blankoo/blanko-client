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
		font-size: 12px;
		font-weight: 500;
		transition: 100ms linear;
		color: #9B9B9B;
		white-space: pre;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.projects-list li.active {
		/* font-weight: bold; */
		color: #1C87FB;
	}

	.projects-list li.active:before {
		content: '';
		display: flex;
		position: absolute;
		left:4px;
		top:0;
		width: 3px;
		height:14px;
		background-image: url('../../static/activeProjectLine.svg');
		background-size: contain !important;
		background-repeat: no-repeat;
		background-position: top left;
	}

	.set-favorite {
		position: absolute;
		right:16px;
		opacity: 0;
		font-size: 8px;
		transition: 200ms ease;
	}

	.projects-list li:hover {
		color: #1C87FB;
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
