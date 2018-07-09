export default `
.filter-tasks {
	margin-bottom: 40px;
	display: flex;
	align-items: center;
	background: #FBFBFD;
	padding-top: 18px;
	padding-bottom: 18px;
	z-index: 1;
}

.filter-tasks.fixed {
	position: fixed;
	top: 0;
	width: 100%;
	padding-left: 20px;
	margin-left: -20px;
}

.toggle-add-task {
	margin-right: 16px;
	display: inline-flex;
	justify-content: center;
	align-items: center;
}

.toggle-add-task svg {
 	width: 100%;
	transform: rotate(45deg);
}
`
