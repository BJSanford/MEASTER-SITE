"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Trophy, Zap, Users, Star, DollarSign, Calendar, LogOut, BarChart3, Coins } from "lucide-react"
import CityOverlay from "../city-overlay"

// Mock data - would be replaced with API data
const mockUserData = {
  username: "Player123",
  avatar: "/placeholder.svg?height=100&width=100",
  totalWagered: 7500,
  rakebackPercentage: 7.5,
  rakebackEarned: 562.5,
  measterCoins: 350,
  joinDate: "2023-09-15",
  referralCode: "MEASTER",
  depositHistory: [
    { date: "2023-09-15", amount: 100, bonus: 20 },
    { date: "2023-10-01", amount: 200, bonus: 40 },
    { date: "2023-11-10", amount: 150, bonus: 30 },
  ],
  wagerHistory: [
    { date: "2023-09", amount: 2000 },
    { date: "2023-10", amount: 3000 },
    { date: "2023-11", amount: 2500 },
  ],
}

// Mock giveaway data
const mockGiveaways = [
  {
    id: 2,
    title: "Monthly Skin Giveaway",
    prizePool: 2500,
    endsIn: "12d 8h 15m",
    participants: 342,
    type: "monthly",
  },
]

// Mock reward shop items
const mockRewardItems = [
  {
    id: 1,
    name: "Community Giveaway Entry",
    cost: 100,
    image: "/placeholder.svg?height=80&width=80",
    category: "events",
  },
  {
    id: 2,
    name: "10 Rain Coins",
    cost: 180,
    image: "/placeholder.svg?height=80&width=80",
    category: "coins",
  },
  {
    id: 3,
    name: "Discord Nitro (1 Month)",
    cost: 250,
    image: "/placeholder.svg?height=80&width=80",
    category: "subscriptions",
  },
  {
    id: 4,
    name: "AK-47 Skin",
    cost: 400,
    image: "/placeholder.svg?height=80&width=80",
    category: "skins",
  },
  {
    id: 5,
    name: "Knife Skin",
    cost: 800,
    image: "/placeholder.svg?height=80&width=80",
    category: "skins",
  },
  {
    id: 6,
    name: "Gloves",
    cost: 650,
    image: "/placeholder.svg?height=80&width=80",
    category: "skins",
  },
]

// Mock tournaments
const mockTournaments = [
  {
    id: 1,
    title: "Weekend Battle",
    date: "May 15, 2025",
    prizePool: 500,
    entryFee: 10,
    participants: 16,
    status: "upcoming",
  },
]

// Rakeback tiers
const rakebackTiers = [
  { threshold: 1000, percentage: 5 },
  { threshold: 5000, percentage: 7.5 },
  { threshold: 10000, percentage: 10 },
]

// First deposit bonus tiers
const depositBonusTiers = [
  { threshold: 10, bonus: 2 },
  { threshold: 50, bonus: 10 },
  { threshold: 100, bonus: 20 },
  { threshold: 250, bonus: 50 },
  { threshold: 500, bonus: 100 },
]

