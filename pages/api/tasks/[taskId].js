import { connectDb } from "@/utils/dbCon";
import Task from "@/models/Task";

connectDb(); //Connect to database

export default async (req, res) => {
  //Function name not necesary
  const {
    method,
    body,
    query: { taskId },
  } = req;

  switch (method) {
    case "GET":
      // Get single task by id
      try {
        try {
          const task = await Task.findById(taskId);
          if (!task) return res.status(404).json({ msg: "Task not found" });
          return res.status(200).json(task);
        } catch (err) {
          return res.status(400).json({ msg: err.message });
        }
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    case "DELETE":
      try {
        const task = await Task.findByIdAndDelete(taskId);
        if (!task) return res.status(404).json("Task not found");
        return res.status(200).json("Task Deleted");
      } catch (error) {
        return res.status(400).json(error.message);
      }

    case "PUT":
      try {
        const task = await Task.findByIdAndUpdate(taskId, body, { new: true });
        if (!task) return res.status(404).json("Task Not Found");
        return res.status(200).json("Task Updated");
      } catch (error) {
        return res.status(500).json(error.message);
      }

    default:
      return res.status(400).json({ msg: "Method not supported" });
  }
};
