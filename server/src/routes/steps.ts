import { Router, Request, Response } from "express";
import { Step, Steps } from "../models/step";

const router = Router();

router.post("/add-steps", async (req: Request, res: Response) => {
  const { url, steps } = req.body as { url: string; steps: Step[] };

  if (!url || !steps) {
    res.send({ status: false, error: "URL and Steps are required" });
    return;
  }

  const stepsModel = Steps.build({ url, steps });
  await stepsModel.save();

  res.send({ status: true, data: stepsModel });
});

export { router as stepsRouter };
