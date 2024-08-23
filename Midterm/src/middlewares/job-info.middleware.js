const jobInfoMiddleWare = {
    createNewJobInfo: (req, res, next) => {
        try {
            const { personalSkills, personalProjects, workingProcess } = req.body;
            return next();
        } catch (error) {
            res.status(403).send({
                message: error.message
            });
        }
    }
}

export default jobInfoMiddleWare;