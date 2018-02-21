import styles from './ButtonStyle.js'

export default props => {
	const { text, active, onClick, style, type } = props
	return (
		<span>
			<button
				onClick={ e => onClick(e) }
				className={ (active ? 'active' : '') + ` ${type ? type : 'default'}`}
				style={style}
				>
					{ text }
				</button>
			<style jsx>{ styles }</style>
		</span>
	)
}
