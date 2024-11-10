import axios from "axios";

// Presigned url 발급
export const postPresignedUrl = async (imageNames: string[]) => {
  const promises = imageNames.map((imageName) => axios.post("/file/IMAGE/presigned-url", { imageName }));

  try {
    const responses = await Promise.all(promises);
    return responses.map((response) => response.data);
  } catch (error) {
    console.error("Presigned URL 발급 실패:", error);
    throw new Error("이미지 업로드 준비 중 문제가 발생했습니다.");
  }
};

// s3 이미지 업로드
export const putS3Upload = async (presignedUrls: string[], photos: { photo_url: string; file: File }[]) => {
  try {
    const uploadPromises = photos.map((photo, index) =>
      axios.put(presignedUrls[index], photo.file, {
        headers: {
          "Content-Type": "image/jpeg",
        },
      }),
    );

    await Promise.all(uploadPromises);
    return true;
  } catch (error) {
    console.error("S3 업로드 실패:", error);
    throw new Error("이미지 업로드 중 문제가 발생했습니다.");
  }
};

// S3 URL 생성 함수
export const getS3Url = (presignedUrl: string): string => {
  try {
    // presigned URL에서 쿼리 파라미터 제거
    const url = new URL(presignedUrl);
    return `${url.origin}${url.pathname}`;
  } catch (error) {
    console.error("S3 URL 생성 실패:", error);
    throw new Error("이미지 URL 생성에 실패했습니다.");
  }
};
