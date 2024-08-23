import JobInfoModel from "../models/job-info.model.js";

const jobInfoController = {
    createNewJobInfo: async (req, res) => {
        try {
            const { personalSkills } = req.body;
            const { userId } = req;
            const { projectName, projectContent, projectsRole, projectStartDate, projectEndDate, completionTime } = req.body;
            const createdpersonalProjects = JobInfoModel.create({
                userId,
                projectName,
                projectContent,
                projectsRole,
                projectStartDate,
                projectEndDate,
                completionTime
            });
            const { startDate, endDate, companyName, role } = req.body;
            const createdworkingProcess = JobInfoModel.create({
                userId,
                startDate,
                endDate,
                companyName,
                role
            })
            const createdNewJobInfo = await JobInfoModel.create({
                userId,
                personalSkills,
                createdpersonalProjects,
                createdworkingProcess
            });
            res.status(201).send({
                message: 'Successfully created new more infomation!',
                data: createdNewJobInfo
            })
        } catch (error) {
            res.status(401).send({
                message: error.message,
                data: null
            });
        }
    }
}

export default jobInfoController;