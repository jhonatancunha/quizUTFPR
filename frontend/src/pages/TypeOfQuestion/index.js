import React, {forwardRef, useState} from 'react'

import {IconButton, Grid, Typography, Divider } from '@material-ui/core'
import { Close } from '@material-ui/icons'

// COMPONENTS
import GridContainer from '@components/Container'
import Modal from "@components/Modal";
import QuestionDatabase from "../QuestionDatabase";
import Button from '@components/Button'

// ASSETS
import SaveIcon from '@material-ui/icons/Save';

//HOOKS
import useQuestionQuiz from "@hooks/QuestionQuiz";

const Wrapper = forwardRef((props, ref) => (
  <GridContainer ref={ref} {...props} />
));

const TypeOfQuestion = forwardRef((props, ref) => {
  const { 
    questions, 
    addQuestion, 
    removeQuestion, 
    MockupQuestionTrueOrFalse, 
    MockupQuestionMultipleChoice 
  } = useQuestionQuiz();

  const [isModalQuestionDatabaseOpen, setModalQuestionDatabaseOpen] = useState(false);
  const handleOpenModalQuestionDB = () => setModalQuestionDatabaseOpen(true);
  const handleCloseModalQuestionDB = () => setModalQuestionDatabaseOpen(false);

  const handleAddQuestion = (mockup) => async () => {
    await addQuestion(mockup);
    props.handleClose();
  };

  return(
  <>
      <Wrapper container spacing={3} >
        <Grid container justify='center' alignItems='center'>
          <Grid item xs={3} md={1}>
            <IconButton aria-label="closeModal" onClick={props.handleClose}>
              <Close />
            </IconButton >
          </Grid>

          <Grid item xs={9} md={11}>
            <Typography variant='h5' color='primary'>
              Qual tipo de questão deseja criar?
            </Typography>
          </Grid>
        </Grid>
  
  
        <Grid item><Divider /></Grid>

        <Grid container spacing={3} justify='center' align='center'>
          <Grid item xs={12}>
            <Button
              fullWidth
              onClick={handleOpenModalQuestionDB}
              variant="contained"
              color="primary"
            >
              USAR QUESTÃO DO BANCO
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button 
              fullWidth startIcon={<SaveIcon />} 
              color='secondary' variant='outlined'
              onClick={handleAddQuestion(MockupQuestionMultipleChoice)}
            >
              Multipla Escolha
            </Button>
          </Grid>
          <Grid item xs={6}>
          <Button 
              fullWidth startIcon={<SaveIcon />} 
              color='secondary' variant='outlined'
              onClick={handleAddQuestion(MockupQuestionTrueOrFalse)}
            >
              Verdadeiro ou Falso
            </Button>
          </Grid>
        </Grid>
      </Wrapper>

      <Modal
        open={isModalQuestionDatabaseOpen}
        modalTitle="Utilizar questões do banco de dados"
        modalDescription="As questões são buscadas utilizando tag's"
        style={{ overflow: "scroll" }}
      >
        <QuestionDatabase
          questions={questions}
          handleaddQuestion={addQuestion}
          handleRemoveQuestion={removeQuestion}
          handleClose={handleCloseModalQuestionDB}
        />
      </Modal>
    </>
    )
  })


export default TypeOfQuestion;