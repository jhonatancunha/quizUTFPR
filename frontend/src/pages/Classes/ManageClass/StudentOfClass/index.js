import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import api from '@api';

// Components
import Tooltip from '@components/ToolTip';
import { Email, Delete } from '@mui/icons-material';
import ConfirmRemove from '@components/ConfirmRemove';
import Modal from '@components/Modal';

// Style
import {
  Wrapper,
  StudentsWrapper,
  NoStudentsWarning,
  Student,
  StyledAvatar,
  WrapperText,
  Text,
  TextBold,
  ActionsWrapper,
  StyledIconButton,
} from './style';

const StudentOfClass = () => {
  const [students, setStudents] = useState([]);
  const { idClass } = useParams();
  const [modalDelete, setModalDelete] = useState({
    open: false,
    idStudent: null,
  });

  const getAllStudents = async () => {
    try {
      const { data } = await api.get(`/class/getAllClassStudents/${idClass}`);
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModalDelete = (idStudent) => () =>
    setModalDelete({ open: true, idStudent });

  const handleCloseModalDelete = () =>
    setModalDelete({ open: false, idStudent: null });

  const handleRemoveStudent = async () => {
    try {
      await api.delete('/class/dettachStudent', {
        params: {
          idClass,
          studentId: modalDelete.idStudent,
        },
      });

      getAllStudents();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <>
      <Wrapper
        key="students"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <StudentsWrapper>
          {!students.length && (
            <NoStudentsWarning>
              Não há estudantes cadastrados na turma, ou eles ainda não
              responderam nenhum quiz vinculado na turma!
            </NoStudentsWarning>
          )}

          {students.map((item) => (
            <Student key={item.id}>
              <StyledAvatar src={item?.imageProfile?.url} />
              <WrapperText>
                <TextBold>{item.name}</TextBold>
                <Text>{item.email}</Text>
              </WrapperText>
              <ActionsWrapper>
                <Tooltip arrow ariaLabel="email" title="Enviar Email">
                  <StyledIconButton
                    onClick={() => {
                      window.location = `mailto:${item.email}`;
                    }}
                  >
                    <Email />
                  </StyledIconButton>
                </Tooltip>

                <Tooltip arrow ariaLabel="deletar" title="Remover Aluno">
                  <StyledIconButton onClick={handleOpenModalDelete(item.id)}>
                    <Delete />
                  </StyledIconButton>
                </Tooltip>
              </ActionsWrapper>
            </Student>
          ))}
        </StudentsWrapper>
      </Wrapper>

      <Modal open={modalDelete.open} handleClose={handleCloseModalDelete}>
        <ConfirmRemove
          handleClose={handleCloseModalDelete}
          onClick={handleRemoveStudent}
          title="Deseja mesmo excluir a Turma?"
          description="Todos os dados referente turma serão excluídas."
        />
      </Modal>
    </>
  );
};

export default StudentOfClass;
