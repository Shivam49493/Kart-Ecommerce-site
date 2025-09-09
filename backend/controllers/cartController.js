import User from "../models/userModel.js";

export const addToCart=async(req,res)=>{
    try{
        let {productId,size}=req.body;
        const userData=await User.findById(req.userId);
        if(!userData){
            return res.status(404).json({message:"User not found"})
        }
        

        let cart=userData.cart || {};
        if(cart[productId]){
            if(cart[productId][size]){
                cart[productId][size]+=1;
            }else{
                cart[productId][size]=1;
            }       

        }else{      
            cart[productId]={};
            cart[productId][size]=1;
        }
        
        await User.findByIdAndUpdate(req.userId,{cart:cart});
        return res.status(200).json({message:"Item added to cart",cart:cart})   
    }catch(err){
        console.error("Error in addToCart:",err);
        return res.status(500).json({message:"Internal server error"})
    }
}


export const UpdateCart =async(req,res)=>{ 
    try{
        let {productId,size,quantity}=req.body;
        const userData=await User.findById(req.userId);
        let cart=userData.cart;
        cart[productId][size]=quantity;
        await User.findByIdAndUpdate(req.userId,{cart:cart});
        return res.status(200).json({message:"Cart updated",cart:cart})   
    }catch(err){
        console.error("Error in UpdateCart:",err);
        return res.status(500).json({message:"Internal server error"})
    }   
} 

export const getUserCart=async(req,res)=>{
    try{
        const userData=await User.findById(req.userId);
        let cart=userData.cart 
        return res.status(200).json({cart:cart})
    }catch(err){
        console.error("Error in getUserCart:",err);
        return res.status(500).json({message:"Internal server error"})
    }
}

