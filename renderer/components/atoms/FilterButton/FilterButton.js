import styles from './FilterButtonStyle.js'

export default props => {
	const { text, active, onClick, style } = props
	return (
		<span>
			<button onClick={ e => onClick(e) } className={ (active ? 'active' : null) } style={style}>{ text }</button>
			<style jsx>{ styles }</style>
		</span>
	)
}
