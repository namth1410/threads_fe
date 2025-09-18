import { Spin } from "antd";
import styles from "./LoadingScreen.module.scss";

const LoadingScreen = () => {
  return (
    <div className={styles.loadingScreen}>
      <Spin size="large" />
      <p className={styles.loadingText}>Loading hihi...</p>
    </div>
  );
};

export default LoadingScreen;
