import cloudinary from "./cloudinary";

export const uploadFileToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw", // Since you’re uploading a PDF
    });
    return result;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};
