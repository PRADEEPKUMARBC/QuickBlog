import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog', // ✅ Model name must be 'Blog'
        required: true
    },
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });  // ✅ Correct closing

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
