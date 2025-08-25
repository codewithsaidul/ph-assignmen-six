"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input"; // আপনার shadcn/ui ইনপুট

// Props-এর জন্য টাইপ
interface GeocodingInputProps {
  onLocationSelect: (location: {
    address: string;
    latitude: number;
    longitude: number;
  }) => void;
  placeholder: string;
}

// Nominatim API থেকে আসা রেজাল্টের জন্য টাইপ
interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

export default function GeocodingInput({ onLocationSelect, placeholder }: GeocodingInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce-এর জন্য useEffect
  useEffect(() => {
    // ইনপুটে কমপক্ষে ৩টি অক্ষর থাকলেই সার্চ শুরু হবে
    if (inputValue.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    const timerId = setTimeout(() => {
      // Nominatim API কল করুন
      fetch(
        `https://nominatim.openstreetmap.org/search?q=${inputValue}&format=jsonv2&countrycodes=BD&limit=5`
      )
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data);
        })
        .catch((error) => console.error("Error fetching geocoding data:", error))
        .finally(() => setIsLoading(false));
    }, 500); // 500ms ডিলে

    return () => {
      clearTimeout(timerId);
    };
  }, [inputValue]);

  const handleSuggestionClick = (suggestion: NominatimResult) => {
    // সিলেক্ট করা ঠিকানার নাম ইনপুট ফিল্ডে সেট করুন
    setInputValue(suggestion.display_name);
    // সাজেশন তালিকা খালি করুন
    setSuggestions([]);
    
    // প্যারেন্ট কম্পোনেন্টে পূর্ণাঙ্গ লোকেশন ডেটা পাঠিয়ে দিন
    onLocationSelect({
      address: suggestion.display_name,
      latitude: parseFloat(suggestion.lat),
      longitude: parseFloat(suggestion.lon),
    });
  };

  return (
    <div className="relative w-full">
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        autoComplete="off"
      />
      {isLoading && <div className="p-2 text-sm text-gray-500">Searching...</div>}

      {/* সাজেশন তালিকা */}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-card rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={item.place_id}
              onClick={() => handleSuggestionClick(item)}
              className="px-4 py-2 cursor-pointer"
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}