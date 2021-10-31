import store from '../store/index';
import { projectAdded } from '../store/slices/projects';
import { loadLocations } from '../store/slices/locations';

store.dispatch(projectAdded({ title: 'Project 1' }));

store.dispatch(loadLocations());
console.log('store.getState(): ', store.getState());
