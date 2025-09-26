import { HeartOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { useState } from "react";
import styles from "./ThreadItem.module.scss";

const REACTIONS = [
  { key: "like", emoji: "❤️" },
  { key: "haha", emoji: "😂" },
  { key: "wow", emoji: "😮" },
  { key: "sad", emoji: "😢" },
  { key: "angry", emoji: "😡" },
];

type ReactionActionProps = {
  threadId: number;
  count: number;
};

const ReactionAction: React.FC<ReactionActionProps> = ({ threadId, count }) => {
  const [currentReaction, setCurrentReaction] = useState<string | null>(null);

  const handleReaction = (reaction: string) => {
    setCurrentReaction(reaction);
  };

  const reactionContent = (
    <div className={styles.reactionPicker}>
      {REACTIONS.map((r) => (
        <span
          key={r.key}
          className={`${styles.reactionEmoji} ${
            currentReaction === r.key ? styles.selected : ""
          }`}
          onClick={() => handleReaction(r.key)}
        >
          {r.emoji}
        </span>
      ))}
    </div>
  );

  return (
    <Popover
      content={reactionContent}
      trigger="hover"
      mouseEnterDelay={0.2}
      placement="top"
      overlayClassName={styles.reactionPopover}
    >
      <div
        className={styles.action}
        onClick={() => handleReaction(currentReaction ?? "like")}
      >
        {currentReaction ? (
          <span className={styles.currentReaction}>
            {REACTIONS.find((r) => r.key === currentReaction)?.emoji}
          </span>
        ) : (
          <HeartOutlined />
        )}
        <span>{count}</span>
      </div>
    </Popover>
  );
};

export default ReactionAction;
