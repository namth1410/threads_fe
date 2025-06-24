import { useMediaUrl } from "./useMediaUrl";

type Props = {
  type: string;
  fileName: string;
};

const ThreadMedia: React.FC<Props> = ({ type, fileName }) => {
  const { url, loading } = useMediaUrl(fileName);

  if (loading) return <div>Loading...</div>; // hoặc Skeleton

  if (!url) return <div>Error</div>;

  return type.startsWith("image") ? (
    <img src={url} alt={fileName} style={{ width: "100%" }} />
  ) : (
    <video src={url} controls preload="metadata" style={{ width: "100%" }} />
  );
};

export default ThreadMedia;
