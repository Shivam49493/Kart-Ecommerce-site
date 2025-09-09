import jwt from "jsonwebtoken";
const adminAuth = (req, res, next) => {
  let {token} = req.cookies;
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(403).send("Access denied");
    }
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  req.adminEmail = process.env.ADMIN_EMAIL;
  return next();
};
export default adminAuth;
