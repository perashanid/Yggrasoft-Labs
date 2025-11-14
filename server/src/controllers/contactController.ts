import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import Contact from '../models/Contact';
import { AppError } from '../middleware/errorHandler';
import { sendContactNotification, sendContactConfirmation } from '../utils/emailService';

export const submitContact = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
      return;
    }

    const { name, email, subject, message } = req.body;

    // Create new contact
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      status: 'new',
    });

    console.log(`📝 Contact form submission saved: ${contact._id}`);

    // Send email notifications
    const emailResults = {
      adminNotification: false,
      userConfirmation: false,
    };

    try {
      // Send admin notification
      emailResults.adminNotification = await sendContactNotification(
        name,
        email,
        subject || '',
        message
      );

      // Send user confirmation
      emailResults.userConfirmation = await sendContactConfirmation(name, email);

      // Log email sending status
      if (emailResults.adminNotification && emailResults.userConfirmation) {
        console.log(`✅ All email notifications sent successfully for contact ${contact._id}`);
      } else if (emailResults.adminNotification || emailResults.userConfirmation) {
        console.warn(
          `⚠️ Partial email success for contact ${contact._id}: Admin=${emailResults.adminNotification}, User=${emailResults.userConfirmation}`
        );
      } else {
        console.error(`❌ All email notifications failed for contact ${contact._id}`);
      }
    } catch (emailError) {
      // Log error but don't fail the request since contact was saved
      console.error(`❌ Error sending email notifications for contact ${contact._id}:`, emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        id: contact._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllContacts = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      throw new AppError('Contact not found', 404);
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};
