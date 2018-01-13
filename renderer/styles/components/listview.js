export default `
	.listView {
		background:#fafafa;
		margin:16px 0;
		padding:16px;
		box-shadow: 0px 16px 40px -1px rgba(0,0,0,.1);
	}

	.single {
		background: #f1f1f1;
		width: 400px;
		margin: 16px 0;
		padding:8px;
		display:flex;
		align-items:center;
		box-shadow: 0px 16px 40px -1px rgba(0,0,0,.1);
	}

	.checkbox {
		width:22px;
		height:22px;
		background:red;
		display:inline-block;
		margin-right:8px;
	}

	.checkbox.checked {
		background:green;
	}

	.taskTitle {
		flex:1;
	}

	.status {
		color:lightgrey;
	}

`
