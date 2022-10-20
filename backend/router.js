import { Router } from 'express';
import { getProblems, createProblem } from './handlers/problems.js';

const router = Router();

router.get('/problems', getProblems);

router.get('/problem/:id', (req, res) => {});

router.post('/problem', createProblem);

router.put('/problem/:id', (req, res) => {});

router.delete('/problem/:id', (req, res) => {});

export default router;
