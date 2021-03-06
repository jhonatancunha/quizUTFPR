import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

// HOOKS
import useQuestionQuiz from '@hooks/QuestionQuiz';

import ChipInput from '@components/ChipInput';

export default function TagInput({
  children,
  formikID,
  handleFormikChange,
  handlePropsChange,
  ...props
}) {
  const [timer, setTimer] = useState(null);
  const { setTyping } = useQuestionQuiz();

  const handleUpdateContext = ({ handleUpdate, ...params }) => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    setTimer(
      setTimeout(() => {
        handleUpdate({ ...params });
        setTyping(false);
      }, 500)
    );
  };

  const myTagInput = useMemo(
    () => (
      <MemoizedTagInput
        handleUpdateContext={handleUpdateContext}
        formikID={formikID}
        setTyping={setTyping}
        handlePropsChange={handlePropsChange}
        handleFormikChange={handleFormikChange}
        {...props}
      />
    ),
    [props.value, handlePropsChange]
  );

  return <>{myTagInput}</>;
}

function MemoizedTagInput({
  formikID,
  setTyping,
  handleFormikChange,
  handleUpdateContext,
  handlePropsChange,
  ...props
}) {
  return (
    <ChipInput
      id={formikID}
      onChange={(_, tags) => {
        setTyping(true);
        handleFormikChange('question.tags', tags);
        handleUpdateContext({ value: tags, ...handlePropsChange });
      }}
      {...props}
    />
  );
}

TagInput.defaultProps = {
  handleFormikChange: () => {},
  children: <></>,
};

TagInput.propTypes = {
  children: PropTypes.node,
  formikID: PropTypes.string.isRequired,
  handleFormikChange: PropTypes.func,
  handlePropsChange: PropTypes.shape({
    handleUpdate: PropTypes.func,
    key: PropTypes.string,
    index: PropTypes.number,
  }).isRequired,
};
