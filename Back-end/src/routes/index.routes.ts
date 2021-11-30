import {Router} from 'express';

import userRoutes from './User/user.routes'
import childRoutes from './Child/child.routes';
import controlRoutes from './Control/control.routes';
import motherRoutes from './Mother/mother.routes';
import graficRoutes from './Graphic/graphic.routes';

const router = Router();

router.get('/', (req, res) => {
    return res.send('Welcome to my API!');
});

export default [router, userRoutes,childRoutes, controlRoutes, motherRoutes, graficRoutes];
