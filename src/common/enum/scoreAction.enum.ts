import { GenericDictionary } from '../types'

export enum scoreActionEnum {
  ADD_TO_FINAL_SCORE = 'ADD_TO_FINAL_SCORE',
  COMBINE_SCORE = 'COMBINE_SCORE',
  GROUP_SCORE = 'GROUP_SCORE',
}

export const translateScoreAction = (input: string) => {
  return scoreActionDictionary.find((p) => p.name == input)?.translation
}

export const scoreActionDictionary: GenericDictionary[] = [
  {
    name: scoreActionEnum.ADD_TO_FINAL_SCORE,
    translation: 'SUMAR AL SCORE FINAL',
  },
  {
    name: scoreActionEnum.COMBINE_SCORE,
    translation: 'COMBINAR SCORE (AND/OR)',
  },
  {
    name: scoreActionEnum.GROUP_SCORE,
    translation: 'AGRUPAR SCORES (SUMAR)',
  },
]
