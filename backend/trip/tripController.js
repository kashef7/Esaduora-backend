import Trip from './tripModules.js';
import * as factory from '../utils/crudFactory.js';

export const getTrips = factory.getAll(Trip);

export const createTrip = factory.createDoc(Trip);

export const updateTrip = factory.updateDoc(Trip);

export const deleteTrip = factory.deleteDoc(Trip);

export const getTrip = factory.getDoc(Trip);
