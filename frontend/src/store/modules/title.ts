export const SET_TITLE = 'SET_TITLE'

interface ActionArgsI {
  windowTitle?: string
  headerTitle?: string
}

interface ActionI {
  type: typeof SET_TITLE,
  payload: StateI,
}

interface StateI {
  windowTitle: string
  headerTitle: string
}

export function setTitle ({ windowTitle, headerTitle }: ActionArgsI): ActionI {
  return {
    type: SET_TITLE,
    payload: {
      windowTitle: windowTitle || '',
      headerTitle: headerTitle || '',
    }
  }
}

const initialState: StateI = {
  windowTitle: 'Uzumaki',
  headerTitle: '',
}

export default function title (state = initialState, action: ActionI): StateI {
  let newState
  switch (action.type) {
    case SET_TITLE:
      newState = {
        windowTitle: [action.payload.windowTitle, initialState.windowTitle].join(' | '),
        headerTitle: action.payload.headerTitle,
      }
      break
    default:
      newState = { ...state }
  }
  document.title = newState.windowTitle
  return newState
}