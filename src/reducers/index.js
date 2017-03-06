import { combineReducers } from 'redux'
import size from './size'
import navigation from './navigation'
import phone from './phone'
import tasks from './tasks'
import challenge from './challenge'
import auth from './auth'

const todoApp = combineReducers({
  size,
  navigation,
  tasks,
  phone,
  challenge,
  auth
});

export default todoApp