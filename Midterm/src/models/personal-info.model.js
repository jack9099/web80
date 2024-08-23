import moongose from 'mongoose';
import { CollectionMongo } from './config.js';

const personalInfoSchema = new moongose.Schema({
    userId: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        default: ''
    },
    dateOfBirth: {
        type: Date,
        default: ''
    },
    placeOfBirth: {
        type: String,
        default: ''
    },
    nationality: {
        type: String,
        default: ''
    },
    education: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

const PersonalInfoModel = moongose.model(CollectionMongo.personalInfo, personalInfoSchema); 

export default PersonalInfoModel;