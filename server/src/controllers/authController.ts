import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    
    const admin = await Admin.findOne({ username, isActive: true });
    
    if (!admin || !(await admin.comparePassword(password))) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    
    admin.lastLogin = new Date();
    await admin.save();
    
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

export const verifyToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const admin = await Admin.findById(req.admin?.id).select('-password');
    
    if (!admin || !admin.isActive) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }
    
    res.json({ admin });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying token', error });
  }
};

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const admin = new Admin(req.body);
    await admin.save();
    
    res.status(201).json({
      message: 'Admin created successfully',
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating admin', error });
  }
};
