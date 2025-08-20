// import mongoose from 'mongoose';

// const blogSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     subTitle: { type: String },
//     description: { type: String, required: true },
//     category: { type: String, required: true },
//     isPublished: { type: Boolean, default: false },
//     image: { type: String, required: true }
// }, { timestamps: true });

// // ✅ Default Export
// const Blog = mongoose.model('Blog', blogSchema);
// export default Blog;


import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subTitle: { type: String },
    description: { type: String, required: true },
    category: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
    image: { type: String, required: true }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
