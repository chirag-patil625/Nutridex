const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authenticateToken = require('../middleware/authenticateToken');


const uploadDir = path.join(__dirname, '..', 'images');
console.log('Upload Directory:', uploadDir);

// Create images directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const userId = req.user.id;
        const filename = `${userId}-${file.fieldname}${path.extname(file.originalname)}`;
        cb(null, filename);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Not an image! Please upload an image.'), false);
        }
    }
});

//to delete old images of the same user
const deleteOldImages = (userId) => {
    try {
        const files = fs.readdirSync(uploadDir);
        for (const file of files) {
            if (file.startsWith(`${userId}-`)) {
                const filePath = path.join(uploadDir, file);
                console.log('Deleting old file:', filePath);
                fs.unlinkSync(filePath);
            }
        }
        return true;
    } catch (error) {
        console.error('Error deleting old images:', error);
        return false;
    }
};

router.post('/upload', authenticateToken, upload.fields([
    { name: 'nutritionFacts', maxCount: 1 },
    { name: 'ingredients', maxCount: 1 }
]), async (req, res) => {
    try {
        if (!req.files || !req.files.nutritionFacts || !req.files.ingredients) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please upload both nutrition facts and ingredients images' 
            });
        }

        const newNutritionPath = path.join(uploadDir, req.files.nutritionFacts[0].filename);
        const newIngredientsPath = path.join(uploadDir, req.files.ingredients[0].filename);

        if (fs.existsSync(newNutritionPath) && fs.existsSync(newIngredientsPath)) {
            const oldFiles = fs.readdirSync(uploadDir)
                .filter(file => file.startsWith(`${req.user.id}-`) && 
                    ![req.files.nutritionFacts[0].filename, req.files.ingredients[0].filename].includes(file));

            oldFiles.forEach(file => {
                const filePath = path.join(uploadDir, file);
                console.log('Deleting old file:', filePath);
                fs.unlinkSync(filePath);
            });

            res.status(200).json({
                success: true,
                message: 'Images uploaded and old files cleaned up successfully',
                data: {
                    userId: req.user.id,
                    nutritionFacts: req.files.nutritionFacts[0].filename,
                    ingredients: req.files.ingredients[0].filename
                }
            });
        } else {
            throw new Error('New files were not saved properly');
        }
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
