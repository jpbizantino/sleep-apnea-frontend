import { GenericDictionary } from '../types'

export enum QuestionType {
  CHOICE = 'CHOICE',
  FIX_NUMBER = 'FIX_NUMBER',
}

export const translateQuestionType = (input: string) => {
  return questionTypeDictionary.find((p) => p.name == input)?.translation
}

export const questionTypeDictionary: GenericDictionary[] = [
  {
    name: QuestionType.CHOICE,
    translation: 'OPCIONES',
  },
  { name: QuestionType.FIX_NUMBER, translation: 'VALOR FIJO' },
]
