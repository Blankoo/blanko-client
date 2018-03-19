export default `
	.single {
		background: #FFFFFF;
		box-shadow: 0 5px 20px 0 rgba(238,238,243, 0.8);
		border-radius: 4px;
		padding: 24px;
		margin:8px 0;
		/* min-height:88px; */
		max-width: 100%;
		display: flex;
		align-items: flex-start;
		transition: 300ms	ease-in-out;
	}

	.task-title {
		flex: 1;
		display: inline-block;
	}

	.single.checked {
		opacity: 0.5;
	}

	.task-title .list-view-title {
		position: relative;
		font-weight: normal;
		font-size: 14px;
		color: #424459;
		letter-spacing: 0;
		margin-bottom: 8px;
	}

	.task-title .list-view-title.edit {
		border: none;
		outline: none;
		resize: none;
		overflow: auto;
		width: 100%;
		height: 17px;
	}

	.task-title p {
		position: relative;
		font-size: 12px;
		color: #7D7D7D;
		letter-spacing: 0;
	}

	.single.checked .task-title h4,
	.single.checked .task-title p {
		text-decoration: line-through;
    text-decoration-color: #1C87FB;
		color: #D0D1D6;
	}

	.single.active {
		box-shadow: 0 5px 20px 0 rgba(187, 187, 187, 0.8);
	}

	.status {
		color: lightgrey;
	}
`
