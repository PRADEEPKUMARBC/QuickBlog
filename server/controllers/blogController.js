import fs from 'fs';
import mongoose from 'mongoose';
import Blog from '../models/blogModel.js';
//import imagekit from '../configs/imageKit.js';
import Comment from '../models/Comment.js';
import main from '../configs/geminii.js';

// ✅ Add Blog
export const addBlog = async (req, res) => {
    try {
        if (!req.body.blog) {
            return res.status(400).json({ success: false, message: "Missing 'blog' in form-data" });
        }

        let blogData;
        try {
            blogData = JSON.parse(req.body.blog);
        } catch {
            return res.status(400).json({ success: false, message: "Invalid JSON in 'blog'" });
        }

        const { title, subTitle, description, category, isPublished } = blogData;
        const imageFile = req.file;

        if (!title || !description || !category) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        if (!imageFile) {
            return res.status(400).json({ success: false, message: "Image is required" });
        }

        const fileBuffer = fs.readFileSync(imageFile.path);

        const uploadResponse = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blog"
        });

        const optimizedImageUrl = imagekit.url({
            path: uploadResponse.filePath,
            transformation: [{ quality: "auto" }, { format: "webp" }, { width: 1280 }]
        });

        const blog = await Blog.create({
            title,
            subTitle,
            description,
            category,
            isPublished,
            image: optimizedImageUrl
        });

        res.json({ success: true, message: "Blog added successfully", data: blog });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get All Blogs
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json({ success: true, blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get Blog by ID
export const getBlogById = async (req, res) => {
    const { blogId } = req.params;
    if (!mongoose.isValidObjectId(blogId)) {
        return res.status(400).json({ success: false, message: "Invalid blog ID" });
    }
    try {
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        res.json({ success: true, blog });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Delete Blog by ID
export const deleteBlogById = async (req, res) => {
    const { blogId } = req.params;
    // if (!mongoose.isValidObjectId(blogId)) {
    //     return res.status(400).json({ success: false, message: "Invalid blog ID" });
    // }
    try {
        await Blog.findByIdAndDelete(blogId);
        //Delete all comment associated with Blog
        await Comment.deleteMany({blog: id})
        res.json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Toggle Publish
export const togglePublish = async (req, res) => {
    const { blogId } = req.params;
    if (!mongoose.isValidObjectId(blogId)) {
        return res.status(400).json({ success: false, message: "Invalid blog ID" });
    }
    try {
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        blog.isPublished = !blog.isPublished;
        await blog.save();

        res.json({
            success: true,
            message: 'Blog status updated',
            data: { _id: blog._id, isPublished: blog.isPublished }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const addComment = async (req, res) => {
    try {
        const {blog, name, content} = req.body;
        await Comment.create({blog,name,content});
        res.json({success: true, message: 'comment added for review'})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// export const getBlogComments = async (req, res) => {
//     try {

//     } catch (error) {
//         res.json({sucess: false, message: error.message})
//     }
// }

export const getBlogComments = async (req, res) => {
    try {
        const {blogId} = req.body;
        const comments = await Comment.find({blog: blogId, isApproved: true}).sort({createdAt: -1});
        res.json({success: true, comments})
    } catch (error) {
        res.json ({succes: false, message:error.message})
    }
}

export const generateContent = async (req,res) => {
    try {
        const {prompt} = req.body;
        const content = await main (prompt + ' generate a blog content for this topic in simple text format')
        res.json({success: true, content });
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}