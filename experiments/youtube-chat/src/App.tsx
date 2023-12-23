import { useRef, useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { YouTubeLiveChat } from 'youtube-live-chat-ts';

const handler = new YouTubeLiveChat(import.meta.env['VITE_GOOGLE_API_KEY']);

function App() {
    const [data, setData] = useState<string[]>([]);
    const [isAutoScroll, setIsAutoScroll] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const startChat = async () => {
        const videoId = inputRef.current?.value;
        if (videoId) {
            const liveChatId = await handler.getLiveChatIdFromVideoId(videoId);
            handler.listen(liveChatId).subscribe((chatMessage) => {
                if (chatMessage.snippet.type === 'textMessageEvent') {
                    setData((prevData) => [
                        ...prevData,
                        `${chatMessage.authorDetails.displayName}: ${chatMessage.snippet.displayMessage}`
                    ]);
                }
            });
        }
    };

    const scrollToBottom = () => {
        chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
    };

    const handleScroll = () => {
        if (!chatContainerRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 10; // 100px threshold

        setIsAutoScroll(isNearBottom);
    };

    const handleScrollToBottomClick = () => {
        setIsAutoScroll(true);
        scrollToBottom();
    };

    useEffect(() => {
        const container = chatContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        if (isAutoScroll) {
            scrollToBottom();
        }
    }, [data]);

    return (
        <div>
            <div>
                <input ref={inputRef} />
                <button onClick={startChat}>Start chat fetch</button>
            </div>
            <h3>{data.length}</h3>
            <div
                ref={chatContainerRef}
                style={{ overflowY: 'auto', maxHeight: '400px' }}
                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                    const target = e.target as HTMLElement;
                    if (target.className === 'chat') {
                        alert(target.innerHTML);
                    }
                }}
            >
                <InfiniteScroll
                    next={() => {}}
                    dataLength={data.length}
                    hasMore={false}
                    loader={<></>}
                >
                    {data.map((_data, index) => (
                        <div className="chat" key={index}>
                            {_data}
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
            {!isAutoScroll && (
                <div>
                    <button onClick={handleScrollToBottomClick}>Scroll to bottom</button>
                </div>
            )}
        </div>
    );
}

export default App;
