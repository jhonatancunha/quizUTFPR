import React,{forwardRef} from "react";
import PropTypes from 'prop-types'
import { Backdrop, Fade } from "@material-ui/core";
import {StyledModal} from './style'

const ModalWrapper = forwardRef((props, ref) => {
  const {open,
    handleClose,
    modalTitle,
    modalDescription,
    children} = props;

  return (
    <StyledModal
      aria-labelledby={modalTitle}
      aria-describedby={modalDescription}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      ref={ref}
    >
      <Fade in={open}>
        {children}
      </Fade>
    </StyledModal>
  );
});

ModalWrapper.defaultProps = {
  onClose: () => {}
}
ModalWrapper.propTypes = {
  onClose: PropTypes.func
};

export default ModalWrapper;
