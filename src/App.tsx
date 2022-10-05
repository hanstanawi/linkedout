import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from 'components/ui/Layout';
import UserProfile from 'features/users/pages/UserProfile';
import Users from 'features/users/pages/Users';
import NotFound from 'pages/NotFound';
import { useAppDispatch } from 'hooks/use-app-dispatch';
import { fetchUsers } from 'features/users/users.slice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Users />} />
        <Route path="/user">
          <Route path=":userId" element={<UserProfile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
