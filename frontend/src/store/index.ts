import { createStore, combineReducers } from 'redux'

import title from '@/store/modules/title'

export const reducers = combineReducers({
  title,
})

const store = createStore(reducers)
export default store
