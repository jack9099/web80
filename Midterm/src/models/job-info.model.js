import moongose from 'mongoose';
import { CollectionMongo } from './config.js';

const jobInfoSchema = new moongose.Schema({
    userId: {
        type: String,
        required: true
    },
    personalSkills: {
        type: Array,
        default: ''
    },
    personalProjects: {
        projectName: {
            type: String,
            default: ''
        },
        projectContent: {
            type: String,
            default: ''
        },
        projectsRole: {
            type: String,
            default: ''
        },
        projectStartDate: {
            type: Date,
            default: ''
        },
        projectEndDate: {
            type: Date,
            default: ''
        },
        completionTime: {
            type: String,
            default: ''
        }
    },
    workingProcess: {
        startDate: {
            type: Date,
            default: ''
        },
        endDate: {
            type: Date,
            default: ''
        },
        companyName: {
            type: String,
            default: ''
        },
        role: {
            type: String,
            default: ''
        }
    }
}, {
    timestamps: true
});

const JobInfoModel = moongose.model(CollectionMongo.jobInfo, jobInfoSchema);

export default JobInfoModel;