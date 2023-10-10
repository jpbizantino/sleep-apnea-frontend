import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { Button, Grid, Paper, TextField } from '@mui/material'
import { useState } from 'react'
import { Choice } from '../../../common/types'

export const ChoiceItem = (props: { choice: Choice; handleDelete: any }) => {
  const [editMode, setEditMode] = useState(false)

  return (
    <>
      <Paper elevation={1} sx={{ mt: 1, p: 1 }}>
        <Grid container xs={12} sx={{ p: 1 }} spacing={1} rowSpacing={1}>
          <Grid item xs={1}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                setEditMode(!editMode)
              }}
            >
              {editMode ? 'Guardar' : 'Editar'}
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => props.handleDelete(props.choice)}
            >
              Eliminar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="standard"
              label="Texto"
              value={props.choice.description}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              variant="standard"
              label="Valor Score"
              value={props.choice.choiceValue}
              fullWidth
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              onClick={() => {
                setEditMode(!editMode)
              }}
            >
              <ArrowUpward />
            </Button>
          </Grid>

          <Grid item xs={1}>
            <Button
              variant="contained"
              onClick={() => {
                setEditMode(!editMode)
              }}
            >
              <ArrowDownward />
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}
