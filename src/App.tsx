import { useEffect, useState } from 'react';
import * as usersApi from 'api/users.api';

function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const fetchedUsers = await usersApi.getAllUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className='text-blue text-4xl bg-blue-200'>
      <h1>Hello World</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.firstName}</li>
        ))}
      </ul>
    </main>
  );
}

export default App;
