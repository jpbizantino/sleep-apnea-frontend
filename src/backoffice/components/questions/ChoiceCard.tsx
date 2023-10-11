import { Button, Card, Grid, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { Choice } from '../../../common/types'
import { useBackoffice } from '../../hooks/userBackoffice'
import { ChoiceModal } from './ChoiceModal'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ChoiceCard = (props: {
  choice: Choice | null
  handleDelete: any
}) => {
  const { toggleChoiceModal, setSelectedChoice } = useBackoffice()
  const initialValue: Choice = {
    _id: '',
    description: '',
    choiceValue: 0,
    order: 0,
  }

  const formik = useFormik({
    initialValues: props.choice ?? initialValue,
    onSubmit: () => {},
  })

  return (
    <>
      <Card elevation={1} sx={{ mt: 1, p: 2 }}>
        <Grid container columns={12} spacing={1} rowSpacing={1}>
          <Grid item xs={12} md={6} lg={8}>
            Opción
            <br />
            <Typography sx={{ fontWeight: 'bold' }}>
              {formik.values.description}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            Score
            <br />
            <Typography sx={{ fontWeight: 'bold' }}>
              {formik.values.choiceValue}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                setSelectedChoice(formik.values)
                toggleChoiceModal()
              }}
            >
              Editar
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button fullWidth onClick={() => props.handleDelete(props.choice)}>
              Eliminar
            </Button>
          </Grid>
        </Grid>
      </Card>
      <ChoiceModal />
    </>
  )
}
