import ApiKeyModel from '../models/apikey.model.js';
import UserModel from '../models/user.model.js';
import bcrypt from 'bcrypt';

const userController = {
    // Register
    createNewUser: async (req, res) => {
        try {
            const { userName, password } = req.body;
            // Check if user already exists
            const existingUser = await UserModel.findOne({userName});
            if (existingUser) {
                return res.status(400).send({
                    message: 'User already exists!',
                    data: null
                })
            };

            // Create new user
            // hash password
            const hashedPassword = bcrypt.hashSync(password, 10)
            const createdNewUser = await UserModel.create({
                userName,
                password: hashedPassword
            });
            res.status(201).send({
                message: 'Successfully created new user!',
                data: createdNewUser
            });
        } catch (error) {
            res.status(500).send({
                message: error.message,
                data: null
            });
        }
    res.end();
    },

    // Login
    Login: async (req, res) => {
        const { userName } = req.body;
        try {
            // Check if user exists
            const user = await UserModel.findOne({ userName }).select('password');
            if (!user)
                return res.status(401).send({
                    data: null,
                    message: 'Invalid username or password!',
                });
            // if user exists
            // validate password
            const isPasswordValid = await bcrypt.compare(
                `${req.body.password}`,
                user.password
            );
            // if not valid, return unathorized response
            if (!isPasswordValid)
                return res.status(401).send({
                    data: null,
                    message:
                        'Invalid username or password!',
                });
            // generate and save apikey
            const randomString = crypto.randomUUID();
            const apiKey = `web80-$${user._id}$-$${userName}$-$${randomString}$`;
            await ApiKeyModel.deleteMany({
                userId: user._id.toString(),
                userName
            });
            await ApiKeyModel.create({
                userId: user._id.toString(),
                userName,
                randomString
            });
            // return user info and apikey
            const userData = {
                userId: user._id,
                userName: userName
            }
            res.status(200).send({
                data: userData,
                message: 'You have successfully logged in.',
                apiKey: apiKey
            });
        } catch (error) {
            res.status(500).send({
                data: null,
                message: error.message
            });
        }
        res.end();
    }
}

export default userController;