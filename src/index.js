import store from '../store/index';
import { projectAdded } from '../store/projects';
import { loadLocations } from '../store/locations';

store.dispatch(projectAdded({ title: 'Project 1' }));

store.dispatch(loadLocations());
