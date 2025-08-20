// import mongoose from 'mongoose';


// const blogSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     subTitle: {
//         type: String,
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     category: {
//         type: String,
//         required: true,
//     },
//     isPublished: {
//         type: Boolean,
//         default: false,
//     },
// },{timestamps: true});

// const Blog = mongoose.model('Blog', blogSchema);

// export default Blog;

import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subTitle: { type: String },
    description: { type: String, required: true },
    category: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
    image: { type: String }
}, { timestamps: true });

// ✅ Check if already compiled, then reuse it.
const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;
