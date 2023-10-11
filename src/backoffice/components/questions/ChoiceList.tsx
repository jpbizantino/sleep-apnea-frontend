import { Grid, Button } from '@mui/material'
import { Choice } from '../../../common/types'
import { useBackoffice } from '../../hooks/userBackoffice'
import { ChoiceCard } from './ChoiceCard'
import { Add } from '@mui/icons-material'

export const ChoiceList = () => {
  const { selectedQuestion, removeChoice, openNewChoice } = useBackoffice()

  const handleNewQuestion = () => {
    if (!selectedQuestion) return

    openNewChoice()
  }

  const handleRemoveChoice = (choice: Choice) => {
    if (!selectedQuestion) return

    removeChoice(selectedQuestion, choice)
  }

  return (
    <>
      <Grid container columns={12}>
        <Grid item xs={12}>
          <Button onClick={handleNewQuestion}>
            <Add />
            Nueva opción
          </Button>
        </Grid>
        <Grid item xs={12}>
          {selectedQuestion?.choices.map((item: Choice) => {
            return (
              <div key={item._id}>
                <ChoiceCard
                  key={item._id}
                  choice={item}
                  handleDelete={handleRemoveChoice}
                />
              </div>
            )
          })}
        </Grid>
      </Grid>
    </>
  )
}