export default function Dashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  // Calculate next rakeback tier
  const currentTier = rakebackTiers.find(
    (tier, index) =>
      mockUserData.totalWagered >= tier.threshold &&
      (index === rakebackTiers.length - 1 || mockUserData.totalWagered < rakebackTiers[index + 1].threshold),
  )

  const nextTier = rakebackTiers.find((tier) => mockUserData.totalWagered < tier.threshold)

  // Progress to next tier
  const progressToNextTier = nextTier
    ? ((mockUserData.totalWagered - (currentTier?.threshold || 0)) /
        (nextTier.threshold - (currentTier?.threshold || 0))) *
      100
    : 100

  // Handle logout (mock)
  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <CityOverlay />
      {/* Header */}
      <header className="relative border-b border-gray-800 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-auto items-center text-lg font-bold">
              <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                RAIN.GG
              </span>
            </div>
            <span className="text-sm text-gray-400">× Code MEASTER</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 overflow-hidden rounded-full bg-purple-900">
                <div className="h-full w-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
              </div>
              <span className="font-medium">{mockUserData.username}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card className="border-gray-800 bg-gray-900/70 text-white">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-gray-400">Total Wagered</p>
                <p className="text-2xl font-bold">${mockUserData.totalWagered.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-gray-900/70 text-white">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-gray-400">Current Rakeback</p>
                <p className="text-2xl font-bold">{mockUserData.rakebackPercentage}%</p>
              </div>
              <Zap className="h-8 w-8 text-yellow-500" />
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-gray-900/70 text-white">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-gray-400">Rakeback Earned</p>
                <p className="text-2xl font-bold">${mockUserData.rakebackEarned.toLocaleString()}</p>
              </div>
              <Star className="h-8 w-8 text-purple-500" />
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-gray-900/70 text-white">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-gray-400">Measter Coins</p>
                <p className="text-2xl font-bold">{mockUserData.measterCoins}</p>
              </div>
              <Coins className="h-8 w-8 text-amber-500" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-8 grid w-full grid-cols-2 gap-4 bg-transparent md:grid-cols-5">
            <TabsTrigger
              value="overview"
              className="border border-gray-800 bg-gray-900/70 data-[state=active]:bg-purple-900/50 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="rakeback"
              className="border border-gray-800 bg-gray-900/70 data-[state=active]:bg-purple-900/50 data-[state=active]:text-white"
            >
              Rakeback
            </TabsTrigger>
            <TabsTrigger
              value="giveaways"
              className="border border-gray-800 bg-gray-900/70 data-[state=active]:bg-purple-900/50 data-[state=active]:text-white"
            >
              Giveaways
            </TabsTrigger>
            <TabsTrigger
              value="rewards"
              className="border border-gray-800 bg-gray-900/70 data-[state=active]:bg-purple-900/50 data-[state=active]:text-white"
            >
              Rewards
            </TabsTrigger>
            <TabsTrigger
              value="tournaments"
              className="border border-gray-800 bg-gray-900/70 data-[state=active]:bg-purple-900/50 data-[state=active]:text-white opacity-80"
            >
              Tournaments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card className="border-gray-800 bg-gray-900/70 text-white">
                  <CardHeader>
                    <CardTitle>Wager History</CardTitle>
                    <CardDescription>Your wagering activity over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      {/* Placeholder for chart - would be replaced with actual chart */}
                      <div className="flex h-full flex-col items-center justify-center rounded-lg border border-gray-800 bg-gray-800/50">
                        <BarChart3 className="mb-4 h-16 w-16 text-gray-600" />
                        <p className="text-center text-gray-400">
                          Wager history chart will be displayed here when connected to the API
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="mb-8 border-gray-800 bg-gray-900/70 text-white">
                  <CardHeader>
                    <CardTitle>Rakeback Progress</CardTitle>
                    <CardDescription>Progress to your next rakeback tier</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm text-gray-400">Current Tier: {currentTier?.percentage || 0}%</span>
                        {nextTier && <span className="text-sm text-gray-400">Next: {nextTier.percentage}%</span>}
                      </div>
                      <Progress value={progressToNextTier} className="h-2 bg-gray-800">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                          style={{ width: `${progressToNextTier}%` }}
                        />
                      </Progress>
                    </div>
                    {nextTier ? (
                      <p className="text-center text-sm text-gray-400">
                        Wager ${(nextTier.threshold - mockUserData.totalWagered).toLocaleString()} more to reach{" "}
                        {nextTier.percentage}% rakeback
                      </p>
                    ) : (
                      <p className="text-center text-sm text-gray-400">
                        You've reached the highest rakeback tier! Keep wagering to maintain your status.
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-gray-800 bg-gray-900/70 text-white">
                  <CardHeader>
                    <CardTitle>Upcoming Giveaways</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockGiveaways.slice(0, 2).map((giveaway) => (
                        <div key={giveaway.id} className="rounded-lg border border-gray-800 p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <h4 className="font-medium">{giveaway.title}</h4>
                            <span className="rounded-full bg-purple-900/50 px-2 py-1 text-xs">
                              ${giveaway.prizePool}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <span>Ends in: {giveaway.endsIn}</span>
                            <span>{giveaway.participants} participants</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full border-gray-700 text-white hover:bg-gray-800"
                      onClick={() => setActiveTab("giveaways")}
                    >
                      View All Giveaways
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rakeback" className="mt-0">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card className="border-gray-800 bg-gray-900/70 text-white">
                  <CardHeader>
                    <CardTitle>Rakeback Calculator</CardTitle>
                    <CardDescription>See how much rakeback you can earn based on your wager</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-8 overflow-hidden rounded-lg border border-gray-800">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-800 bg-gray-900">
                            <th className="p-4 text-left">Wager Tier</th>
                            <th className="p-4 text-left">Rakeback Percentage</th>
                            <th className="p-4 text-left">Potential Earnings</th>
                            <th className="p-4 text-left">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rakebackTiers.map((tier, index) => {
                            const isActive = mockUserData.totalWagered >= tier.threshold
                            const isCurrent =
                              isActive &&
                              (index === rakebackTiers.length - 1 ||
                                mockUserData.totalWagered < rakebackTiers[index + 1].threshold)
                            const potentialEarnings = (tier.percentage / 100) * mockUserData.totalWagered

                            return (
                              <tr key={index} className="border-b border-gray-800">
                                <td className="p-4">
                                  <span className="font-medium">${tier.threshold.toLocaleString()}+</span>
                                </td>
                                <td className="p-4">{tier.percentage}%</td>
                                <td className="p-4">${potentialEarnings.toFixed(2)}</td>
                                <td className="p-4">
                                  {isCurrent ? (
                                    <span className="rounded-full bg-green-900/30 px-2 py-1 text-xs text-green-400">
                                      Current Tier
                                    </span>
                                  ) : isActive ? (
                                    <span className="rounded-full bg-purple-900/30 px-2 py-1 text-xs text-purple-400">
                                      Achieved
                                    </span>
                                  ) : (
                                    <span className="rounded-full bg-gray-800 px-2 py-1 text-xs text-gray-400">
                                      Locked
                                    </span>
                                  )}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                      <h3 className="mb-4 text-lg font-medium">How Rakeback Works</h3>
                      <p className="mb-4 text-gray-400">
                        Rakeback is a percentage of your total wager that is returned to you as a reward for your
                        activity. The more you wager, the higher your rakeback percentage.
                      </p>
                      <p className="text-gray-400">
                        Your rakeback is calculated based on your total lifetime wager on Rain.gg while using the
                        MEASTER referral code. Rakeback is paid out weekly to your Rain.gg account.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="mb-8 border-gray-800 bg-gray-900/70 text-white">
                  <CardHeader>
                    <CardTitle>Your Rakeback Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-lg border border-gray-800 p-4">
                        <span className="text-gray-400">Current Percentage</span>
                        <span className="text-xl font-bold">{mockUserData.rakebackPercentage}%</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-gray-800 p-4">
                        <span className="text-gray-400">Total Earned</span>
                        <span className="text-xl font-bold">${mockUserData.rakebackEarned.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-gray-800 p-4">
                        <span className="text-gray-400">Next Payout</span>
                        <span className="text-xl font-bold">3d 14h</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-800 bg-gray-900/70 text-white">
                  <CardHeader>
                    <CardTitle>First Deposit Bonuses</CardTitle>
                    <CardDescription>Special bonuses for your first deposit</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-hidden rounded-lg border border-gray-800">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-800 bg-gray-900">
                            <th className="p-3 text-left text-sm">Deposit</th>
                            <th className="p-3 text-left text-sm">Bonus</th>
                          </tr>
                        </thead>
                        <tbody>
                          {depositBonusTiers.map((tier, index) => (
                            <tr key={index} className="border-b border-gray-800">
                              <td className="p-3 text-sm">${tier.threshold}</td>
                              <td className="p-3 text-sm">+${tier.bonus}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="giveaways" className="mt-0">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card className="border-gray-800 bg-gray-900/70 text-white">
                  <CardHeader>
                    <CardTitle>Active Giveaways</CardTitle>
                    <CardDescription>Enter giveaways to win prizes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-6">
                      {mockGiveaways.map((giveaway) => (
                        <div
                          key={giveaway.id}
                          className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 transition-all hover:border-purple-800"
                        >
                          <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-xl font-medium">{giveaway.title}</h3>
                            <span className="rounded-full bg-purple-900/50 px-3 py-1 text-sm">
                              ${giveaway.prizePool}
                            </span>
                          </div>
                          <div className="mb-6 grid grid-cols-3 gap-4">
                            <div className="rounded-lg border border-gray-800 p-3 text-center">
                              <p className="text-xs text-gray-400">Ends In</p>
                              <p className="font-medium">{giveaway.endsIn}</p>
                            </div>
                            <div className="rounded-lg border border-gray-800 p-3 text-center">
                              <p className="text-xs text-gray-400">Participants</p>
                              <p className="font-medium">{giveaway.participants}</p>
                            </div>
                            <div className="rounded-lg border border-gray-800 p-3 text-center">
                              <p className="text-xs text-gray-400">Type</p>
                              <p className="font-medium capitalize">{giveaway.type}</p>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                              Enter Giveaway
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="mb-8 border-gray-800 bg-gray-900/70 text-white">
                  <CardHeader>
                    <CardTitle>Giveaway Rules</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-gray-400">
                      <div>
                        <h4 className="mb-2 font-medium text-white">Eligibility</h4>
                        <ul className="list-inside list-disc space-y-1 text-sm">
                          <li>Must be using the MEASTER referral code</li>
                          <li>Must be a member of the Discord server</li>
                          <li>Must have wagered at least $100 in the last 7 days for weekly giveaways</li>
                          <li>Must have wagered at least $500 in the last 30 days for monthly giveaways</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-2 font-medium text-white">How to Enter</h4>
                        <p className="text-sm">
                          Click the "Enter Giveaway" button to be redirected to our Discord server where you can enter
                          the giveaway by reacting to the giveaway message.
                        </p>
                      </div>
                      <div>
                        <h4 className="mb-2 font-medium text-white">Winner Selection</h4>
                        <p className="text-sm">
                          Winners are selected randomly from all eligible entries. Winners will be announced on Discord
                          and contacted directly to receive their prizes.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-800 bg-gray-900/70 text-white">
                  <CardHeader>
                    <CardTitle>Past Winners</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="rounded-lg border border-gray-800 p-3">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="font-medium">Weekly $500 Giveaway</span>
                          <span className="text-xs text-gray-400">Apr 30, 2025</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-green-500 to-blue-500"></div>
                          <span className="text-sm">Player456</span>
                        </div>
                      </div>
                      <div className="rounded-lg border border-gray-800 p-3">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="font-medium">Monthly Skin Giveaway</span>
                          <span className="text-xs text-gray-400">Mar 31, 2025</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                          <span className="text-sm">GamerPro99</span>
                        </div>
                      </div>
                      <div className="rounded-lg border border-gray-800 p-3">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="font-medium">Special Tournament Prize</span>
                          <span className="text-xs text-gray-400">Mar 15, 2025</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-amber-500 to-red-500"></div>
                          <span className="text-sm">WinnerTaker</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="mt-0">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card className="border-gray-800 bg-gray-900/70 text-white">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Measter Coin Rewards</CardTitle>
                      <CardDescription>Redeem your Measter Coins for rewards</CardDescription>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-amber-900/30 px-3 py-1">
                      <Coins className="h-4 w-4 text-amber-500" />
                      <span className="font-medium text-amber-500">{mockUserData.measterCoins} Coins</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {mockRewardItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col rounded-lg border border-gray-800 bg-gray-900/50 transition-all hover:border-amber-800"
                        >
                          <div className="flex items-center justify-center border-b border-gray-800 p-4">
                            <div className="h-20 w-20 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900"></div>
                          </div>
                          <div className="p-4">
                            <h4 className="mb-2 font-medium">{item.name}</h4>
                            <div className="mb-4 flex items-center gap-1 text-amber-500">
                              <Coins className="h-4 w-4" />
                              <span>{item.cost} Coins</span>
                            </div>
                            <Button
                              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
                              disabled={mockUserData.measterCoins < item.cost}
                            >
                              Redeem
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="mb-8 border-gray-800 bg-gray-900/70 text-white">
                  <CardHeader>
                    <CardTitle>How to Earn Coins</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border border-gray-800 p-4">
                        <div className="mb-2 flex items-center gap-3">
                          <div className="rounded-full bg-amber-900/30 p-2">
                            <DollarSign className="h-5 w-5 text-amber-500" />
                          </div>
                          <h4 className="font-medium">Wager on Rain.gg</h4>
                        </div>
                        <p className="text-sm text-gray-400">
                          Earn 1 Measter Coin for every $10 wagered while using the MEASTER referral code.
                        </p>
                      </div>
                      <div className="rounded-lg border border-gray-800 p-4">
                        <div className="mb-2 flex items-center gap-3">
                          <div className="rounded-full bg-amber-900/30 p-2">
                            <Calendar className="h-5 w-5 text-amber-500" />
                          </div>
                          <h4 className="font-medium">Daily Login</h4>
                        </div>
                        <p className="text-sm text-gray-400">
                          Earn 5 Measter Coins for logging in daily and checking in on the website.
                        </p>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-800 bg-gray-900/70 text-white">
                  <CardHeader>
                    <CardTitle>Redemption History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center text-gray-400">
                      <p>You haven't redeemed any rewards yet.</p>
                      <p className="mt-2 text-sm">
                        Start earning and redeeming Measter Coins to see your history here.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tournaments" className="mt-0">
            <div className="grid grid-cols-1 gap-8">
              <Card className="border-gray-800 bg-gray-900/70 text-white">
                <CardHeader>
                  <CardTitle>Occasional Tournaments</CardTitle>
                  <CardDescription>Special battle tournaments for MEASTER code users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-xl font-medium">Weekend Battle</h3>
                      <span className="rounded-full bg-purple-900/50 px-3 py-1 text-sm">$500 Prize Pool</span>
                    </div>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <div className="rounded-lg border border-gray-800 p-3 text-center">
                        <p className="text-xs text-gray-400">Date</p>
                        <p className="font-medium">May 15, 2025</p>
                      </div>
                      <div className="rounded-lg border border-gray-800 p-3 text-center">
                        <p className="text-xs text-gray-400">Entry Fee</p>
                        <p className="font-medium">$10</p>
                      </div>
                      <div className="rounded-lg border border-gray-800 p-3 text-center">
                        <p className="text-xs text-gray-400">Participants</p>
                        <p className="font-medium">16 / 16</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        Register
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                    <h3 className="mb-4 text-lg font-medium">How Tournaments Work</h3>
                    <p className="mb-4 text-gray-400">
                      Tournaments are occasional bracket-style competitions where users who have wagered a certain
                      amount can participate.
                    </p>
                    <p className="mb-4 text-gray-400">
                      Participants spend coins on battles, and the player with the most winning battle calls wins the
                      tournament.
                    </p>
                    <p className="text-gray-400">
                      Tournaments are held occasionally, so check back for upcoming events.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
