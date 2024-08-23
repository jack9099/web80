import moongose from 'mongoose';
import { CollectionMongo } from './config.js';

const moreInfoSchema = new moongose.Schema({
    userId: {
        type: String,
        required: true
    },
    hobbies: {
        type: Array,
        default: ''
    },
    personalGoals: {
        type: Array,
        default: ''
    }
}, {
    timestamps: true
});

const MoreInfoModel = moongose.model(CollectionMongo.moreInfo, moreInfoSchema);

export default MoreInfoModel;