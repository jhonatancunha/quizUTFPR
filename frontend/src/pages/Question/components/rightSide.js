import React from 'react';

// ICONS
import { FileCopy } from '@material-ui/icons/';

// COMPONENTS
import { Grid, Typography, FormControlLabel } from '@material-ui/core';
import {
  StyledRightGrid,
  GridItemStyledRight,
  CopiedQuestionMessage,
} from '../style';
import SelectInput from './select';
import TagInput from './tagInput';
import CheckBox from './checkbox';

const RightSide = ({ formik, updateQuestion, questions }) => (
  <Grid item xs={3}>
    <StyledRightGrid container align="center" direction="column">
      <Grid item style={{ marginBottom: '40px' }}>
        <Typography color="primary" component="h5" variant="h5">
          Detalhes da Questão
        </Typography>
      </Grid>

      {questions.length ? (
        <>
          <GridItemStyledRight item>
            <SelectInput
              fullWidth
              label="Tempo"
              name="time"
              variant="outlined"
              formikID="question.timer"
              value={formik.values.question.timer}
              handleFormikChange={formik.handleChange}
              handlePropsChange={{
                handleUpdate: updateQuestion,
                key: 'timer',
                index: formik.values.index,
              }}
              required
            >
              <option value={240}>4 minutos</option>
              <option value={180}>3 minutos</option>
              <option value={120}>2 minutos</option>
              <option value={60}>1 minuto</option>
              <option value={45}>45 segundos</option>
              <option value={30}>30 segundos</option>
              <option value={15}>15 segundos</option>
              <option value={10}>10 segundos</option>
            </SelectInput>
          </GridItemStyledRight>

          <GridItemStyledRight item>
            <TagInput
              fullWidth
              suggestions={[]}
              value={formik.values.question.tags}
              formikID="question.tags"
              handleFormikChange={formik.setFieldValue}
              handlePropsChange={{
                handleUpdate: updateQuestion,
                key: 'tags',
                index: formik.values.index,
              }}
            />
          </GridItemStyledRight>

          <GridItemStyledRight item style={{ alignSelf: 'start' }}>
            {!formik.values.question.copy ? (
              <FormControlLabel
                control={
                  <CheckBox
                    disabled={Boolean(formik.values.question.copy)}
                    style={{ width: '50px', height: '50px' }}
                    inputProps={{
                      'aria-label': 'primary checkbox',
                      label: 'teste',
                    }}
                    checked={formik.values.question.availableOnQuestionsDB}
                    formikID="question.availableOnQuestionsDB"
                    handleFormikChange={formik.handleChange}
                    handlePropsChange={{
                      handleUpdate: updateQuestion,
                      key: 'availableOnQuestionsDB',
                      index: formik.values.index,
                    }}
                  />
                }
                label="Disponível no Banco de Questão"
              />
            ) : (
              <CopiedQuestionMessage item xs={12}>
                <FileCopy />
                <span>
                  Esta questão é uma copia retirada do banco de questões.
                </span>
              </CopiedQuestionMessage>
            )}
          </GridItemStyledRight>
        </>
      ) : (
        <p>Vazio!</p>
      )}
    </StyledRightGrid>
  </Grid>
);

export default RightSide;