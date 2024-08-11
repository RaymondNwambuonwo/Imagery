import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./styles.css";

interface ImageryProps {
  url: string;
  limit: number;
  page: number;
}

interface ImageItem {
  id: string;
  download_url: string;
}

export default function Imagery({ url, limit = 5, page = 1 }: ImageryProps) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function grabImages(getUrl: string) {
    try {
      setLoading(true);

      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await response.json();

      if (data) {
        setImages(data);
        setLoading(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setErrorMsg(e.message);
      setLoading(false);
    }
  }

  const handlePrevious = () => {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  };

  const handleNext = () => {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  };

  useEffect(() => {
    if (url !== "") grabImages(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  if (loading) {
    return <div>Loading Data, one second!</div>;
  }

  if (errorMsg) {
    return <div>Error Occured! {errorMsg} </div>;
  }

  return (
    <div className='container'>
      <BsArrowLeftCircleFill
        onClick={handlePrevious}
        className='arrow arrow-left'
      />
      {images && images.length
        ? images.map((imageItem, index) => (
            <img
              key={imageItem.id}
              alt={imageItem.download_url}
              src={imageItem.download_url}
              className={
                currentImage === index
                  ? "current-image"
                  : "current-image hide-current-image"
              }
            />
          ))
        : null}
      <BsArrowRightCircleFill
        onClick={handleNext}
        className='arrow arrow-right'
      />
      <span className='circle-indicators'>
        {images && images.length
          ? images.map((_, index) => (
              <button
                key={index}
                className={
                  currentImage === index
                    ? "current-indicator"
                    : "current-indicator inactive-indicator"
                }
                onClick={() => setCurrentImage(index)}></button>
            ))
          : null}
      </span>
    </div>
  );
}
