import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiX } from 'react-icons/fi';
import Modal, { Styles } from 'react-modal';

import { Button } from 'components/Form/Button';
import { useUpdateCategory } from 'hooks/useCategory';
import { ICarCategory } from 'interfaces/cars';
import { IUpdateCategoryDTO } from 'interfaces/cars';

import { CategoryForm } from '../Form';
import * as S from './styles';

const customStyles: Styles = {
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1100,
    margin: '0 auto',
  },
  overlay: {
    zIndex: 1000,
    background: 'rgba(255, 255, 255, 0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

Modal.setAppElement('#__next');

interface ModalProps {
  modalIsOpen: boolean;
  onRequestClose: () => void;
  categoryDetails: ICarCategory;
}

export const ModalCategoryEdit = ({
  modalIsOpen,
  onRequestClose,
  categoryDetails,
}: ModalProps) => {
  const {
    control,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
  } = useForm();

  useEffect(() => {
    categoryDetails && reset(categoryDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryDetails]);

  const { mutateAsync } = useUpdateCategory();

  const handleEditCategory: SubmitHandler<IUpdateCategoryDTO> = async (
    data
  ) => {
    try {
      await mutateAsync({ id: categoryDetails.id, payload: data });
      reset();
      onRequestClose();
    } catch (error) {
      return;
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick
      style={customStyles}
      bodyOpenClassName="modalOpen"
      className="modalContent"
    >
      <S.ModalContainer>
        <S.ModalHeader>
          <h1>Editar Categoria</h1>
          <FiX size={32} onClick={onRequestClose} />
        </S.ModalHeader>

        <S.ModalContent onSubmit={handleSubmit(handleEditCategory)}>
          <CategoryForm control={control} errors={errors} />
          <S.ButtonsContainer>
            <Button
              loading={isSubmitting}
              type="submit"
              containerClass="buttonContainer"
            >
              Salvar
            </Button>
          </S.ButtonsContainer>
        </S.ModalContent>
      </S.ModalContainer>
    </Modal>
  );
};
