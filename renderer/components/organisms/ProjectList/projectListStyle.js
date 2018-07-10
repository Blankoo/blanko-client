export default `
	.projects-list {
		list-style: none;
		overflow-y: scroll;
		height: 100%;
		display: block;
		position: relative;
		z-index: 2;
		padding-bottom: 64px;
	}

	.title {
		padding-left: 48px;
	}

	.projects-list li {
		margin: 24px 0;
		line-height: 1;
		user-select: none;
		cursor: default;
		position: relative;
		padding-left: 48px;
		padding-right: 40px;
		font-size: 12px;
		font-weight: 500;
		transition: 100ms linear;
		color: #9B9B9B;
		white-space: pre;
		text-overflow: ellipsis;
	}

	.projects-list li.active {
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
		max-width: 216px;
	}

	.label .add-project svg {
		transform: rotate(45deg);
		float:right;
		margin-top: 4px;
		width: 8px;
		height: 8px;
	}
`
