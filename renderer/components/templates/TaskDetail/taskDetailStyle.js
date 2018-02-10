export default `
.taskDetail {
	position: fixed;
	right: -396px;
	width: 420px;
	top: 0;
	bottom: 0;
	padding: 32px 32px 32px 0;
	transition: all .3s ease-in-out;
}

.taskDetail.show {
	right: 0;
	transiton: all .3s ease-in-out;
}

.taskDetailTile {
	background: #FFFFFF;
	box-shadow: 0 5px 20px 0 rgba(238,238,243, 0.8);
	border-radius: 4px;
	padding: 24px;
	max-width: 100%;
	height: 100%;
	display: flex;
	transition: 300ms	ease-in-out;
}
`
