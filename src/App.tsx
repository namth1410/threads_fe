import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import MainLayout from "@/layouts/MainLayout";
import Explore from "@/pages/explore/Explore";
import ForgotPassword from "@/pages/login/ForgotPassword";
import Login from "@/pages/login/Login";
import ResetPassword from "@/pages/login/ResetPassword";
import Profile from "@/pages/profile/Profile";
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
import { connectSocket, getSocket } from "./utils/socket";
import { message } from "antd";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { me } = useSelector((state: RootState) => state.me);

  useEffect(() => {
    connectSocket();
    const socket = getSocket();

    const completeEvent = `upload-complete`;
    const failedEvent = `upload-failed`;

    socket.on(completeEvent, (payload) => {
      console.log("✅ Upload completed", payload);
      message.success(payload.fileUrl);
    });

    socket.on(failedEvent, (payload) => {
      console.error("❌ Upload failed", payload);
      message.error(payload.reason);
    });

    return () => {
      socket.off(completeEvent);
      socket.off(failedEvent);
    };
  }, []);

  useEffect(() => {
    if (!me) {
      dispatch(getMe());
    }
  }, []);

  return (
    <Router>
      <Routes>
        {!me && <Route path="/login" element={<Login />} />}
        {!me && <Route path="/forgot-password" element={<ForgotPassword />} />}
        <Route path="/reset-password" element={<ResetPassword />} />
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
