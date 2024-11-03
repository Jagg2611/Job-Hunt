import multer from "multer"; //for file uploading..


const storage = multer.memoryStorage();

export const singleUpload = multer({storage}).single("file");