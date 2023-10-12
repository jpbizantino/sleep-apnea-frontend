export enum QuestionType {
  CHOICE = 'CHOICE',
  FIX_NUMBER = 'FIX_NUMBER',
}

export const translateQuestionType = (input: string) => {
  return questionTypeDictionary.find((p) => p.name == input)?.value
}

export const questionTypeDictionary = [
  {
    name: QuestionType.CHOICE,
    value: 'OPCIONES',
  },
  { name: QuestionType.FIX_NUMBER, value: 'VALOR FIJO' },
]
