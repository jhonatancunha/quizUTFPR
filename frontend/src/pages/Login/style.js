import styled from 'styled-components';

// import MyBackgound from '@assets/background_login_copy.svg';
import { ReactComponent as UTFPR } from '@assets/marcaUTFPR/logoUTFPR.svg';

import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
} from '@material-ui/core';

export const StyledContainer = styled(Container)`
  background: white;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  background: #f4f5f9;
`;

export const DescriptionsGrid = styled(Grid)`
  padding-bottom: 20px;
`;

export const Title = styled(Typography)`
  font-weight: 700;
  margin-bottom: 10px;
`;

export const Subtitle = styled(Typography)`
  font-weight: 500;
  opacity: 0.7;
`;

export const GridForm = styled(Grid)`
  width: 100%;
`;

export const StyledInput = styled(TextField)`
  width: 100%;
  margin-bottom: 20px;
  background: white;
  border-radius: 6px;
  background: transparent;
`;

export const StyledButton = styled(Button)`
  && {
    width: 50%;
    height: 50px;
    font-weight: bolder;
    font-size: 1.3em;
  }
`;

export const LogoUTFPR = styled(UTFPR)`
  width: 450px;
  height: 100%;
`;
