const generateImage = (filename: string, body?: any): any => {
  const url = 'http://localhost:3000/' + filename
  if (body) {
    body = { ...body, image: url }
  }
  return body
}

export default generateImage
