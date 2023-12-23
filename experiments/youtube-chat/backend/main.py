from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import pytchat
import emoji

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/chat/{video_id}")
async def get_chat(video_id: str):
    try:
        chat = pytchat.create(video_id=video_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    def chat_generator():
        try:
            while chat.is_alive():
                for c in chat.get().sync_items():
                    text = emoji.emojize(c.message)
                    yield f"data: {c.author.name}: {text}\n\n"
        except GeneratorExit:
            chat.terminate()

    return StreamingResponse(chat_generator(), media_type="text/event-stream")
