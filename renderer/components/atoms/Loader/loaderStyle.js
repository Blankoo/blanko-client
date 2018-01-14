export default `
.loader {
  width:100vw;
  height:100vh;
  background: #fff;
	position: fixed;
	left:0;
	top:0;
	visibility: hidden;
	opacity: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all .3s ease-in-out;
}

.active {
	visibility: visible;
	opacity: 1;
	transition: all .3s ease-in-out;
}

.loader-icon {
	width: 64px;
	height: 64px;
	animation: loader .5s linear infinite;
}

@keyframes loader{
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`
