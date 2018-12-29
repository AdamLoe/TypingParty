let getRandomKey = () => Math.random() * 8000;

export let notification = ({ message, type, seconds}) => {
	return dispatch => {
		let notificationKey = getRandomKey();

		dispatch({
			type: "showNotification",
			notificationType: type,
			notificationMessage: message,
			notificationKey
		});

		setTimeout(() =>
			dispatch({
				type: "closeNotification",
				notificationKey
			})
		, seconds * 1000)
	}
};

let loadingTimeout = 4000;
export let loadingGame = () => {
	return (dispatch, getState) => {
		console.log("LOADING GAME");
		dispatch({
			type: "loadingGame"
		});
		setTimeout(() => {
			let { showLoading } = getState().popups;
			if (showLoading) {
				dispatch(notification({
					type: "Error",
					message: "Server Not Responding",
					seconds: 10
				}));
			}
		}, loadingTimeout);
	}
};

export let closeNotification = (notificationKey) => ({
	type: "closeNotification",
	notificationKey
});