const dummy = (state = {}, action) => {

  switch (action.type) {
    case 'PHONE_CHANGE':
      return Object.assign({}, state, {
        phone: action.phone
      });
    default:
      return state;
  }

};

export default dummy