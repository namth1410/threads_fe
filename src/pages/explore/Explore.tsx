// pages/Explore.tsx
import ThreadItem from "@/components/thread-item/ThreadItem";
import { AppDispatch, RootState } from "@/store";
import { fetchThreads } from "@/store/slices/threadSlice";
import { Spin, Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const { Title } = Typography;

const Explore: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { threads } = useSelector((state: RootState) => state.threads);

  useEffect(() => {
    dispatch(fetchThreads());
  }, [dispatch]);

  return (
    <div>
      <Title level={2}>Trang Khám Phá</Title>
      {!threads ? (
        <Spin />
      ) : threads.length === 0 ? (
        <p>Không có bài đăng nào.</p>
      ) : (
        threads.map((thread) => <ThreadItem key={thread.id} thread={thread} />)
      )}
    </div>
  );
};

export default Explore;
