import { PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

import { env } from '@/constants';
import { updateUserByIdService } from '@/features/user/server/userService';
import { s3Client } from '@/lib/s3';

export async function s3UploadProfilePictureService(file: File, userId: string): Promise<string> {
  const fileExtension = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExtension}`;
  const filepath = `profile-pictures/${fileName}`;

  const imageUrl = await s3UploadService(file, filepath);
  await updateUserByIdService(userId, { imageUrl });

  return imageUrl;
}

export async function s3UploadService(file: File, filepath: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());

  const imageUrl = `https://${env.AWS_S3_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/${filepath}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: env.AWS_S3_BUCKET_NAME,
      Key: filepath,
      Body: buffer,
      ContentType: file.type,
    })
  );

  return imageUrl;
}
