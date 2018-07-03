export default `
.active-project {
	position: relative;
	max-width: calc(100% - 420px);
	transition: 300ms;
}

@media screen and (max-width: 1184px ) {
	.active-project {
		max-width: 100%;
	}
}

.active-project-head {
}

.mainTitle {
	font-weight: normal;
	font-size: 22px;
	color: #7A848F;
	margin-bottom: 16px;
	padding-top: 64px;
}

.description {
	max-width: 600px;
	font-weight: light;
	font-size: 12px;
	color: #7D7D7D;
	letter-spacing: 0;
	line-height: 20px;
	margin-bottom:40px;
	display: block!important;
}
`
