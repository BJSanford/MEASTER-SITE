
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <Card className="border-gray-800 bg-gray-900/70 text-white">
          <CardHeader>
            <CardTitle>Top Wagerers - MEASTER Code</CardTitle>
            <CardDescription>Highest wagering players using code MEASTER</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-gray-800 p-4 hover:border-amber-500 transition-all duration-300 hover:scale-105 transform hover:bg-gray-800/50">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-amber-500">#{i + 1}</div>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                    <div className="font-medium">Player_{i + 1}</div>
                  </div>
                  <div className="text-amber-500 font-medium">${(1000000 - i * 50000).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
