'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import CopyToClipboard from '@/components/copy-to-clipboard'
import { SendHorizonalIcon } from 'lucide-react';
export default function Chat() {
    const ref = useRef<HTMLDivElement>(null)
    const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat();

    useEffect(() => {
        if (ref.current === null) return
        ref.current.scrollTo(0, ref.current.scrollHeight)
    }, [messages])

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        handleSubmit(e)

    }



    return (
        <section className='py-24 text-zinc-700'>
            <div className='container max-w-3xl'>
                {/* Credits section */}
                <div className='mx-auto flex  flex-col max-w-lg items-center justify-between px-2'>
                    <h1 className='font-serif text-2xl font-medium'>Ask Katxchal</h1>
                    {/* Chat area */}
                    <div className='mx-auto lg:w-[500px] mt-3 w-full max-w-lg'>
                        <ScrollArea
                            className='mb-2 lg:w-[500px] h-[400px] md:w-[400px]  rounded-md border p-4' ref={ref}
                        >
                            {messages.map(m => (
                                <div key={m.id} className='mr-6 whitespace-pre-wrap md:mr-12'>
                                    {m.role === 'user' && (
                                        <div className='mb-6 flex gap-3'>
                                            <Avatar>
                                                <AvatarImage src='' />
                                                <AvatarFallback className='text-sm'></AvatarFallback>
                                            </Avatar>
                                            <div className='mt-1.5'>
                                                <p className='font-semibold'>You</p>
                                                <div className='mt-1.5 text-sm text-zinc-500'>
                                                    {m.content}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {m.role === 'assistant' && (
                                        <div className='mb-6 flex gap-3'>
                                            <Avatar>
                                                <AvatarImage src='' />
                                                <AvatarFallback className='bg-emerald-500 text-white'>
                                                    AI
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className='mt-1.5 w-full'>
                                                <div className='flex justify-between'>
                                                    <p className='font-semibold'>Bot</p>
                                                    <CopyToClipboard message={m} className='-mt-1' />
                                                </div>
                                                <div className='mt-2 text-sm text-zinc-500'>
                                                    {m.content}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </ScrollArea>

                        <form onSubmit={onSubmit} className='relative'>
                            <Input
                                name='message'
                                value={input}
                                onChange={handleInputChange}
                                placeholder={'Ask me anything...'}
                                className='pr-12 placeholder:italic placeholder:text-zinc-600/75 focus-visible:ring-zinc-500'
                            />
                            <Button
                                size='icon'
                                type='submit'
                                variant='secondary'
                                className='absolute right-1 top-1 h-8 w-10'
                            >
                                <SendHorizonalIcon className='h-5 w-5 text-emerald-500' />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}