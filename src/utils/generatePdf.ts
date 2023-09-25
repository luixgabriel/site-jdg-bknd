const generatePdf = (filename: string, body?: any): any => {
  const url = `http://localhost:3000/${filename}`
  if (body) {
    body = { ...body, cv: url }
  }
  return body
}

export default generatePdf
