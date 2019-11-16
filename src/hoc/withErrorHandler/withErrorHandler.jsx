import React from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import useHttpError from '../../hooks/useHttpError';

const withErrorHandler = (WrappedComponent, axios) => {
  return ({ ...props }) => {
    const [error, errorDismissHandler] = useHttpError(axios);
    return (
      <Aux>
        <Modal show={error} modalClosed={errorDismissHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  }
}

export default withErrorHandler;
