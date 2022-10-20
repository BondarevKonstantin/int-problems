import prisma from '../db';

// Get all

export const getProblems = async (req, res) => {
  const problems = await prisma.problem.findMany();

  res.json({ data: problems });
};

// Create one

export const createProblem = async (req, res) => {
  console.log(req);

  const problem = await prisma.problem.create({
    data: {
      startingPosition: req.body.startingPosition,
      movesData: req.body.movesData,
      rating: req.body.rating,
      goal: req.body.goal,
      creatorId: req.user.id,
    },
  });

  res.json({ data: problem });
};
