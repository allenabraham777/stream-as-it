export interface Stream {
    id: number;
    user_id: number;
    account_id: number;
    stream_title: string;
    stream_description: string;
    streams?: StreamKey[];
}

export interface StreamKey {
    id: number;
    stream_id: number;
    platform: string;
    stream_key: string;
    account_id: number;
}
