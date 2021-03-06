import React from 'react';
import PropTypes from 'prop-types';

// ICONS
import {
  Delete,
  Check,
  Visibility,
  AttachFile,
  Edit,
} from '@material-ui/icons/';

// COMPONENTS
import StyledButton from '@components/Button';
import { Grid } from '@material-ui/core';
import ErrorMessage from '@components/Messages/error';
import Tooltip from '@components/ToolTip';

// import DragImageInput from './dragImage';

import {
  StyledAnswerInput,
  StyledTitleInput,
  StyledGrid,
  GridButton,
  PreviewImage,
  HiddenCheckBox,
  ShowOption,
  HiddenRadio,
  ContainerImage,
  StackImageButton,
  PreviewImageButton,
} from '../style';

const MiddleSide = ({
  questions,
  formik,
  updateQuestion,
  updateAnswer,
  handleClickOpenAlert,
  handleOpenPreviewQuestion,
  handleOpenDragImage,
  errors,
  location,
}) => (
  <Grid item xs={6}>
    <StyledGrid container justifyContent="center" align="center">
      {questions.length ? (
        <>
          {errors.title && (
            <ErrorMessage>
              Por favor, informe o enunciado da questão.
            </ErrorMessage>
          )}
          <Grid item xs={12}>
            <StyledTitleInput
              disabled={location.state.published}
              placeholder="DIGITE O ENUNCIADO AQUI"
              formikID="question.title"
              handleFormikChange={formik.handleChange}
              value={formik.values.question.title}
              handlePropsChange={{
                handleUpdate: updateQuestion,
                key: 'title',
                index: formik.values.index,
              }}
              required
              autoFocus
            />
          </Grid>

          {formik.values.question.imageBase64 && (
            <ContainerImage>
              {!location.state.published && (
                <StackImageButton>
                  <Tooltip arrow ariaLabel="editar" title="Editar">
                    <PreviewImageButton
                      size="small"
                      onClick={handleOpenDragImage}
                    >
                      <Edit />
                    </PreviewImageButton>
                  </Tooltip>

                  <Tooltip arrow ariaLabel="excluir" title="Excluir">
                    <PreviewImageButton
                      size="small"
                      onClick={() => {
                        formik.setFieldValue('question.imageBase64', '');
                        updateQuestion({
                          value: '',
                          key: 'imageBase64',
                          index: formik.values.index,
                        });
                      }}
                    >
                      <Delete />
                    </PreviewImageButton>
                  </Tooltip>
                </StackImageButton>
              )}
              <PreviewImage src={formik.values.question.imageBase64} />
            </ContainerImage>
          )}
          {!location.state.published && !formik.values.question.imageBase64 && (
            <Grid item xs={12}>
              <StyledButton
                style={{ width: '50%' }}
                color="secondary"
                variant="outlined"
                onClick={handleOpenDragImage}
                disabled={location.state.published}
                startIcon={<AttachFile />}
                size="large"
              >
                Adicionar Imagem
              </StyledButton>
            </Grid>
          )}

          <Grid item xs={12}>
            {errors.is_correct && (
              <ErrorMessage style={{ marginBottom: '10px' }}>
                Por favor, informe ao menos uma alternativa correta.
              </ErrorMessage>
            )}

            {errors.answer && (
              <ErrorMessage>
                Por favor, escreva todas as alternativas.
              </ErrorMessage>
            )}
          </Grid>

          <Grid container align="center" justifyContent="center" spacing={2}>
            {formik.values.question.answer.map((item, index) => (
              <Grid
                item
                xs={12}
                md={6}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                style={{
                  display: 'flex',
                  height: '80px',
                  alignItems: 'center',
                }}
              >
                <>
                  <ShowOption
                    disabled={location.state.published}
                    checked={Boolean(item.is_correct)}
                  >
                    <Check />
                  </ShowOption>
                  {formik.values.question.type === 'multiple_choice' ? (
                    <HiddenCheckBox
                      disabled={location.state.published}
                      style={{ width: '50px', height: '50px' }}
                      checked={Boolean(item.is_correct)}
                      formikID={`question.answer[${index}].is_correct`}
                      handleFormikChange={formik.handleChange}
                      handlePropsChange={{
                        handleUpdate: updateAnswer,
                        key: 'is_correct',
                        indexQuestion: formik.values.index,
                        indexAnswer: index,
                      }}
                    />
                  ) : (
                    <HiddenRadio
                      disabled={location.state.published}
                      style={{ width: '50px', height: '50px' }}
                      value={item.is_correct}
                      formikID={`question.answer[${index}].is_correct`}
                      formikOtherID={`question.answer[${
                        index === 0 ? 1 : 0
                      }].is_correct`}
                      handleFormikChange={formik.setFieldValue}
                      handlePropsChange={{
                        handleUpdate: updateAnswer,
                        key: 'is_correct',
                        indexQuestion: formik.values.index,
                        indexAnswer: index,
                        indexOtherAnswer: index === 0 ? 1 : 0,
                      }}
                    />
                  )}
                </>
                <StyledAnswerInput
                  type="text"
                  disabled={location.state.published}
                  placeholder={`DIGITE A ALTERNATIVA ${index + 1}`}
                  formikID={`question.answer[${index}].title`}
                  value={item.title}
                  handleFormikChange={formik.handleChange}
                  handlePropsChange={{
                    handleUpdate: updateAnswer,
                    key: 'title',
                    indexQuestion: formik.values.index,
                    indexAnswer: index,
                  }}
                  required
                />
              </Grid>
            ))}
          </Grid>

          <GridButton item xs={6}>
            <StyledButton
              style={{ width: '80%' }}
              color="secondary"
              variant="outlined"
              onClick={handleOpenPreviewQuestion}
              startIcon={<Visibility />}
              size="large"
            >
              Visualizar
            </StyledButton>
          </GridButton>
          <GridButton item xs={6}>
            <StyledButton
              type="submit"
              disabled={location.state.published}
              style={{ width: '80%' }}
              color="secondary"
              variant="outlined"
              onClick={handleClickOpenAlert}
              startIcon={<Delete />}
              size="large"
            >
              Excluir Questão
            </StyledButton>
          </GridButton>
        </>
      ) : (
        <p>Vazio!</p>
      )}
    </StyledGrid>
  </Grid>
);

MiddleSide.defaultProps = {};

MiddleSide.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateQuestion: PropTypes.func.isRequired,
  updateAnswer: PropTypes.func.isRequired,
  handleClickOpenAlert: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    title: PropTypes.bool,
    is_correct: PropTypes.bool,
    answer: PropTypes.bool,
  }).isRequired,
};

export default MiddleSide;
