import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';

const slice = createSlice({
	name: 'locations',
	initialState: {},
	reducers: {
		locationsRequested: (locations, action) => {
			locations.loading = true;
		},
		locationsReceived: (locations, action) => {
			locations.loading = false;
			locations.list = action.payload.dbResult;
		},
		locationsFailed: (locations, action) => {
			locations.loading = false;
			locations.error = action.payload.error;
		},
	},
});

export const { locationsRequested, locationsReceived, locationsFailed } = slice.actions;
export default slice.reducer;

export const loadLocations = () => (dispatch, getStore) => {
	dispatch(
		apiCallBegan({
			url: '/locations',
			onStart: locationsRequested.type,
			onSuccess: locationsReceived.type,
			onError: locationsFailed.type,
		})
	);
};
