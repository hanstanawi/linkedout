import UserProfilePage from 'pages/UserProfilePage';
import UsersPage from 'pages/UsersPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<UsersPage />} />
      <Route path="/user">
        <Route path=":userId" element={<UserProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
