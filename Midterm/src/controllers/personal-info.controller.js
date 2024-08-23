import PersonalInfoModel from "../models/personal-info.model.js";

const personalInfoController = {
    createNewPersonalInfo: async (req, res) => {
        try {
            const { fullname, dateOfBirth, placeOfBirth, nationality, education } = req.body;
            const { userId } = req;
            const createdNewPersonalInfo = await PersonalInfoModel.create({
                userId,
                fullname,
                dateOfBirth,
                placeOfBirth,
                nationality,
                education
            });
            res.status(201).send({
                message: 'Successfully created new personal infomation!',
                data: createdNewPersonalInfo
            })
        } catch (error) {
            res.status(401).send({
                message: error.message,
                data: null
            });
        }
    }
}

export default personalInfoController;