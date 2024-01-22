import { Add, Delete, ExpandMore } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Paper,
  Typography,
} from '@mui/material'
import { lightBlue } from '@mui/material/colors'
import { useState } from 'react'
import { GroupedField } from '../../../common/types'
import { groupedFieldText } from '../../groupedScore/helper/groupedScore.helper'
import { useFindAllCombinedQuery } from '../../groupedScore/slices'
import { GroupedFieldCombo } from './GroupedFieldCombo'

export interface GroupedQuestionComponentProps {
  groupedFieldData: GroupedField[]
  handleAddQuestion: (groupedField: GroupedField) => void
  handleDeleteQuestion: (groupedField: GroupedField) => void
}

export const GroupedQuestionComponent = ({
  groupedFieldData,
  handleAddQuestion,
  handleDeleteQuestion,
}: GroupedQuestionComponentProps) => {
  const [tempQuestion, setTempQuestion] = useState<GroupedField | null>(null)

  const { data: groupedFieldsData, isFetching: isfetchingQuestions } =
    useFindAllCombinedQuery(null)

  return (
    <>
      <Accordion
        sx={{ mb: 1, backgroundColor: lightBlue[50] }}
        disableGutters={true}
        defaultExpanded
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">Score Agrupados</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container columns={12} spacing={1}>
            <Grid item xs={12} md={10}>
              <GroupedFieldCombo
                label="Pregunta a incluir"
                name="groupedField"
                disabled={isfetchingQuestions}
                value={tempQuestion}
                error=""
                helperText=""
                onChange={(_: unknown, value: GroupedField) => {
                  if (value) {
                    setTempQuestion(value)
                  }
                }}
                groupedFields={groupedFieldsData ?? []}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                // variant="contained"
                onClick={() => {
                  if (tempQuestion) {
                    handleAddQuestion(tempQuestion)
                    setTempQuestion(null)
                  }
                }}
              >
                <Add />
                Agregar
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ pt: 2 }}>
              {groupedFieldData.map((item: GroupedField) => {
                return (
                  <div key={item.groupedFieldId}>
                    <InternalChoiceCard
                      groupedField={item}
                      handleDeleteQuestion={(groupedField) =>
                        handleDeleteQuestion(groupedField)
                      }
                    />
                  </div>
                )
              })}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

interface InternalChoiceCardProps {
  groupedField: GroupedField
  handleDeleteQuestion: (groupedField: GroupedField) => void
}

const InternalChoiceCard = ({
  groupedField,
  handleDeleteQuestion,
}: InternalChoiceCardProps) => {
  return (
    <>
      <Paper
        elevation={1}
        sx={{ mt: 1, p: 1, backgroundColor: lightBlue[100] }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            verticalAlign: 'center',
            alignItems: 'center',
          }}
        >
          <Grid
            container
            columns={12}
            spacing={1}
            rowSpacing={1}
            sx={{
              justify: 'center',
              alignItems: 'center',
              minHeight: '100%',
            }}
          >
            <Grid item xs={12} sm={10} md={10}>
              <Typography variant="caption">Pregunta</Typography>
              <br />
              <Typography sx={{ fontWeight: 'bold' }}>
                {groupedFieldText(groupedField)}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={2} md={2}>
              <Button
                startIcon={<Delete />}
                fullWidth
                onClick={() => handleDeleteQuestion(groupedField)}
              >
                Eliminar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  )
}
