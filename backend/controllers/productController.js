import cloudinaryUpload from '../config/cloudinary.js'
import Product from '../models/productModel.js';

export const addProduct = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Request files:', req.files ? Object.keys(req.files) : 'No files');

        // Validate required fields
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;
        
        if (!name || !description || !price || !category) {
            return res.status(400).json({ 
                message: "Missing required fields: name, description, price, category" 
            });
        }

        // Validate at least one image is uploaded
        if (!req.files || !req.files.image1) {
            return res.status(400).json({ message: "At least image1 is required" });
        }

        // Upload images with error handling for optional images
        const uploadImage = async (imageFile) => {
            if (!imageFile || imageFile.length === 0) return null;
            try {
                return await cloudinaryUpload(imageFile[0].path);
            } catch (error) {
                console.error(`Error uploading image: ${error.message}`);
                return null;
            }
        };

        const [image1, image2, image3, image4] = await Promise.all([
            uploadImage(req.files.image1),
            uploadImage(req.files.image2),
            uploadImage(req.files.image3),
            uploadImage(req.files.image4)
        ]);

        // Validate that at least one image uploaded successfully
        if (!image1) {
            return res.status(500).json({ message: "Failed to upload required images" });
        }

        let productData = {
            image1,
            image2: image2 || null,
            image3: image3 || null,
            image4: image4 || null,
            name,
            description,
            category,
            subCategory: subCategory || null,
            sizes: sizes ? JSON.parse(sizes) : [],
            price: Number(price),
            bestSeller: bestSeller === "true",
            date: Date.now()
        };

        const newProduct = new Product(productData);
        await newProduct.save();
        
        res.status(201).json({ 
            message: "Product added successfully", 
            product: newProduct 
        });

    } catch (error) {
        console.error("Error adding product:", error);
        
        // Clean up any uploaded files if error occurs
        if (req.files) {
            Object.values(req.files).flat().forEach(file => {
                try {
                    if (file.path && fs.existsSync(file.path)) {
                        fs.unlinkSync(file.path);
                    }
                } catch (cleanupError) {
                    console.error("Error cleaning up files:", cleanupError);
                }
            });
        }

        res.status(500).json({ 
            message: "Error adding product", 
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error' 
        });
    }
}

export const listProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.error("Error listing products:", error);
       
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);     
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ 
            message: "Error deleting product", 
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error' 
        });
    }
}
