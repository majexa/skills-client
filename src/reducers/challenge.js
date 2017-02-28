export default (state = {}, action) => {

  switch (action.type) {
    case 'SET_CHALLENGES':
      return action;
    default:
      return state;
  }

}