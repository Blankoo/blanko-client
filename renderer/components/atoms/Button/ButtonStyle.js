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

/*Button type: default*/
button.default:hover {
	background-color: #1C87FB;
	box-shadow: 0 2px 8px 0 rgba(28, 135, 251, 0.33);
	color: white;
}

button.default.active {
  background-color: #1C87FB;
	box-shadow: 0 2px 8px 0 rgba(28, 135, 251, 0.33);
	color: white;
}

/*Button type: edit*/
button.edit:hover {
	background-color: #F3F3F3;
	box-shadow: 0 2px 8px 0 rgba(243, 243, 243, 0.33);
}

/*Button type: delete*/
button.delete:hover {
	background-color: #B32B2B;
	box-shadow: 0 2px 8px 0 rgba(179, 43, 43, 0.33);
	color: #FCFCFC;
}
`
