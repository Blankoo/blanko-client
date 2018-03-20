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

	.task-titles {
		flex: 1;
		display: inline-block;
	}

	.single.checked {
		opacity: 0.5;
	}

	.task-titles .list-view-title {
		position: relative;
		font-weight: normal;
		font-size: 14px;
		color: #424459;
		letter-spacing: 0;
		margin-bottom: 8px;
		height: 17px;
		overflow: hidden;
	}

	.task-titles .list-view-title.edit {
		border: none;
		outline: none;
		resize: none;
		overflow: auto;
		width: 100%;
		height: 17px;
		display: block;
	}

	.task-titles p {
		position: relative;
		font-weight: normal;
		font-size: 12px;
		color: #7D7D7D;
		letter-spacing: 0;
		overflow: hidden;
	}

	.task-titles .list-view-sub-title.edit {
		border: none;
		outline: none;
		resize: none;
		width: 100%;
		display: block;
		font-size: 12px;
		letter-spacing: 0;
		color: #7D7D7D;
	}

	.single.checked .task-titles h4,
	.single.checked .task-titles p {
		text-decoration: line-through;
    text-decoration-color: #1C87FB;
		color: #D0D1D6;
	}

	.single.active {
		box-shadow: 0 5px 20px 0 rgba(187, 187, 187, 0.3);
	}

	.status {
		color: lightgrey;
	}
`
