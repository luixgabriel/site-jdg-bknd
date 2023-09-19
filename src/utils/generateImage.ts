import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
  cloud_name: 'dmnium8ea',
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

const generateImage = async (path: string, body: any = {}): Promise<any> => {
  try {
    const data = await cloudinary.uploader.upload(path)
    return { ...body, image: data.url }
  } catch (error) {
    console.error(error)
    throw error
  }
}
export default generateImage
