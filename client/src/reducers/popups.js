let initState = {
  showNotification: false,
  notificationMessage: "",
  notificationType: "",
  notificationKey: 0,

  showLoading: false
};

export default (state = initState, action) => {
  let { type, data } = action;

  switch (type) {
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
    case "serverError":
      return {
        ...state,
        showLoading: false,
        showNotification: true,
        notificationMessage: data.message,
        notificationType: "Error"
      };
    default:
      return state;
  }
};
