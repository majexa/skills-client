const dummy = (state = {}, action) => {

  switch (action.type) {

    case 'SCREEN_INIT':
      return {
        screen: 'Task',
        nextScreen: false,
        startChange: false,
        id: 5
      };
    case 'SCREEN_CHANGE':
      if (state.screen === action.screen) {
        console.log('Already on screen "' + action.screen + '". Skipped');
        return state;
      }
      let data = {
        nextScreen: action.screen,
        startChange: true,
        direction: action.direction || 'right'
      };
      if (action.id) {
        data.id = action.id;
      }
      if (action.text) {
        data.text = action.text;
      }
      if (action.subText) {
        data.subText = action.subText;
      }
      return Object.assign({}, state, data);
    case 'SCREEN_RESET':
      return Object.assign({}, state, {
        screen: state.nextScreen,
        nextScreen: false,
        startChange: false
      });
    default:
      return state;
  }

};

export default dummy