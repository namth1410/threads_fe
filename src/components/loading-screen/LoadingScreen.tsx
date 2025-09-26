import { Spin } from "antd";
import styles from "./LoadingScreen.module.scss";

const LoadingScreen = () => {
  return (
    <div className={styles.loadingScreen}>
      <Spin size="large" />
      <p className={styles.loadingText}>Loading khù khù khác k...</p>
    </div>
  );
};

export default LoadingScreen;
