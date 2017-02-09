export default (state = {}, action) => {

  switch (action.type) {
    case 'TIMER_CHANGE':
      return {
        text: action.text
      };
    default:
      return state;
  }

}