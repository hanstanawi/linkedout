import { useEffect, useState } from 'react';
import * as usersApi from 'api/users.api';
import CreateUserModal from 'components/users/CreateUserModal';
import UserCard from 'components/users/UserCard';

function UsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestStatus, setRequestStatus] = useState<
    'idle' | 'loading' | 'failed'
  >('idle');

  const getUsers = async () => {
    try {
      setRequestStatus('loading');
      const fetchedUsers = await usersApi.getAllUsers();
      setUsers(fetchedUsers);
      setRequestStatus('idle');
    } catch (err: any) {
      setError(err.response.data.message);
      setRequestStatus('failed');
    }
  };

  const openModalHandler = (state: boolean) => {
    setIsModalOpen(state);
  };

  useEffect(() => {
    getUsers();
  }, []);

  let content;

  if (requestStatus === 'loading') {
    content = (
      <div className="flex justify-center items-center h-96">
        <p>Loading...</p>
      </div>
    );
  } else if (requestStatus === 'idle' && users.length) {
    content = (
      <div className="flex lg:flex-row flex-col lg:items-start items-center lg:gap-x-8 gap-y-8">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    );
  }

  return (
    <section className="container mx-auto h-full">
      <div className="flex justify-between py-6 items-center">
        <h3 className="font-semibold text-2xl">Our Team</h3>
        <button
          type="button"
          className="bg-blue-400 hover:bg-blue-600 text-white rounded-md text-sm font-semibold py-2 px-4"
          onClick={() => setIsModalOpen(true)}
        >
          Add Member
        </button>
      </div>
      {content}
      {isModalOpen && (
        <CreateUserModal setOpen={openModalHandler} isOpen={isModalOpen} />
      )}
    </section>
  );
}

export default UsersPage;
