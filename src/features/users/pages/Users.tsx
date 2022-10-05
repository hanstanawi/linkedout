import { useEffect, useMemo, useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CreateUser from 'features/users/components/modals/CreateUser';
import UserCard from 'features/users/components/UserCard';
import { useAppSelector } from 'hooks/use-app-selector';
import {
  getAllUsers,
  getUsersError,
  getUsersStatus,
} from 'features/users/users.slice';
import LoadingSpinner from 'components/ui/LoadingSpinner';
import moment from 'moment';
import Button from 'components/ui/Button';

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

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      return moment(b.createdAt).diff(moment(a.createdAt));
    });
  }, [users]);

  let content;

  if (requestStatus === 'loading') {
    content = (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner color="#007CE7" size={60} />
      </div>
    );
  } else if (requestStatus === 'succeeded' && sortedUsers.length) {
    content = (
      <div className="flex md:flex-row flex-col lg:items-start items-center md:gap-x-8 gap-y-8 flex-wrap">
        {sortedUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    );
  } else if (requestStatus === 'succeeded' && !sortedUsers.length) {
    content = (
      <div className="h-96 flex flex-col justify-center items-center w-full gap-y-1">
        <h3 className="text-lg font-semibold">No Members</h3>
        <p className="text-sm font-light">
          Click Add Member to add your profile
        </p>
      </div>
    );
  }

  return (
    <>
      <section className="container mx-auto h-full">
        <div className="flex md:flex-row flex-col md:justify-between py-6 md:gap-y-0 gap-y-4 items-center">
          <h3 className="font-semibold text-2xl text-gray-800">Our Members</h3>
          <Button onClick={() => setIsModalOpen(true)}>
            <FaUserPlus />
            Add Member
          </Button>
        </div>
        {content}
      </section>
      {isModalOpen && (
        <CreateUser setOpen={openModalHandler} isOpen={isModalOpen} />
      )}
    </>
  );
}

export default UsersPage;
