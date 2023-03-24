import { connectDb } from "@/utils/dbCon";
import Task from "@/models/Task";

connectDb();

// export default function handler(req, res) {
//   res.status(200).json("Called Api");
// }

export default async function task(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const tasks = await Task.find();
        return res.status(200).json(tasks);
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }

    case "POST":
      try {
        const newtask = new Task(req.body);
        const savedTask = await newtask.save();
        return res.status(201).json(savedTask);
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }

    case "GET":
      return res.status(200).json(tasks);
    default:
      return res.status(400).json("Invalid Method");
  }
}
