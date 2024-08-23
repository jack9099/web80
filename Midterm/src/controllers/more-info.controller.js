import MoreInfoModel from "../models/more-info.model.js";

const moreInfoController = {
    createNewMoreInfo: async (req, res) => {
        try {
            const { hobbies, personalGoals } = req.body;
            const { userId } = req;
            const createdNewMoreInfo = await MoreInfoModel.create({
                userId,
                hobbies,
                personalGoals
            });
            res.status(201).send({
                message: 'Successfully created new more infomation!',
                data: createdNewMoreInfo
            })
        } catch (error) {
            res.status(401).send({
                message: error.message,
                data: null
            });
        }
    }
}

export default moreInfoController;