import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const genUniqueCode = () => {
  return 'PROD-' + Date.now().toString(36).toUpperCase() + 
         Math.random().toString(36).substring(2, 5).toUpperCase();
};
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    default: genUniqueCode,
    index: true
  },
  price: {
    type: Number,
    required: true,
    index: true
  },
  status: {
    type: Boolean,
    default: true,
    index: true
  },
  stock: {
    type: Number,
    required: true,
    index: true
  },
  category: {
    type: String,
    required: true,
    index: true,
    enum: [],
    trim: true
  },
  thumbnails: {
    type: [String],
    default: []
  },
  featured: {
    type: Boolean,
    default: false,
    index: true
  }
}, {
  timestamps: true,
  autoIndex: true
});

productSchema.index({ 
  title: 'text', 
  description: 'text',
  category: 'text'
}, {
  weights: {
    title: 3,
    description: 1,
    category: 2
  },
  name: 'text_search_index'
});

productSchema.index({ 
  category: 1, 
  price: 1,
  stock: 1 
});

productSchema.index({ 
  status: 1, 
  stock: 1 
}, {
  partialFilterExpression: { 
    status: true,
    stock: { $gt: 0 }
  },
  name: 'available_products_index'
});

productSchema.plugin(mongoosePaginate);

productSchema.pre('save', function(next) {
  this.title = this.title.trim();
  this.description = this.description.trim();
  this.category = this.category.trim().toLowerCase();
  next();
});

export const Product = mongoose.model('Product', productSchema);