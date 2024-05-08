import React, { useCallback } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';

import { useAppAction, useAppState } from '@/store/app/hooks';
import { EModals } from '@/store/app/types';

function ConfirmModal() {
  const { modals, appLoading } = useAppState();
  const { onConfirmClose } = useAppAction();

  const closeModal = useCallback(() => {
    onConfirmClose();
  }, [onConfirmClose]);

  const handleAccept = () => {
    modals[EModals.Confirm].props.accept();
  };

  if (!modals[EModals.Confirm].active) return null;
  return (
    <Modal show={true} onHide={closeModal} aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title>{modals[EModals.Confirm].props.title || 'Modal heading'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modals[EModals.Confirm].props.text || 'Woohoo, you are reading this text in a modal!'}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={closeModal}>
          Close
        </Button>
        <Button
          variant='danger'
          onClick={handleAccept}
          disabled={appLoading}
          className='d-flex align-items-center gap-3'
        >
          {modals[EModals.Confirm].props.actonBtnText || 'Del'}
          {appLoading && <Spinner animation='border' variant='light' size={'sm'} />}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
