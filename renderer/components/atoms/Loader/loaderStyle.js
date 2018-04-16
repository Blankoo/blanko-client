export default ` .loader {
	width: 100vw;
	height: 100vh;
	background: #fff;
	position: fixed;
	left: 0;
	top: 0;
	visibility: hidden;
	opacity: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.3s ease-in-out;
}

.active {
	visibility: visible;
	opacity: 1;
	transition: all 0.3s ease-in-out;
}

.loader-icon {
	width: 64px;
	height: 64px;
}

.loading {
	width: 64px;
	height: 64px;
	display: block;
	position: relative;
}

.circle {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	border-radius: 100%;
	background-color: #1b84f6;
	animation-timing-function: linear !important;
	animation-fill-mode: forwards !important;
	animation-duration: 1s;
	animation-iteration-count: infinite;
}

.circle.two {
	opacity: 0.7;
	animation-name: load1;
}

.circle.three {
	opacity: 0.3;
	animation-name: load2;
}
@keyframes load1 {
	0% {
		transform: translate3d(0, -8px, 0);
	}

	25% {
		transform: translate3d(8px, 0, 0);
	}

	50% {
		transform: translate3d(0, 8px, 0);
	}

	75% {
		transform: translate3d(-8px, 0, 0);
	}

	100% {
		transform: translate3d(0, -8px, 0);
	}
}
@keyframes load2 {
	0% {
		transform: translate3d(0, -16px, 0);
	}

	25% {
		transform: translate3d(16px, 0, 0);
	}

	50% {
		transform: translate3d(0, 16px, 0);
	}

	75% {
		transform: translate3d(-16px, 0, 0);
	}

	100% {
		transform: translate3d(0, -16px, 0);
	}
}
`
