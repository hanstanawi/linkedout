import { useEffect, useState } from 'react';
import * as usersApi from 'api/users.api';
import { Link } from 'react-router-dom';

function UsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getUsers = async () => {
    try {
      const fetchedUsers = await usersApi.getAllUsers();
      setUsers(fetchedUsers);
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <main className="text-blue text-4xl">
      {error && <p>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.firstName}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default UsersPage;
