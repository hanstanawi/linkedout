import { useEffect, useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CreateUserModal from 'components/users/CreateUserModal';
import UserCard from 'components/users/UserCard';
import { useAppSelector } from 'hooks/useAppSelector';
import {
  getAllUsers,
  getUsersError,
  getUsersStatus,
} from 'app/slices/users.slice';

function UsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const users = useAppSelector(getAllUsers);
  const requestStatus = useAppSelector(getUsersStatus);
  const error = useAppSelector(getUsersError);

  useEffect(() => {
    if (error) {
      toast.error(`Something wrong happened! ${error}`);
    }
  }, [error]);

  const openModalHandler = (state: boolean) => {
    setIsModalOpen(state);
  };

  let content;

  if (requestStatus === 'loading') {
    content = (
      <div className="flex justify-center items-center h-96">
        <p>Loading...</p>
      </div>
    );
  } else if (requestStatus === 'succeeded' && users.length) {
    content = (
      <div className="flex lg:flex-row flex-col lg:items-start items-center lg:gap-x-8 gap-y-8 flex-wrap">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    );
  }

  return (
    <>
      <section className="container mx-auto h-full">
        <div className="flex justify-between py-6 items-center">
          <h3 className="font-semibold text-2xl">Our Members</h3>
          <button
            type="button"
            className="bg-blue-400 hover:bg-blue-600 text-white 
            rounded-md text-sm font-semibold py-2 px-4 flex items-center gap-x-1"
            onClick={() => setIsModalOpen(true)}
          >
            <FaUserPlus />
            Add Member
          </button>
        </div>
        {content}
      </section>
      {isModalOpen && (
        <CreateUserModal
          setOpen={openModalHandler}
          isOpen={isModalOpen}
          mode="create"
          user={null}
        />
      )}
    </>
  );
}

export default UsersPage;
