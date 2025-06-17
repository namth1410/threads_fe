import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import MainLayout from "@/layouts/MainLayout";
import Explore from "@/pages/explore/Explore";
import Login from "@/pages/login/Login";
import Register from "@/pages/register/Register";
import { AppDispatch, RootState } from "@/store";
import { getMe } from "@/store/slices/meSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Profile from "@/pages/profile/Profile";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { me } = useSelector((state: RootState) => state.me);

  useEffect(() => {
    if (!me) {
      dispatch(getMe());
    }
  }, []);

  return (
    <Router>
      <Routes>
        {!me && <Route path="/login" element={<Login />} />}
        <Route path="/register" element={<Register />} />

        {me && (
          <Route
            path="/*"
            element={
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Explore />} />
                  <Route path="/search" element={<div>Search Page</div>} />
                  <Route
                    path="/notifications"
                    element={<div>Notifications Page</div>}
                  />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </MainLayout>
            }
          />
        )}
        <Route path="/*" element={<LoadingScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
