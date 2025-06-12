import { ThreadResponseDto } from "@/types/thread";
import dayjs from "@/utils/dayjs";
import { Avatar, Card, Image, Typography } from "antd";
import { useState } from "react";
import styles from "./ThreadItem.module.scss";

const { Text, Paragraph } = Typography;

type Props = {
  thread: ThreadResponseDto;
};

const ThreadItem: React.FC<Props> = ({ thread }) => {
  const [previewVisible, setPreviewVisible] = useState(false);

  const images = thread.media?.filter((m) => m.type === "image") || [];
  const videos = thread.media?.filter((m) => m.type === "video") || [];

  return (
    <>
      <Card className={styles.threadItem}>
        <div className={styles.header}>
          <Avatar>{thread.user?.username?.[0] || "?"}</Avatar>
          <div>
            <Text className={styles.username}>
              {thread.user?.username || "Người dùng ẩn danh"}
            </Text>
            <br />
            <Text className={styles.timestamp}>
              {dayjs(thread.createdAt).fromNow()}
            </Text>
          </div>
        </div>

        <Paragraph className={styles.content}>{thread.content}</Paragraph>

        {images.length > 0 && (
          <div className={styles.mediaSection}>
            <Text className={styles.label}>Ảnh:</Text>
            <div
              className={styles.stackedPreview}
              onClick={() => setPreviewVisible(true)}
            >
              {images.slice(0, 3).map((img, index) => {
                // Tùy theo index, xoay ảnh khác nhau
                let rotate = "0deg";
                let offsetX = 0;
                let offsetY = 0;

                if (index === 0) {
                  rotate = "-15deg";
                  offsetX = -10;
                  offsetY = 10;
                } else if (index === 1) {
                  rotate = "0deg";
                  offsetX = 0;
                  offsetY = 0;
                } else if (index === 2) {
                  rotate = "15deg";
                  offsetX = 10;
                  offsetY = 10;
                }

                return (
                  <img
                    key={img.id}
                    src={img.url}
                    alt={img.fileName}
                    className={styles.previewImage}
                    style={{
                      transform: `rotate(${rotate})`,
                      left: `${offsetX}px`,
                      top: `${offsetY}px`,
                      zIndex: 10 - index,
                    }}
                  />
                );
              })}
              {images.length > 3 && (
                <div className={styles.moreOverlay}>+{images.length - 3}</div>
              )}
            </div>
          </div>
        )}

        {videos.length > 0 && (
          <div className={styles.mediaSection}>
            <Text className={styles.label}>Video:</Text>
            <div className={styles.videoList}>
              {videos.map((vid) => (
                <video key={vid.id} controls width={220} src={vid.url} />
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Hidden full preview */}
      <Image.PreviewGroup
        preview={{
          visible: previewVisible,
          onVisibleChange: (vis) => setPreviewVisible(vis),
        }}
        items={images.map((img) => img.url)}
      >
        <div style={{ display: "none" }}>
          {images.map((img) => (
            <Image key={img.id} src={img.url} alt={img.fileName} />
          ))}
        </div>
      </Image.PreviewGroup>
    </>
  );
};

export default ThreadItem;
