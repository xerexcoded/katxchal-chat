import React from 'react'
import { LogIn } from 'lucide-react';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
const navbar = () => {
  return (
    <div className="navbar bg-blend-lighten px-5">
      <div className="navbar-start">
        <div className="dropdown ">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-300 rounded-box w-52">
            <li><a>Chat</a></li>
            <li>
              <a>RAG</a>
              <ul className="p-5">
                <li><a>URL</a></li>
                <li><a>PDF</a></li>
              </ul>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl text-b">Katxchal</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a>Chat</a></li>
          <li>
            <details>
              <summary>RAG</summary>
              <ul className="bg-slate-100 p-2">
                <li><a>URL</a></li>
                <li><a>PDF</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <SignedOut>
          <SignInButton><Button className='bg-slate-400 rounded-xl'>
            <LogIn className="mr-2 h-4 w-4" /> Login
          </Button></SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  )
}

export default navbar