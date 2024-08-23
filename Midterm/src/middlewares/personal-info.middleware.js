const personalInfoMiddleWare = {
    createNewPersonalInfo: (req, res, next) => {
        try {
            const { fullname, dateOfBirth, placeOfBirth, nationality, education} = req.body;
            if(!fullname) throw new Error('Fullname is required!');
            if(!dateOfBirth) throw new Error('Date of birth is required!');
            if(!placeOfBirth) throw new Error('Place of birth is required!');
            if(!nationality) throw new Error('Nationality is required!');
            if(!education) throw new Error('Education is required!');
            return next();
        } catch (error) {
            res.status(403).send({
                message: error.message
            });
        }
    }
}

export default personalInfoMiddleWare;