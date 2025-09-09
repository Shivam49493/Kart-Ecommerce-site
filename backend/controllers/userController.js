
import User from '../models/userModel.js';

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAdmin= async (req,res)=>{
  try{
    let adminemail = req.adminEmail;
    if(!adminemail){
        return res.status(404).json({ message: "Admin not found" });
    }
    return res.status(200).json({ email: adminemail, role: "admin" }) ;

  }catch(error){
    console.error("Error in getAdmin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
