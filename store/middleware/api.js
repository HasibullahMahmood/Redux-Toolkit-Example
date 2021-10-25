import axios from 'axios';
import { apiCallBegan, apiCallSucceed, apiCallFailed } from '../api';

const api = (store) => (next) => async (action) => {
	if (action.type !== apiCallBegan.type) return next(action);
	const { dispatch } = store;
	const { url, method, data, onStart, onSuccess, onError } = action.payload;
	if (onStart) dispatch({ type: onStart });
	next(action);
	try {
		const response = await axios.request({
			baseURL: 'http://api.vihobook.com',
			url,
			method,
			data,
		});

		if (response.data.result) {
			// General
			dispatch(apiCallSucceed(response.data));
			// Specific
			if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
		} else {
			//General
			dispatch(apiCallFailed(response.data.message));
			// Specific
			if (onError) dispatch({ type: onError, payload: { error: response.data.message } });
		}
	} catch (error) {
		// General
		dispatch(apiCallFailed(error.message));
		// Specific
		if (onError) dispatch({ type: onError, payload: { error: error.message } });
	}
};

export default api;
