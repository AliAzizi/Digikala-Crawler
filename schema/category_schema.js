import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default mongoose.model("Category", Schema({
    type: {
        type: String
    },
    data: {
        title: {
            type: String
        },
        child: {
            type: [
                Schema.Types.Mixed
            ]
        },
        url: {
            url: {
                type: String
            },
            page: {
                type: String
            },
            params: {
                category_id: {
                    type: Number
                }
            },
            queries: {
                type: Array
            }
        }
    }
}));