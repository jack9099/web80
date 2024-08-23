import ApiKeyModel from "../models/apikey.model.js";

const authMiddleWare = {
    verifyApiKey: async (req, res, next) => {
        try {
            const { apiKey } = req.query;
            if (!apiKey) throw new Error('Unauthorized!');
            // verify apikey
            const splitApiKey = String(apiKey).split('$');
            const userId = splitApiKey[1];
            const userName = splitApiKey[3];
            const randomString = splitApiKey[5];
            const checkValidApiKey = await ApiKeyModel.findOne({
                userId,
                userName,
                randomString
            });
            if (!checkValidApiKey) throw new Error('Unauthorized!');
            req.userId = userId;
            next();
        } catch (error) {
            res.status(401).send({
                message: error.message,
                data: null
            });
        }
    }
}
   
export default authMiddleWare;