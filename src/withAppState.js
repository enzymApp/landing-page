import PropTypes from 'prop-types'
import { getContext } from 'recompose'

export default getContext({ appState: PropTypes.object, setSession: PropTypes.func })
