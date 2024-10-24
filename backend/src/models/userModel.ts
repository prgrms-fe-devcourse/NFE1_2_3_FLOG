import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  userId: string;
  password: string;
  nickname: string;
  profileImage: string;
  blogName: string;
  bio: string;
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
  posts: mongoose.Types.ObjectId[];
  bookmarkedPosts: mongoose.Types.ObjectId[];
  isAdmin: boolean;
  notifications: mongoose.Types.ObjectId[];
  tier: string;
  points: number;
  styleActivities: {
    casual: mongoose.Types.ObjectId[];
    street: mongoose.Types.ObjectId[];
    feminine: mongoose.Types.ObjectId[];
    punk: mongoose.Types.ObjectId[];
    sporty: mongoose.Types.ObjectId[];
    business: mongoose.Types.ObjectId[];
  };
  curationParticipations: [
    {
      curationId: mongoose.Types.ObjectId;
      participationDate: Date;
      award: {
        isWinner: boolean;
        position: string;
      };
    }
  ];
  lifetimeItem: {
    brandName: string;
    productName: string;
    description: string;
    photoUrl: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true },
  profileImage: { type: String, default: '' },
  blogName: { type: String, default: '' },
  bio: { type: String, default: '' },
  followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  posts: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
  bookmarkedPosts: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
  isAdmin: { type: Boolean, default: false },
  notifications: [{ type: mongoose.Types.ObjectId, ref: 'Notification' }],
  tier: { type: String, default: '' },
  points: { type: Number, default: 0 },
  styleActivities: {
    casual: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
    street: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
    feminine: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
    punk: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
    sporty: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
    business: [{ type: mongoose.Types.ObjectId, ref: 'Post' }]
  },
  curationParticipations: [
    {
      curationId: { type: mongoose.Types.ObjectId, ref: 'Curation' },
      participationDate: { type: Date },
      award: {
        isWinner: { type: Boolean },
        position: { type: String }
      }
    }
  ],
  lifetimeItem: {
    brandName: { type: String, default: '' },
    productName: { type: String, default: '' },
    description: { type: String, default: '' },
    photoUrl: { type: String, default: '' }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IUser>('User', userSchema);