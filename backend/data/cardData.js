const moongose = require('mongoose');
const CardSchema = require('../model/Card');
const connectDB = require('../db');

const cardDetails = [
    { 
      icon: "Microscope", 
      title: "Precision Nutrition Scan", 
      description: "Advanced OCR technology extracts precise nutritional data with unprecedented accuracy.",
      color: "from-pink-500 to-pink-600"
    },
    { 
      icon: "ShieldCheck", 
      title: "Intelligent Health Rating", 
      description: "Comprehensive algorithm provides nuanced health insights beyond simple metrics.",
      color: "from-rose-500 to-rose-600"
    },
    { 
      icon: "TrendingUp", 
      title: "Nutritional Insights", 
      description: "Deep analytical breakdown of ingredients, revealing hidden nutritional complexities.",
      color: "from-fuchsia-500 to-fuchsia-600"
    }
];

const insertCardData = async () => {
    try{
        await connectDB();
        await CardSchema.insertMany(cardDetails);
        console.log('Card data inserted successfully');
    }
    catch(err){
        console.error(err.message);
    }
    finally{
        process.exit();
    }
};

insertCardData();

