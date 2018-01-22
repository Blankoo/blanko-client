import styles from './FilterButtonStyle.js'

export default props => {
	const { text, active, onClick } = props
	return (
		<span>
			<button onClick={ e => onClick(e) } className={ (active ? 'active' : null) }>{ text }</button>
			<style jsx>{ styles }</style>
		</span>
	)
}
