import * as tripController from './tripController.js';
import express from 'express';

export const router = express.Router();

router.get('/',tripController.getTrips);
router.post('/',tripController.createTrip);

router.get("/:id", tripController.getTrip);
router.patch("/:id", tripController.updateTrip);
router.delete("/:id", tripController.deleteTrip);

