import React from 'react'
import { DBCardDemo } from './CardDemo'
import { GmailCardDemo } from './CardDemo'
import { CodeDebuggerCardDemo } from './CardDemo'
import { GithubDemoCards } from './CardDemo'
import { TicketingAgentsCardDemo } from './CardDemo'

const CardPage = () => {
    return (
        <div className="relative min-h-screen bg-purple-950/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex flex-col items-center justify-center p-4">

            {/* Title */}
            <h1 className="text-4xl font-bold text-center text-purple-900 mb-8">Our Agents</h1>

            {/* Grid */}
            <div className="grid grid-cols-3 gap-6">
                <GithubDemoCards />
                <DBCardDemo />
                <GmailCardDemo />
                <CodeDebuggerCardDemo />
                <TicketingAgentsCardDemo />
            </div>
        </div>

    )
}

export default CardPage