let initState = {
  showNotification: false,
  notificationMessage: "",
  notificationType: "",
  notificationKey: 0,

  showLoading: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case "closeNotification":
      if (action.notificationKey === state.notificationKey) {
        return {
          ...state,
          showNotification: false
        };
      } else {
        return {
          ...state
        };
      }
    case "showNotification":
      return {
        ...state,
        showNotification: true,
        notificationType: action.notificationType,
        notificationMessage: action.notificationMessage,
        notificationKey: action.notificationKey,
        showLoading: false
      };
    case "loadingGame":
      return {
        ...state,
        showLoading: true
      };
    case "updateGameObject":
      return {
        ...state,
        showLoading: false
      };
    default:
      return state;
  }
};
