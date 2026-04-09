import mongoose,{model, Schema} from 'mongoose';

mongoose.connect('mongodb://localhost:27017/brainly')
  .then(() => console.log("DB connected"))
  .catch(err => console.log("DB error:", err));
  
const UserSchema=new Schema({
    username:{type:String, unique:true},
    password:String,
});

export const UserModel=model('User',UserSchema);

const ContentSchema=new Schema({
    title:String,
    link:String,
    tags:[{type:mongoose.Types.ObjectId, ref:'Tag'}],
    userId:{type:mongoose.Types.ObjectId, ref:'User', required:true},
});

export const ContentModel=model('Content',ContentSchema);

const TagSchema=new Schema({
    name:String,
    userId:{type:mongoose.Types.ObjectId, ref:'User', required:true},
});

const LinksSchema=new Schema({
    hash:String,
    userId:{type:mongoose.Types.ObjectId, ref:'User', required:true, unique:true},
});

export const LinkModel=model('Links',LinksSchema);