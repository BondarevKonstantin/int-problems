import { Router } from 'express';

const router = Router();

router.get('/probmem', (req, res) => {
  res.json({ message: 'problem' });
});

router.get('/problem/:id', (req, res) => {});

router.post('/problem', (req, res) => {});

router.put('/problem/:id', (req, res) => {});

router.delete('/problem/:id', (req, res) => {});

export default router;
