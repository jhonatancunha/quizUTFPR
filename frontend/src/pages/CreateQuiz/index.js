import React from 'react';
import PropTypes from 'prop-types';

import { useFormik } from 'formik';
import api from '@api';

// ROTAS
import { QUESTION } from '@routes';

// UTILS
import getBase64 from '@utils/getBase64OfImage';

// COMPONENTS
import GridContainer from '@components/Container';
import ChipInput from '@components/ChipInput';
import Button from '@components/Button';

import DragImageInput from '@components/DragZone';
import {
  Grid,
  Typography,
  Divider,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { PreviewImage } from './style';

const CriarQuiz = ({ history }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      visibility: 'public',
      imageObj: null,
      imageUrl: '',
      tags: ['UTFPR', 'QUIZ'],
      published: false,
    },
    onSubmit: async (values) => {
      // const responseFile = null;
      let base64 = '';
      if (values.imageObj !== null) {
        base64 = await getBase64(values.imageObj);
        // const file = new FormData();
        // file.append('file', values.imageObj);

        // responseFile = await api.post('/files', file);
      }

      const quiz = {
        title: values.title,
        tags: values.tags,
        description: values.description,
        visibility: values.visibility,
        published: values.published,
        imageBase64: base64,
      };

      // if (responseFile) {
      //   quiz.id_image = responseFile.data.id;
      // }

      const responseQuiz = await api.post('/quiz/create', quiz);
      const { data } = responseQuiz;

      if (responseQuiz.status === 200) {
        history.push({
          pathname: `${QUESTION}${data.quiz.id}`,
          state: { title: data.quiz.title },
        });
      }
    },
  });

  return (
    <GridContainer container spacing={3}>
      <Grid container align="center" justifyContent="center">
        <Typography color="primary" component="h4" variant="h4">
          Informações do Quiz
        </Typography>
      </Grid>

      <Grid item>
        <Divider />
      </Grid>

      <Grid
        container
        component="form"
        justifyContent="center"
        align="center"
        onSubmit={formik.handleSubmit}
        spacing={2}
      >
        <Grid item xs={12}>
          <PreviewImage src={formik.values.imageUrl} />
        </Grid>
        <Grid item xs={12}>
          <DragImageInput
            handleChange={(files) => {
              formik.setFieldValue('imageObj', files[0]);
              formik.setFieldValue('imageUrl', URL.createObjectURL(files[0]));
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Título"
            id="title"
            variant="outlined"
            value={formik.values.title}
            onChange={formik.handleChange}
            required
            autoFocus
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Visibilidade"
            id="visibility"
            name="visibility"
            variant="outlined"
            value={formik.values.visibility}
            onChange={(event) =>
              formik.setFieldValue('visibility', event.target.value)
            }
            required
            select
          >
            <MenuItem value="public">Público</MenuItem>
            <MenuItem value="private">Privado</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Descrição"
            id="description"
            variant="outlined"
            value={formik.values.description}
            onChange={formik.handleChange}
            required
            multiline
            minRows={5}
            maxRows={5}
          />
        </Grid>

        <Grid item xs={12}>
          <ChipInput
            fullWidth
            value={formik.values.tags}
            suggestions={['Aprenda', 'JavaScript']}
            onChange={(_, value) => formik.setFieldValue('tags', value)}
          />
        </Grid>

        <Grid item xs={6}>
          <Button fullWidth variant="contained" color="primary" type="submit">
            CRIAR QUIZ
          </Button>
        </Grid>
      </Grid>
    </GridContainer>
  );
};

CriarQuiz.defaultProps = {};

CriarQuiz.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default CriarQuiz;
