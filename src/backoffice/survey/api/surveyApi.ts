import { axiosSurveyClient } from './axiosSurveyClient'

export const donwloadExcel = async (): Promise<Blob | null> => {
  let result = null

  await axiosSurveyClient
    .get(`/exportExcel`, {
      responseType: 'blob',
    })
    .then((data) => {
      console.log(data.data)
      result = new Blob([data.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
    })

  return result
}
