export default `
button {
  padding: 8px 16px;
  text-transform: uppercase;
  color: #7A848F;
  font-size: 10px;
  background: transparent;
  border:none;
  font-weight: bold;
  border-radius: 4px;
  outline: none;
	margin-right: 8px;
	transition: 100ms linear;
}

button.default:hover {
	background-color: #1C87FB;
	color:white;
}

button.default.active {
  background-color: #1C87FB;
	color:white;
}

button.edit:hover {
	background-color: #F3F3F3;
}

button.delete:hover {
	background-color: #B32B2B;
	color: #FCFCFC;
}
`
