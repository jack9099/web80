const moreInfoMiddleWare = {
    createNewMoreInfo: (req, res, next) => {
        try {
            const { hobbies, personalGoals } = req.body;
            if(!hobbies) throw new Error('Hobbies are required!');
            if(!personalGoals) throw new Error('Personal goals are required!');
            return next();
        } catch (error) {
            res.status(403).send({
                message: error.message
            });
        }
    }
}

export default moreInfoMiddleWare;