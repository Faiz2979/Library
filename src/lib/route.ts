// pages/api/upload-cover.ts

import cloudinary from '@/lib/cloudinaryConfig';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { file } = req.body; // file berupa base64 atau url data image

    // Upload ke Cloudinary
    const result = await cloudinary.uploader.upload(file, {
      folder: 'covers', // Optional: biar rapi, disimpan dalam folder "covers"
    });

    return res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return res.status(500).json({ message: 'Upload failed', error });
  }
}
