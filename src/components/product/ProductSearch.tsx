
"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mic } from "lucide-react";
// import { swahiliVoiceSearch } from "@/ai/flows/swahili-voice-search"; // Uncomment when implementing

export function ProductSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceSearchText, setVoiceSearchText] = useState(""); // For displaying transcribed text

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic with searchTerm
    console.log("Searching for:", searchTerm);
  };

  const handleVoiceSearch = async () => {
    setIsListening(true);
    setVoiceSearchText("Listening...");
    // Placeholder for actual voice recording and API call
    // Example: const audioBlob = await recordAudio(); 
    // For now, simulate AI call
    try {
      // const result = await swahiliVoiceSearch({ voiceInput: "Tafuta nyanya" }); // Example input
      // setSearchTerm(result.searchText);
      // setVoiceSearchText(`Search: ${result.searchText}`);
      // Simulating a result for UI testing
      setTimeout(() => {
        const mockSwahiliInput = "Tafuta nyanya na vitunguu";
        const mockEnglishOutput = "Search for tomatoes and onions";
        setSearchTerm(mockEnglishOutput);
        setVoiceSearchText(`Search (Swahili): ${mockSwahiliInput} -> (English): ${mockEnglishOutput}`);
      }, 2000);
    } catch (error) {
      console.error("Voice search error:", error);
      setVoiceSearchText("Sorry, could not understand voice input.");
    } finally {
      setIsListening(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 p-2 border rounded-lg shadow-sm bg-card">
        <Input
          type="search"
          placeholder="Search for fresh produce (e.g., 'tomatoes', 'sukuma wiki')"
          className="flex-grow text-base border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search produce"
        />
        <Button type="button" variant="ghost" size="icon" onClick={handleVoiceSearch} disabled={isListening} aria-label="Search by voice">
          <Mic className={`h-5 w-5 ${isListening ? 'text-destructive animate-pulse' : 'text-muted-foreground'}`} />
        </Button>
        <Button type="submit" variant="default" aria-label="Submit search">
          <Search className="h-5 w-5" />
        </Button>
      </form>
      {voiceSearchText && (
        <p className="text-sm text-muted-foreground mt-2 text-center">{voiceSearchText}</p>
      )}
    </div>
  );
}
