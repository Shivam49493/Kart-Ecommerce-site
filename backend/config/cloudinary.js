import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config()

// Validate Cloudinary configuration
const validateCloudinaryConfig = () => {
    const required = ['CLOUDINARY_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
        throw new Error(`Missing Cloudinary environment variables: ${missing.join(', ')}`);
    }

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
}

validateCloudinaryConfig();

const cloudinaryUpload = async (filepath) => {
    try {
        if (!filepath) {
            throw new Error('No file path provided');
        }

        // Check if file exists
        if (!fs.existsSync(filepath)) {
            throw new Error(`File not found: ${filepath}`);
        }

        const uploadResult = await cloudinary.uploader.upload(filepath, {
            folder: 'products', // Organize files in folder
            resource_type: 'auto'
        });

        // Clean up temporary file
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }

        return uploadResult.secure_url;

    } catch (error) {
        // Clean up temporary file even if upload fails
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }
        console.error("Error uploading to Cloudinary:", error.message);
        throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
}

export default cloudinaryUpload;