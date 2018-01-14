export default `
	.listView {}

	.single {
		background: #FFFFFF;
		box-shadow: 0 5px 20px 0 rgba(238,238,243, 0.8);
		border-radius: 4px;
		padding:24px;
		margin:8px 0;
		max-width: 100%;
		display:flex;
	}

	.checkbox {
		width:16px;
		height:16px;
		display: inline-flex;
		background: #F3F3F3;
		border-radius: 4px;
		margin-right:16px;
	}

	.checkbox.checked {
		background: #F3F3F3 url(../../static/checked-v.svg) center center no-repeat;
	}

	.taskTitle {
		flex:1;
		display:inline-block;
	}

	.taskTitle h4 {
		font-weight: normal;
		font-size: 14px;
		color: #424459;
		letter-spacing: 0;
		margin-bottom:8px;
	}

	.taskTitle p {
		font-size: 12px;
		color: #7D7D7D;
		letter-spacing: 0;
	}

	.single.checked .taskTitle h4,
	.single.checked .taskTitle p {
		text-decoration: line-through;
		color: #D0D1D6;
	}

	.status {
		color:lightgrey;
	}

`
