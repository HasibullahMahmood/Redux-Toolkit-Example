import { configureStore, combineReducers } from '@reduxjs/toolkit';
import locationsReducer from './slices/locations';
import projectsReducer from './slices/projects';
import api from './middleware/api';

const reducer = combineReducers({
	locations: locationsReducer,
	projects: projectsReducer,
});

const store = configureStore({
	reducer: reducer,
	middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), api],
});

export default store;
