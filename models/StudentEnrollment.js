
import mongoose from 'mongoose';

const studentEnrollmentSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^\+91\s?[6-9]\d{9}$/, 'Please enter a valid Indian phone number']
  },
  
  address: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  
  course: {
    type: String,
    required: true,
    enum: [
      'Full Stack Development',
      'Data Science',
      'Digital Marketing',
      'UI/UX Design',
      'Mobile App Development',
      'DevOps',
      'Cybersecurity'
    ]
  },
  
  experience: {
    type: String,
    required: true,
    enum: ['Fresher', 'Beginner', 'Intermediate', 'Advanced'],
    default: 'Fresher'
  },
  
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  
  paymentStatus: {
    type: String,
    required: true,
    enum: ['Pending', 'Partial', 'Completed', 'Refunded'],
    default: 'Pending'
  },
  
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Inactive', 'Completed', 'Dropped', 'Suspended'],
    default: 'Active'
  },
  
  applicationDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  
  completionDate: {
    type: Date,
    default: null
  }
}, {
  timestamps: true,
  versionKey: false
});

// Indexes
studentEnrollmentSchema.index({ email: 1 });
studentEnrollmentSchema.index({ phone: 1 });
studentEnrollmentSchema.index({ course: 1, status: 1 });
studentEnrollmentSchema.index({ applicationDate: -1 });

// Prevent re-compilation during development
const StudentEnrollment = mongoose.models.StudentEnrollment || 
  mongoose.model('StudentEnrollment', studentEnrollmentSchema);

export default StudentEnrollment;
