import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,       // Bắt buộc phải có userId
    index: true,          // Tạo index để tìm nhanh theo user
  },
  type: {
    type: String,
    enum: ['mute', 'ban', 'warn', 'kick'], // Giới hạn loại hành động
    required: true,
  },
  reason: {
    type: String,
    default: 'Không có lý do được cung cấp',
  },
  expiresAt: {
    type: Date,           // Mongo sẽ tự lưu timestamp dạng ISODate
    default: null,        // null nếu là hành động vĩnh viễn (ban không thời hạn)
  },
  moderatorActioned: {
    type: String,         // ID hoặc username của mod
    required: true,
  },
}, {
  timestamps: true,        // Tự động thêm createdAt và updatedAt
});

const ViolationModel = mongoose.model('violations', Schema, 'violations');

export default ViolationModel;