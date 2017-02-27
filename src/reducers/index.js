import { combineReducers } from 'redux'
import size from './size'
import navigation from './navigation'
import phone from './phone'

import tasks from './tasks'

const todoApp = combineReducers({
  size,
  navigation,
  tasks,
  phone
});

export default todoApp