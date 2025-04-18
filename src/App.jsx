import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const votesFromStorage = JSON.parse(localStorage.getItem("votes") || "{\"boy\":0,\"girl\":0}");
const namesFromStorage = JSON.parse(localStorage.getItem("guestNames") || "[]");

export default function GenderVoteApp() {
  const [votes, setVotes] = useState(votesFromStorage);
  const [guestName, setGuestName] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [guestNames, setGuestNames] = useState(namesFromStorage);
  const [password, setPassword] = useState(""); // State to manage password input
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false); // State to check password validity

  useEffect(() => {
    localStorage.setItem("votes", JSON.stringify(votes));
    localStorage.setItem("guestNames", JSON.stringify(guestNames));
  }, [votes, guestNames]);

  const handleVote = (gender) => {
    const trimmedName = guestName.trim();
    if (!trimmedName) {
      alert("Please enter your name before voting.");
      return;
    }
    if (guestNames.includes(trimmedName.toLowerCase())) {
      alert("You have already voted!");
      return;
    }

    setVotes((prev) => ({
      ...prev,
      [gender]: prev[gender] + 1,
    }));
    setGuestNames((prev) => [...prev, trimmedName.toLowerCase()]);
    setHasVoted(true);
  };

  // Reset function to clear the votes and guest list
  const handleReset = () => {
    if (password !== "Kishore@123") {
      alert("Incorrect password! Reset failed.");
      return;
    }
    
    setVotes({ boy: 0, girl: 0 });
    setGuestNames([]);
    setHasVoted(false);
    setGuestName("");
    localStorage.removeItem("votes");
    localStorage.removeItem("guestNames");
    setIsPasswordCorrect(false); // Reset password state after successful reset
    setPassword(""); // Clear the password input
  };

  const data = [
    { name: "Boy", votes: votes.boy },
    { name: "Girl", votes: votes.girl },
  ];

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Vote for the Baby's Gender!</h1>

      {!hasVoted && (
        <div className="flex flex-col items-center gap-4 mb-8 w-full max-w-sm">
          <input
            type="text"
            placeholder="Enter your name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl shadow"
          />
          <div className="flex gap-4">
            <Button className="bg-blue-400 hover:bg-blue-500 text-white text-xl px-6 py-3 rounded-2xl shadow-lg" onClick={() => handleVote("boy")}>
              👦 Boy
            </Button>
            <Button className="bg-pink-400 hover:bg-pink-500 text-white text-xl px-6 py-3 rounded-2xl shadow-lg" onClick={() => handleVote("girl")}>
              👧 Girl
            </Button>
          </div>
        </div>
      )}

      {hasVoted && (
        <div className="text-lg mb-6">Thanks for voting, {guestName}!</div>
      )}

      <Card className="w-full max-w-md mb-6">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">Live Results</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data} layout="vertical">
              <XAxis type="number" allowDecimals={false} />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Bar dataKey="votes" fill="#8884d8" radius={[0, 10, 10, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {guestNames.length > 0 && (
        <Card className="w-full max-w-md">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-2">Guests Who Voted:</h2>
            <ul className="list-disc list-inside text-sm">
              {guestNames.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Reset Button */}
      <div className="mt-6">
        {!isPasswordCorrect && (
          <input
            type="password"
            placeholder="Enter password to reset"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full max-w-xs px-4 py-2 mb-4 border rounded-xl shadow"
          />
        )}
        <Button
          className="bg-red-500 hover:bg-red-600 text-white text-xl px-6 py-3 rounded-2xl shadow-lg"
          onClick={handleReset}
        >
          Reset Votes
        </Button>
      </div>
    </div>
  );
}
