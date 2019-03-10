import { withContext } from 'recompose'
import PropTypes       from 'prop-types'

const dataToState = (prevState, props) => {
  const { session } = props
  const newState = {
    ...session,
  }
  return newState
}

let currentAppState = {}
const updateAppState = withContext(
  { appState: PropTypes.object, setSession: PropTypes.func },
  ({ setSession, ...props }) => {
    currentAppState = dataToState(currentAppState, props)
    return {
      appState: currentAppState,
      setSession,
    }
  }
)

export default updateAppState
