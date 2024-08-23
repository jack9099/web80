const userMiddleWare = {
    checkMissing: (req, res, next) => {
        try {
            const { userName, password } = req.body;
            if(!userName) throw new Error('Username is required!');
            if(!password) throw new Error('Password is required!');
            return next();
        } catch (error) {
            res.status(403).send({
                message: error.message
            });
        }
    }
}

export default userMiddleWare;