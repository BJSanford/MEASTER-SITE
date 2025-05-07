"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SocialsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8">
          <Card className="border-gray-800 bg-gray-900/70 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-green-500">
                  <path d="M12 0L1.815 6v12L12 24l10.185-6V6L12 0zm8.14 16.764L12 21.426l-8.14-4.662V7.236L12 2.574l8.14 4.662v9.528z"/>
                </svg>
                MeasterCS_Skins Kick
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video">
                <iframe
                  className="w-full h-full rounded-lg"
                  src="https://player.kick.com/meastercs-skins"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
