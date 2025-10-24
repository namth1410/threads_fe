import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import MainLayout from "@/layouts/MainLayout";
import Explore from "@/pages/explore/Explore";
import ForgotPassword from "@/pages/login/ForgotPassword";
import Login from "@/pages/login/Login";
import ResetPassword from "@/pages/login/ResetPassword";
import Profile from "@/pages/profile/Profile";
import Register from "@/pages/register/Register";
import Store from "@/pages/store/Store";
import { AppDispatch, RootState } from "@/store";
import { getMe } from "@/store/slices/meSlice";
import { message, Spin } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { fetchThreads } from "./store/slices/threadSlice";
import { connectSocket, getSocket } from "./utils/socket";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { me } = useSelector((state: RootState) => state.me);
  const { globalLoading } = useSelector((state: RootState) => state.loader);

  useEffect(() => {
    connectSocket();
    const socket = getSocket();

    const completeEvent = `upload-complete`;
    const failedEvent = `upload-failed`;

    socket.on(completeEvent, (payload) => {
      console.log("✅ Upload completed", payload);
      message.success(payload.fileUrl);
      dispatch(fetchThreads());
    });

    socket.on(failedEvent, (payload) => {
      console.error("❌ Upload failed hehe", payload);
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
    <Spin spinning={globalLoading}>
      <Router>
        <Routes>
          {!me && <Route path="/login" element={<Login />} />}
          {!me && (
            <Route path="/forgot-password" element={<ForgotPassword />} />
          )}
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
                    <Route path="/store" element={<Store />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </MainLayout>
              }
            />
          )}
          <Route path="/*" element={<LoadingScreen />} />
        </Routes>
      </Router>
    </Spin>
  );
}

export default App;
