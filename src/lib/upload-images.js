import cloudinary from './cloudinary';

export const UploadImage = async (file, folder) => {
  try {
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: folder,
        },
        (error, result) => {
          if (error) {
            return reject(new Error(error.message));
          }
          return resolve(result);
        }
      ).end(bytes);
    });

    // Only return what you need
    return {
      public_id: result.public_id,
      secure_url: result.secure_url
    };

  } catch (error) {
    console.error('UploadImage error:', error);
    throw new Error('Failed to upload image');
  }
};
