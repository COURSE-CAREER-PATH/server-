//api documentation for registering a user route

/**
 * @openapi
 * /user/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     description: Registers a new user with email, username, and password, and sends a verification email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Email
 *               - userName
 *               - Password
 *             properties:
 *               Email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               userName:
 *                 type: string
 *                 description: The user's username.
 *               Password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *     responses:
 *       201:
 *         description: User registered successfully and verification email sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                 _id:
 *                   type: string
 *                   description: The ID of the registered user.
 *                 Email:
 *                   type: string
 *                   description: The user's email address.
 *                 userName:
 *                   type: string
 *                   description: The user's username.
 *                 token:
 *                   type: string
 *                   description: JWT authentication token.
 *       400:
 *         description: Bad request - Invalid or missing data
 *       409:
 *         description: Conflict - User already exists
 */

//api documentation for authenticating  a user route

/**
 * @openapi
 * /user/authenticate:
 *   post:
 *     tags:
 *       - Users
 *     summary: Authenticate a user
 *     description: Authenticates a user by checking the email or mobile number and password. If the user is not verified, a verification email is sent.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Email
 *               - Password
 *             properties:
 *               Email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               mobileNumber:
 *                 type: number
 *                 description: The user's mobile number.
 *               Password:
 *                 type: string
 *                 format: password
 *                 description: The user's password.
 *     responses:
 *       201:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                 _id:
 *                   type: string
 *                   description: The ID of the authenticated user.
 *                 Email:
 *                   type: string
 *                   description: The user's email address.
 *                 userName:
 *                   type: string
 *                   description: The user's username.
 *                 token:
 *                   type: string
 *                   description: JWT authentication token.
 *       400:
 *         description: Bad request - User not verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Verification message.
 *       401:
 *         description: Unauthorized - Invalid credentials
 *       404:
 *         description: Not Found - User not found
 *       500:
 *         description: Internal Server Error
 */

//api documentation for verifying  a users email  route

/**
 * @openapi
 * /user/{id}/verify/{token}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Verify user's email
 *     description: Verifies a user's email using the provided token.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user.
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: The verification token.
 *     responses:
 *       200:
 *         description: Email verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *       400:
 *         description: Bad request - Invalid link
 *       500:
 *         description: Internal Server Error
 */

//api documentation for google sign in and sign up

/**
 * @openapi
 * /user/googleSignup:
 *   post:
 *     tags:
 *       - Users
 *     summary: Google Sign-Up
 *     description: Registers or signs in a user using Google credentials. If the user already exists, updates the username if necessary.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Email
 *               - userName
 *               - uid
 *             properties:
 *               Email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               userName:
 *                 type: string
 *                 description: The user's username.
 *               uid:
 *                 type: string
 *                 description: Firebase UID for the user.
 *     responses:
 *       201:
 *         description: User signed up or signed in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                 _id:
 *                   type: string
 *                   description: The ID of the user.
 *                 Email:
 *                   type: string
 *                   description: The user's email address.
 *                 userName:
 *                   type: string
 *                   description: The user's username.
 *                 token:
 *                   type: string
 *                   description: JWT authentication token.
 *       500:
 *         description: Internal Server Error
 */

//api documentation for uploading users profile

/**
 * @openapi
 * /user/updatePersonalUserInfo:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update personal user information
 *     description: Updates the user's personal information except for uid and email. Other fields such as userName, Password, Verified, etc., can be updated.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: The user's updated username.
 *               firstName:
 *                 type: string
 *                 description: The user's updated first name.
 *               middleName:
 *                 type: string
 *                 description: The user's updated middle name.
 *               lastName:
 *                 type: string
 *                 description: The user's updated last name.
 *               Password:
 *                 type: string
 *                 format: password
 *                 description: The user's updated password.
 *               Verified:
 *                 type: boolean
 *                 description: Indicates whether the user is verified.
 *               Country:
 *                 type: string
 *                 description: The user's updated country of residence.
 *               State:
 *                 type: string
 *                 description: The user's updated state of residence.
 *               additionalAddress:
 *                 type: string
 *                 description: Additional address information.
 *               zipCode:
 *                 type: number
 *                 description: Updated postal/ZIP code.
 *               ProfilePicture:
 *                 type: object
 *                 description: Updated profile picture information.
 *               Language:
 *                 type: string
 *                 description: The updated language the user speaks.
 *               Bio:
 *                 type: string
 *                 description: Updated short bio of the user.
 *               LinkedIn:
 *                 type: string
 *                 description: The updated LinkedIn profile URL.
 *               Facebook:
 *                 type: string
 *                 description: The updated Facebook profile URL.
 *               Twitter:
 *                 type: string
 *                 description: The updated Twitter profile URL.
 *               Skills:
 *                 type: object
 *                 description: Updated skills information.
 *               Overview:
 *                 type: string
 *                 description: Updated overview of the user's professional background.
 *               Profession:
 *                 type: string
 *                 description: The updated profession.
 *               rating:
 *                 type: number
 *                 description: Updated professional rating.
 *               Portfolio:
 *                 type: string
 *                 description: The updated portfolio URL.
 *               companyLogo:
 *                 type: string
 *                 description: Updated company logo URL.
 *               companyName:
 *                 type: string
 *                 description: Updated company name.
 *               companyPosition:
 *                 type: string
 *                 description: Updated company position.
 *               companySize:
 *                 type: string
 *                 description: Updated company size.
 *               companyAddress:
 *                 type: string
 *                 description: Updated company address.
 *               companyDescription:
 *                 type: string
 *                 description: Updated company description.
 *               companyLinkedIn:
 *                 type: string
 *                 description: Updated company LinkedIn profile URL.
 *               companyFacebook:
 *                 type: string
 *                 description: Updated company Facebook page URL.
 *               companyTwitter:
 *                 type: string
 *                 description: Updated company Twitter profile URL.
 *               companyWebsite:
 *                 type: string
 *                 description: Updated company website URL.
 *               companyPhone:
 *                 type: number
 *                 description: Updated company contact number.
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success status of the operation.
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                 user:
 *                   type: object
 *                   description: Updated user information.
 *       400:
 *         description: Bad request - User not authenticated or invalid data
 *       500:
 *         description: Internal Server Error
 */
