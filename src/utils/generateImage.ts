import { IEditPostParams } from '@/controllers/postController/useCases/editPost/protocols'

const generateImage = (filename: string, body?: IEditPostParams): any => {
  const url = 'http://localhost:3000/' + filename
  if (body) {
    body = { ...body, image: url }
  }
  return body
}

export default generateImage
