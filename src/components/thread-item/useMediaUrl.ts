// hooks/useMediaUrl.ts
import { useEffect, useState } from "react";

export function useMediaUrl(fileName: number | string) {
  const [url, setUrl] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchUrl = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${window._env_.VITE_API_URL}/minio/presigned?fileName=${fileName}`
        );
        const data = await res.json();
        if (!cancelled) setUrl(data.data.url);
      } catch (err) {
        console.error("Failed to get media URL:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchUrl();
    return () => {
      cancelled = true;
    };
  }, [fileName]);

  return { url, loading };
}
