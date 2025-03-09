const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/Nutridex?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.7";


const connectDB = async () => {
    try{
        if(!mongoURI){
            throw new Error('MongoURI is required');
        }
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB is connected');
    }catch(err){
        console.error(err.message);
        process.exit();
    }
}

module.exports = connectDB;