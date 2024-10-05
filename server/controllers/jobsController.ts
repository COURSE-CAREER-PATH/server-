import jobModel from "../models/jobs";
import UserModel from "../models/userModel";
import cloudinary from "../utils/cloudinary";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

interface JobsInterface extends Request {
  user?: {
    id: string;
  };
  body: {
    JobTitle: string;
    JobImage: string;
    JobCompany: string;
    CREJ: string;
    posterId: string;
  };
}

// @description Post a New Job
// @route /jobs/post
// @access private
const postJobs = asyncHandler(
  async (req: JobsInterface, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res
          .status(400)
          .json({ success: false, message: "User not authenticated" });
        return;
      }
      const { JobTitle, JobCompany, CREJ } = req.body;

      const newJob = new jobModel({
        JobTitle,
        JobCompany,
        CREJ,
        posterId: userId,
      });

      const job = await newJob.save();
      if (job) {
        res.status(201).json({
          message: "Job uploaded successfully",
          JobTitle: job.JobTitle,
          JobCompany: job.JobCompany,
          CREJ: job.CREJ,
        });
      }
    } catch (err) {
      res.status(400).json({ message: "Could not post Job " });
    }
  }
);

// @description Get All Jobs
// @route /jobs/allJobs
// @access private
const getAllJobs = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const jobs = await jobModel.find().exec();
      if (jobs) {
        res.status(201).json({
          message: "Jobs Gotten successfully",
          jobs: jobs,
        });
      }
    } catch (error) {
      res.status(400).json({ message: "Could not Jobs " });
    }
  }
);

// @description Get Jobs by Course
// @route /jobs/courseJobs
// @access private
const getJobsByCourse = asyncHandler(
  async (req: JobsInterface, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res
          .status(400)
          .json({ success: false, message: "User not authenticated" });
        return;
      }

      const user = await UserModel.findById(userId).exec();
      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
        return;
      }

      var course = user.Course;

      const jobs = await jobModel.find({ CREJ: course }).exec();

      if (jobs.length === 0) {
        res.status(404).json({
          success: false,
          message: "No Jobs found for your course",
        });
        return;
      }

      res.status(201).json({
        message: "Jobs retrieved successfully",
        jobs: jobs,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "INternal Server Error. ",
        error,
      });
    }
  }
);

export { postJobs, getAllJobs, getJobsByCourse };
