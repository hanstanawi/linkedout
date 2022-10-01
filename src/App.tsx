import Layout from 'components/layout/Layout';
import UserProfilePage from 'pages/UserProfilePage';
import UsersPage from 'pages/UsersPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<UsersPage />} />
        <Route path="/user">
          <Route path=":userId" element={<UserProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
