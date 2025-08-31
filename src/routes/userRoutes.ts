import {Router, Request, Response} from 'express';
import { RegisteredUser,LoggedInUser } from '../controllers/userControllers';

const router = Router();

// Simple GET route to test if the endpoint is working
router.get('/register', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Registration route is working!',
    timestamp: new Date().toISOString()
  });
});

router.get('/login', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Login route is working!',
    timestamp: new Date().toISOString()
  });
});


router.post('/register', RegisteredUser);
router.post('/login', LoggedInUser);

export default router;
