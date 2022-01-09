import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default mongoose.model("SubCategory", Schema({
    parent_id: {
        type: Number,
    },
    categories: {
        type: [
            Schema.Types.Mixed
        ]
    }
}));