import { axiosSurveyClient } from './axiosSurveyClient'

export const donwloadExcel = async (): Promise<boolean> => {
  let result = true

  await axiosSurveyClient
    .get(`/exportExcel`, {
      responseType: 'blob',
    })
    .then((response) => {
      // create file link in browser's memory
      const href = URL.createObjectURL(response.data)

      const link = document.createElement('a')
      link.href = href
      link.setAttribute('download', 'Encuestas.xlsx')
      document.body.appendChild(link)
      link.click()

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link)
      URL.revokeObjectURL(href)
    })
    .catch(() => {
      result = false
    })

  return result
}
