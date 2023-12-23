-- DropIndex
DROP INDEX "StreamKey_stream_key_key";

-- AlterTable
ALTER TABLE "StreamKey" ADD COLUMN "stream_url" TEXT;
ALTER TABLE "StreamKey" ADD COLUMN "video_id" TEXT;
