//api documentation for registering a user route

/**
 * @openapi
 * /user/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     description: Registers a new user with the provided details such as email, password, profile info, and company details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Email
 *               - mobileNumber
 *               - firstName
 *               - lastName
 *               - Password
 *               - Country
 *               - State
 *               - additionalAddress
 *               - zipCode
 *               - Language
 *               - Bio
 *               - Overview
 *               - Profession
 *             properties:
 *               Email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               mobileNumber:
 *                 type: number
 *                 description: The user's mobile number.
 *               firstName:
 *                 type: string
 *                 description: The user's first name.
 *               lastName:
 *                 type: string
 *                 description: The user's last name.
 *               Password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *               Country:
 *                 type: string
 *                 description: The user's country of residence.
 *               State:
 *                 type: string
 *                 description: The user's state of residence.
 *               additionalAddress:
 *                 type: string
 *                 description: Additional address information.
 *               zipCode:
 *                 type: number
 *                 description: Postal/ZIP code.
 *               ProfilePicture:
 *                 type: object
 *                 description: The user's profile picture.
 *               Language:
 *                 type: string
 *                 description: The language the user speaks.
 *               Bio:
 *                 type: string
 *                 description: A short bio of the user.
 *               LinkedIn:
 *                 type: string
 *                 description: The user's LinkedIn profile URL.
 *               Facebook:
 *                 type: string
 *                 description: The user's Facebook profile URL.
 *               Twitter:
 *                 type: string
 *                 description: The user's Twitter profile URL.
 *               Skills:
 *                 type: object
 *                 description: The user's skills.
 *               Overview:
 *                 type: string
 *                 description: Overview of the user's professional background.
 *               Profession:
 *                 type: string
 *                 description: The user's profession.
 *               rating:
 *                 type: number
 *                 description: User's professional rating.
 *               Portfolio:
 *                 type: string
 *                 description: The user's portfolio URL.
 *               companyLogo:
 *                 type: string
 *                 description: The company's logo URL.
 *               companyName:
 *                 type: string
 *                 description: The user's company name.
 *               companyPosition:
 *                 type: string
 *                 description: The user's position in the company.
 *               companySize:
 *                 type: string
 *                 description: The size of the user's company.
 *               companyAddress:
 *                 type: string
 *                 description: The company's address.
 *               companyDescription:
 *                 type: string
 *                 description: A description of the user's company.
 *               companyLinkedIn:
 *                 type: string
 *                 description: The company's LinkedIn profile URL.
 *               companyFacebook:
 *                 type: string
 *                 description: The company's Facebook page URL.
 *               companyTwitter:
 *                 type: string
 *                 description: The company's Twitter profile URL.
 *               companyWebsite:
 *                 type: string
 *                 description: The company's website URL.
 *               companyPhone:
 *                 type: number
 *                 description: The company's contact number.
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                 token:
 *                   type: string
 *                   description: JWT authentication token.
 *       400:
 *         description: Bad request - Invalid or missing data
 *       409:
 *         description: Conflict - User already exists
 */
