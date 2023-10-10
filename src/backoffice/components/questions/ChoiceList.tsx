import { Grid, Button } from '@mui/material'
import { Choice } from '../../../common/types'
import { useBackoffice } from '../../hooks/userBackoffice'
import { ChoiceItem } from './ChoiceItem'
import { Add } from '@mui/icons-material'

export const ChoiceList = () => {
  const { selectedQuestion, addNewChoice, removeChoice } = useBackoffice()

  const handleNewQuestion = () => {
    if (!selectedQuestion) return

    const choice: Choice = {
      _id: Date.now().toString(36) + Math.random().toString(36),
      description: '',
      choiceValue: 0,
      order: 0,
    }

    addNewChoice(selectedQuestion, choice)
  }

  const handleRemoveChoice = (choice: Choice) => {
    if (!selectedQuestion) return

    removeChoice(selectedQuestion, choice)
  }

  return (
    <>
      <Grid container xs={12}>
        <Grid item xs={12}>
          <Button onClick={handleNewQuestion}>
            <Add />
            Nueva opción
          </Button>
        </Grid>
        <Grid item xs={12}>
          {selectedQuestion?.choices.map((item: Choice) => {
            return (
              <ChoiceItem
                key={item._id}
                choice={item}
                handleDelete={handleRemoveChoice}
              />
            )
          })}
        </Grid>
      </Grid>
    </>
  )
}
