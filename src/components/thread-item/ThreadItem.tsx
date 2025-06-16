import { ThreadResponseDto } from "@/types/thread";
import {
  HeartOutlined,
  MessageOutlined,
  RetweetOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Avatar } from "antd";
import styles from "./ThreadItem.module.scss";

dayjs.extend(relativeTime);

type Props = {
  thread: ThreadResponseDto;
};

const ThreadItem: React.FC<Props> = ({ thread }) => {
  const { user, content, media, createdAt } = thread;

  return (
    <div className={styles.threadItem}>
      <div className={styles.header}>
        <Avatar size="small">{user?.username?.[0]?.toUpperCase()}</Avatar>
        <span className={styles.username}>{user?.username}</span>
        <span className={styles.timestamp}>{dayjs(createdAt).fromNow()}</span>
      </div>

      <div className={styles.content}>{content}</div>

      {media.length > 0 && (
        <div className={styles.media}>
          {media.map((m) =>
            m.type.startsWith("image") ? (
              <img
                key={m.id}
                src={m.url}
                alt={m.fileName}
                style={{ width: `${100 / Math.min(media.length, 3)}%` }}
              />
            ) : (
              <video
                key={m.id}
                src={m.url}
                controls
                style={{ width: `${100 / Math.min(media.length, 3)}%` }}
              />
            )
          )}
        </div>
      )}

      <div className={styles.actions}>
        <div className={styles.action}>
          <HeartOutlined />
          <span>1.3K</span>
        </div>
        <div className={styles.action}>
          <MessageOutlined />
          <span>8</span>
        </div>
        <div className={styles.action}>
          <RetweetOutlined />
          <span>5</span>
        </div>
        <div className={styles.action}>
          <ShareAltOutlined />
          <span>1</span>
        </div>
      </div>
    </div>
  );
};

export default ThreadItem;
