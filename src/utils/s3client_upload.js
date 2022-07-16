import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const s3client = new S3Client({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: "AKIAZZNPBNR3H7QNEMWL",
    secretAccessKey: "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",
  },
});

export async function s3client_upload_file({ filename, filebuffer }) {
  try {
    const upload_command = new PutObjectCommand({
      ACL: "public-read",
      Bucket: "short-video-resource",
      Key: filename,
      Body: filebuffer,
    });
    await s3client.send(upload_command);
    return `https://short-video-resource.s3.ap-southeast-1.amazonaws.com/${filename}`;
  } catch (error) {
    throw new Error(error.message);
  }
}
