export default `
	#kanban {
		width: 95%;
		margin: 64px auto;
		background: #fafafa;
		height: 500px;
		box-shadow: 0px 16px 40px -1px rgba(0,0,0,.1);
		display:flex;
	}

	#kanban .column {
		overflow-y: scroll;
		width: 24%;
		height: 400px;
		background: white;
		box-shadow: 0px 16px 40px -1px rgba(0,0,0,.1);
		display: inline-block;
		margin:42px 40px;
		padding:8px;
	}

	#kanban .column .task {
		width: 95%;
		display:block;
		margin:16px auto;
		height:100px;
		background-color: #DEE6E8;
	}

	#kanban .column .card.dragging {
		box-shadow: 0px 16px 40px -1px rgba(0,0,0,.4);
	}
`
