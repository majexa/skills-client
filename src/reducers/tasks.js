export default (state = {}, action) => {

  switch (action.type) {
    case 'SET_TASKS':
      return {
        tasks: action.tasks
      };
    default:
      return state;
  }

}