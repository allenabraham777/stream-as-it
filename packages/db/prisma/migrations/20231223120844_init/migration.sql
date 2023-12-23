-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StreamKey" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stream_id" INTEGER NOT NULL,
    "platform" TEXT NOT NULL,
    "stream_key" TEXT NOT NULL,
    "stream_url" TEXT,
    "video_id" TEXT,
    "account_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME,
    CONSTRAINT "StreamKey_stream_id_fkey" FOREIGN KEY ("stream_id") REFERENCES "Stream" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StreamKey_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_StreamKey" ("account_id", "created_at", "deleted_at", "id", "platform", "stream_id", "stream_key", "stream_url", "updated_at", "video_id") SELECT "account_id", "created_at", "deleted_at", "id", "platform", "stream_id", "stream_key", "stream_url", "updated_at", "video_id" FROM "StreamKey";
DROP TABLE "StreamKey";
ALTER TABLE "new_StreamKey" RENAME TO "StreamKey";
CREATE UNIQUE INDEX "StreamKey_stream_id_platform_deleted_at_key" ON "StreamKey"("stream_id", "platform", "deleted_at");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
