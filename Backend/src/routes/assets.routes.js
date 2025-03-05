import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyJwt.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const assetsRoutes = Router();

assetsRoutes.post('/single', verifyJWT ,upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({
      message: 'File uploaded successfully',
      filename: req.file.filename
    });
  });
  
assetsRoutes.post('/multiple', verifyJWT ,upload.array('files', 5), (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    const filenames = req.files.map(file => file.filename);
    res.json({
      message: 'Files uploaded successfully',
      files: filenames
    });
  });

export {assetsRoutes};