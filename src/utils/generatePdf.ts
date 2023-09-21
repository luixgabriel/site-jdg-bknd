const generatePdf = (filename: string, body?: any): any => {
  const url = 'https://jdg-site.onrender.com/' + filename
  if (body) {
    body = { ...body, cv: url }
  }
  return body
}

export default generatePdf
