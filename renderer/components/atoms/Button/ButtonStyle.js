export default `
button {
  padding: 8px 16px;
  text-transform: uppercase;
  color: #7A848F;
  font-size: 10px;
  background: transparent;
  border:none;
  font-weight: 500;
  border-radius: 4px;
  outline: none;
	margin-right: 8px;
	transition: 100ms linear;
}

/*Button type: default*/
button.default:hover {
	background-color: #F3F3F3;
	box-shadow: 0 2px 8px 0 rgba(243, 243, 243, 0.33);
}

/*Button type: disabled*/
button.disabled {
	color: #D0D1D6;
}

/*Button type: filter*/
button.filter:hover {
	background-color: #1C87FB;
	box-shadow: 0 2px 8px 0 rgba(28,135,251,0.33);
	color: #ffffff;
}

button.filter.active {
	background-color: #1C87FB;
	box-shadow: 0 2px 8px 0 rgba(28,135,251,0.33);
	color: #ffffff;
}

/*Button type: submit*/
button.submit {
	background-color: #1C87FB;
	box-shadow: 0 2px 8px 0 rgba(28,135,251,0.33);
	color: #ffffff;
}

button.submit:hover {
	background: #0063cc;
	box-shadow: 0 2px 8px 0 rgba(0,122,255,0.33);
}

/*Button type: delete*/
button.delete:hover {
	background-color: #B32B2B;
	box-shadow: 0 2px 8px 0 rgba(179, 43, 43, 0.33);
	color: #FCFCFC;
}

/*Button type: cancel*/
button.cancel {
	background-color: #B32B2B;
	box-shadow: 0 2px 8px 0 rgba(179, 43, 43, 0.33);
	color: #FCFCFC;
}

button.cancel:hover {
	background-color: #912323;
	box-shadow: 0 2px 8px 0 rgba(145, 35, 35, 0.33);
}
`
