import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FiUserPlus } from 'react-icons/fi';
import { RiSearchLine } from 'react-icons/ri';

import { CardUser } from 'components/AdminComponents/CardUser';
import { AdminInput } from 'components/AdminComponents/Input';
import { AdminLayout } from 'components/AdminComponents/Layout';
import { ModalUserCreate } from 'components/AdminComponents/Users/ModalUserCreate';
import { ModalUserDelete } from 'components/AdminComponents/Users/ModalUserDelete';
import { ModalUserEdit } from 'components/AdminComponents/Users/ModalUserEdit';
import { useGetUsers } from 'hooks/useUsers';
import { IUser } from 'interfaces/auth';
import * as S from 'styles/pages/adminUsersStyles';
import { withSSRAdmin } from 'utils/withSSRAdmin';

export default function AdminUsers() {
  const { data: users } = useGetUsers();
  const [userSelected, setUserSelected] = useState<IUser>();
  const [editUserModalOpen, setEditUserModalOpen] = useState(false);
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);
  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);
  const { control } = useForm();

  const handleOpenEditUserModal = useCallback((user: IUser) => {
    setUserSelected(user);
    setEditUserModalOpen(true);
  }, []);

  const handleCloseEditUserModal = useCallback(() => {
    setUserSelected(undefined);
    setEditUserModalOpen(false);
  }, []);

  const handleDeleteUserModal = useCallback((user) => {
    setUserSelected(user);
    setDeleteUserModalOpen(true);
  }, []);

  return (
    <AdminLayout title="Usuários | RentX Adm.">
      <S.Container>
        <S.ContentContainer>
          <h1>Usuários</h1>
          <S.ContentHeader>
            <S.SearchContainer>
              <Controller
                control={control}
                name="search"
                render={({ field: { value = '', onChange } }) => (
                  <AdminInput
                    id="search"
                    value={value}
                    onChange={onChange}
                    placeholder="Buscar usuário"
                    startIcon={<RiSearchLine size={24} />}
                    filled={value !== ''}
                  />
                )}
              />
            </S.SearchContainer>

            <button onClick={() => setCreateUserModalOpen(true)}>
              <FiUserPlus size={32} />
            </button>
          </S.ContentHeader>

          {users?.map((user) => (
            <CardUser
              key={user.id}
              userData={user}
              toggleEdit={handleOpenEditUserModal}
              toggleDelete={handleDeleteUserModal}
            />
          ))}

          <ModalUserCreate
            modalIsOpen={createUserModalOpen}
            onRequestClose={() => setCreateUserModalOpen(false)}
          />

          <ModalUserEdit
            modalIsOpen={editUserModalOpen}
            onRequestClose={handleCloseEditUserModal}
            userDetails={userSelected}
          />

          <ModalUserDelete
            modalIsOpen={deleteUserModalOpen}
            onRequestClose={() => setDeleteUserModalOpen(false)}
            userDetails={userSelected}
          />
        </S.ContentContainer>
      </S.Container>
    </AdminLayout>
  );
}

export const getServerSideProps = withSSRAdmin(async () => {
  return {
    props: {},
  };
});
