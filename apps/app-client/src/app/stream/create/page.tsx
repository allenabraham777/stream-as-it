'use client';
import React, { useRef } from 'react';

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    Label,
    Input,
    CardFooter,
    Button,
    CardContent,
    Textarea,
    toast
} from '@stream-as-it/ui';
import { createNewStream } from '@/api/stream';
import { CheckCircle2 } from 'lucide-react';

interface Props {}

const CreateStream = (props: Props) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const descRef = useRef<HTMLTextAreaElement>(null);

    const submit = async () => {
        if (!titleRef.current?.value || !descRef.current?.value) return;
        try {
            await createNewStream({
                stream_title: titleRef.current.value,
                stream_description: descRef.current.value
            });
            toast('Stream created successfully', {
                icon: <CheckCircle2 className="text-primary" />,
                description: 'Visit the dashboard to see the created stream'
            });
            titleRef.current.value = '';
            descRef.current.value = '';
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast('Stream creation failed', {
                description: error?.response?.data.message || 'Please try again later!'
            });
        }
    };

    return (
        <Card className="w-96">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-primary">Create a new stream</CardTitle>
                <CardDescription>Enter stream name and description.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Stream Name</Label>
                    <Input
                        id="stream_title"
                        type="text"
                        placeholder="Eg. My public stream"
                        ref={titleRef}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Stream Description</Label>
                    <Textarea
                        id="stream_description"
                        placeholder="Stream description"
                        ref={descRef}
                    />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <Button className="w-full" onClick={submit}>
                    Create stream
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CreateStream;
