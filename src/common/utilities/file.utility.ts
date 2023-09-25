export const downloadFileDialog = (data: string | null, fileName: string) => {
  if (data) {
    const link = document.createElement('a')
    link.href = data
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
  }
}
