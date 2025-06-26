// ===================================
// 1. lib/connectDB.js - Database Connection
// ===================================



// ===================================
// 2. models/StudentEnrollment.js - MongoDB Model
// ===================================

import mongoose from 'mongoose';


// ===================================
// 3. app/api/getUser/route.js - API Route (App Router)
// ===================================

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import StudentEnrollment from '@/models/StudentEnrollment';

// GET /api/getUser - Get all users or specific user
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const email = searchParams.get('email');
    const course = searchParams.get('course');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;

    let query = {};
    
    // Build query based on parameters
    if (id) query.id = parseInt(id);
    if (email) query.email = email;
    if (course) query.course = course;
    if (status) query.status = status;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query
    if (id || email) {
      // Get single user
      const user = await StudentEnrollment.findOne(query);
      
      if (!user) {
        return NextResponse.json(
          { success: false, message: 'User not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: user
      });
    } else {
      // Get multiple users with pagination
      const [users, totalCount] = await Promise.all([
        StudentEnrollment.find(query)
          .sort({ applicationDate: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        StudentEnrollment.countDocuments(query)
      ]);

      const totalPages = Math.ceil(totalCount / limit);

      return NextResponse.json({
        success: true,
        data: users,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      });
    }

  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// POST /api/getUser - Create new user
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'course', 'amount'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }

    // Generate next ID
    const lastUser = await StudentEnrollment.findOne().sort({ id: -1 });
    const nextId = lastUser ? lastUser.id + 1 : 1;

    const newUser = new StudentEnrollment({
      ...body,
      id: nextId
    });

    await newUser.save();

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      data: newUser
    }, { status: 201 });

  } catch (error) {
    console.error('Create User Error:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: 'Email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to create user',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// PUT /api/getUser - Update user
export async function PUT(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const email = searchParams.get('email');

    if (!id && !email) {
      return NextResponse.json(
        { success: false, message: 'User ID or email is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const query = id ? { id: parseInt(id) } : { email };

    const updatedUser = await StudentEnrollment.findOneAndUpdate(
      query,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });

  } catch (error) {
    console.error('Update User Error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to update user',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// DELETE /api/getUser - Delete user
export async function DELETE(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const email = searchParams.get('email');

    if (!id && !email) {
      return NextResponse.json(
        { success: false, message: 'User ID or email is required' },
        { status: 400 }
      );
    }

    const query = id ? { id: parseInt(id) } : { email };
    const deletedUser = await StudentEnrollment.findOneAndDelete(query);

    if (!deletedUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
      data: deletedUser
    });

  } catch (error) {
    console.error('Delete User Error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to delete user',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// ===================================
// 4. .env.local - Environment Variables
// ===================================

/*
MONGODB_URI=mongodb://localhost:27017/student_management
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student_management?retryWrites=true&w=majority

NODE_ENV=development
*/

// ===================================
// 5. package.json - Required Dependencies
// ===================================

/*
{
  "dependencies": {
    "mongoose": "^8.0.0",
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
*/