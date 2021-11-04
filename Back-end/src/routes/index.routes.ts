import {Router} from 'express';

import childRoutes from './Child/child.routes';
import controlRoutes from './Control/control.routes';
const router = Router();

router.get('/', (req, res) => {
    return res.send('Welcome to my API!');
});

export default [router, childRoutes, controlRoutes]