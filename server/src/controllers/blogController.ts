import { Request, Response } from 'express';
import { Blog } from '../models/Blog';
import { clearCache } from '../utils/cache';

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const { tag, search, page = 1, limit = 10 } = req.query;
    const query: any = { isPublished: true };
    
    if (tag) {
      query.tags = tag;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }
    
    const skip = (Number(page) - 1) * Number(limit);
    
    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .select('-content -__v'),
      Blog.countDocuments(query),
    ]);
    
    res.json({
      blogs,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error });
  }
};

export const getBlogBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });
    
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }
    
    blog.views += 1;
    await blog.save();
    
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog', error });
  }
};

export const getAllBlogs = async (_req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    const blog = new Blog(req.body);
    if (blog.isPublished && !blog.publishedAt) {
      blog.publishedAt = new Date();
    }
    await blog.save();
    clearCache('/api/blogs');
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ message: 'Error creating blog', error });
  }
};

export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }
    
    if (req.body.isPublished && !blog.isPublished && !req.body.publishedAt) {
      req.body.publishedAt = new Date();
    }
    
    Object.assign(blog, req.body);
    await blog.save();
    
    clearCache('/api/blogs');
    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: 'Error updating blog', error });
  }
};

export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }
    
    clearCache('/api/blogs');
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error });
  }
};
