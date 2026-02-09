"use client";
import { useState } from "react";

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isNoButtonRunning, setIsNoButtonRunning] = useState(false);
  const [runAwayCount, setRunAwayCount] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const yesButtonSize = noCount * 20 + 16;

  const moveButtonRandomly = () => {
    // Get viewport dimensions with very safe padding
    const buttonWidth = 400; // Very generous estimate for long text
    const buttonHeight = 100; // Very generous estimate for button height
    const padding = 50; // Extra safety padding from edges

    // Calculate safe zone with conservative bounds
    const minX = padding;
    const minY = padding;
    const maxX = Math.max(minX + 100, window.innerWidth - buttonWidth - padding);
    const maxY = Math.max(minY + 100, window.innerHeight - buttonHeight - padding * 3);

    // Generate random position within safe bounds
    const rangeX = maxX - minX;
    const rangeY = maxY - minY;

    const newX = minX + Math.random() * rangeX;
    const newY = minY + Math.random() * rangeY;

    // Final clamp with very conservative limits to absolutely ensure visibility
    const clampedX = Math.min(Math.max(padding, newX), window.innerWidth - buttonWidth);
    const clampedY = Math.min(Math.max(padding, newY), window.innerHeight - buttonHeight - padding * 2);

    setNoButtonPos({ x: clampedX, y: clampedY });
    setIsNoButtonRunning(true);
  };

  const handleNoInteraction = () => {
    // 30% chance to run away, 70% chance to show text
    const shouldRunAway = Math.random() < 0.3;

    if (shouldRunAway && runAwayCount < 15) {
      // Run away to random position - change text but don't make Yes bigger
      moveButtonRandomly();
      setRunAwayCount(runAwayCount + 1);
      setTextIndex(textIndex + 1);
    } else {
      // Show the pleading text and reset position - make Yes bigger
      setNoCount(noCount + 1);
      setTextIndex(textIndex + 1);
      setIsNoButtonRunning(false);
    }
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure chellam?",
      "What if I asked really nicely?",
      "Pretty please!!!!",
      "With a chocolate cake on top",
      "What about a KITKAT!!!",
      "PLEASE POOKIE",
      "But :*(",
      "I am going to die",
      "Yep im dead",
      "ok ur talking to naveen's ghost",
      "please babe",
      ":((((",
      "PRETTY PLEASE",
      "PLEASEEEEEE CHELLAMMMMMMMMMM",
      "No :(",
    ];

    return phrases[Math.min(textIndex, phrases.length - 1)];
  };

  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-100 via-red-50 to-purple-100">
      {/* Animated hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-pink-300 opacity-20 text-6xl animate-pulse">💕</div>
        <div className="absolute top-20 right-20 text-red-300 opacity-20 text-5xl animate-bounce">❤️</div>
        <div className="absolute bottom-20 left-20 text-pink-400 opacity-15 text-7xl animate-pulse">💖</div>
        <div className="absolute bottom-10 right-10 text-purple-300 opacity-20 text-6xl animate-bounce">💗</div>
        <div className="absolute top-1/2 left-1/4 text-red-200 opacity-10 text-8xl animate-pulse">💝</div>
        <div className="absolute top-1/3 right-1/3 text-pink-200 opacity-15 text-7xl">💘</div>
        <div className="absolute bottom-1/3 left-1/2 text-purple-200 opacity-10 text-6xl animate-bounce">💞</div>
      </div>

      {/* Content with backdrop for better readability */}
      <div className="relative z-10 flex flex-col items-center bg-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-pink-200">
        {yesPressed ? (
          <>
            <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" />
            <div className="my-4 text-4xl font-bold text-pink-600">WOOOOOO!!! I love you chellam!! ;))</div>
          </>
        ) : (
          <>
            <img
              className="h-[200px]"
              src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
            />
            <h1 className="my-4 text-4xl font-bold text-gray-800">Will you be my Valentine chellam?</h1>
            <div className="flex items-center relative">
              <button
                className={`mr-4 rounded-lg bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600 shadow-lg hover:shadow-xl transition-all`}
                style={{ fontSize: yesButtonSize }}
                onClick={() => setYesPressed(true)}
              >
                Yes
              </button>
              <button
                onMouseEnter={handleNoInteraction}
                onClick={handleNoInteraction}
                className="rounded-lg bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                style={
                  isNoButtonRunning
                    ? {
                        position: "fixed",
                        left: `${noButtonPos.x}px`,
                        top: `${noButtonPos.y}px`,
                        transition: "all 0.3s ease-out",
                      }
                    : {}
                }
              >
                {getNoButtonText()}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
