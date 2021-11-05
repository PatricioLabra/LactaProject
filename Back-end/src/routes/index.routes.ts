import {Router} from 'express';

import adminRoutes from './Admin/admin.routes'
import childRoutes from './Child/child.routes';
import controlRoutes from './Control/control.routes';
import motherRoutes from './Mother/mother.routes';
import profesionalRoutes from './Profesional/profesional.routes';

const router = Router();

router.get('/', (req, res) => {
    return res.send('Welcome to my API!');
});

export default [router, adminRoutes,childRoutes, controlRoutes, motherRoutes, profesionalRoutes]