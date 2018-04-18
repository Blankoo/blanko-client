export default `
.modal-container {
	width: 100%;
	height: 100vh;
	background: rgba(0,0,0,.3);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;
}

.modal-content {
	position: absolute;
	top: 50%;
	left:50%;
	border-radius: 4px;
	transform: translate(-50%, -60%);
	background: #FBFBFD;
	box-shadow: 0 2px 40px 0 rgba(114,114,114,0.7);
	width: 512px;
	height: auto;
	background: white;
	padding: 32px 32px 24px 32px;
	text-align: center;
}

.button-container {
	margin-top: 16px;
	display: flex;
	justify-content: flex-end;
}
`
