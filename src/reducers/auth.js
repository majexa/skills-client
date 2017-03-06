const dummy = (state = {}, action) => {

  switch (action.type) {
    case 'SET_AUTH':
      return Object.assign({}, state, {
        profile: action.profile
      });
    default:
      return state;
  }

};

export default dummy