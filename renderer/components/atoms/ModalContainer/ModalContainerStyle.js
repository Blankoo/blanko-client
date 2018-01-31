export default `
.modal-container {
	width: 100%;
	height: 100vh;
	background: rgba(0,0,0,.3);
	position: fixed;
	top:0;
	left:0;
}

.modal-content {
	position: absolute;
	top: 50%;
	left:50%;
	transform: translate(-50%, -50%);
	width: 512px;
	height: auto;
	background: white;
	padding: 24px;
}

input,
textarea {
	margin-top: 16px;
}
`
