import React from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import StyledButton from '@components/Button';

// Routes
import { CLASSES } from '@routes';

// HOOKS
import useAuth from '@hooks/Auth';

// Style
import {
  ToolBar,
  StyledExitIcon,
  StyledAvatar,
  NameTeacher,
  WrapperTeacher,
  // ClassName,
} from './style';

const CustomToolBar = () => {
  const navigate = useNavigate();
  const { teacherInfo } = useAuth();
  // const location = useLocation();

  return (
    <ToolBar>
      <StyledButton
        onClick={() => navigate(CLASSES)}
        color="primary"
        startIcon={<StyledExitIcon />}
        size="large"
      >
        Sair
      </StyledButton>

      {/* <ClassName>{location?.state?.title || 'Sem Título'}</ClassName> */}

      <WrapperTeacher>
        <StyledAvatar src="https://image.flaticon.com/icons/png/512/147/147144.png" />
        <NameTeacher>{teacherInfo.teacher.name}</NameTeacher>
      </WrapperTeacher>
    </ToolBar>
  );
};

export default CustomToolBar;