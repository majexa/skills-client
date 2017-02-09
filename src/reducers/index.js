import { combineReducers } from 'redux'
import size from './size'
import navigation from './navigation'

import tasks from './tasks'

const todoApp = combineReducers({
  size,
  navigation,
  tasks
});

export default todoApp