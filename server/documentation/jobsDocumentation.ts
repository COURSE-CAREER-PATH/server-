/**
 * @openapi
 * /jobs/post:
 *   post:
 *     tags:
 *       - Jobs
 *     summary: Post a new job
 *     description: Allows an authenticated user to post a new job.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - JobTitle
 *               - JobCompany
 *               - CREJ
 *             properties:
 *               JobTitle:
 *                 type: string
 *                 description: Title of the job.
 *                 example: "Software Engineer"
 *               JobCompany:
 *                 type: string
 *                 description: The company offering the job.
 *                 example: "TechCorp"
 *               CREJ:
 *                 type: string
 *                 description: Course related to the job.
 *                 example: "Computer Science"
 *     responses:
 *       201:
 *         description: Job uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Job uploaded successfully"
 *                 JobTitle:
 *                   type: string
 *                   example: "Software Engineer"
 *                 JobCompany:
 *                   type: string
 *                   example: "TechCorp"
 *                 CREJ:
 *                   type: string
 *                   example: "Computer Science"
 *       400:
 *         description: User not authenticated or could not post the job
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not authenticated"
 */

/**
 * @openapi
 * /jobs/allJobs:
 *   get:
 *     tags:
 *       - Jobs
 *     summary: Get all jobs
 *     description: Retrieves all the jobs posted.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Jobs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Jobs retrieved successfully"
 *                 jobs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       JobTitle:
 *                         type: string
 *                         example: "Software Engineer"
 *                       JobCompany:
 *                         type: string
 *                         example: "TechCorp"
 *                       CREJ:
 *                         type: string
 *                         example: "Computer Science"
 *       400:
 *         description: Could not retrieve jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Could not retrieve jobs"
 */

/**
 * @openapi
 * /jobs/courseJobs:
 *   get:
 *     tags:
 *       - Jobs
 *     summary: Get jobs by course
 *     description: Retrieves jobs based on the user's course.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Jobs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Jobs retrieved successfully"
 *                 jobs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       JobTitle:
 *                         type: string
 *                         example: "Software Engineer"
 *                       JobCompany:
 *                         type: string
 *                         example: "TechCorp"
 *                       CREJ:
 *                         type: string
 *                         example: "Computer Science"
 *       400:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not authenticated"
 *       404:
 *         description: No jobs found for the course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No jobs found for your course"
 */
