"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FaSeedling, FaFaucet, FaAppleAlt, FaSolarPanel, FaTractor, FaRecycle, FaUtensils } from "react-icons/fa"

const questions = {
  blue: {
    type: "ABC",
    question: "What is a sustainable technique for growing vegetables?",
    options: [
      { text: "Using chemical pesticides in large amounts", icon: <FaSeedling /> },
      { text: "Crop rotation to maintain fertile soil", icon: <FaSeedling /> },
      { text: "Planting the same type of crop in the same place every time", icon: <FaSeedling /> },
    ],
    correct: 1,
  },
  green: {
    type: "Mimic",
    options: [
      { text: "Close the water tap that someone has forgotten to close", icon: <FaFaucet /> },
      { text: "Be a farmer who is watering his vegetables", icon: <FaTractor /> },
    ],
  },
  yellow: {
    type: "Drawing",
    options: [
      { text: "Draw a solar panel", icon: <FaSolarPanel /> },
      { text: "A boy throwing a food packing paper into the paper bin", icon: <FaRecycle /> },
    ],
  },
  red: {
    type: "Guessing",
    options: [
      { text: "Recycling", icon: <FaRecycle /> },
      { text: "Food Waste Reduction", icon: <FaUtensils /> },
    ],
  },
}

export default function GameUI() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [timer, setTimer] = useState(5)
  const [showResult, setShowResult] = useState<string | null>(null)

  useEffect(() => {
    if (selectedColor) {
      setTimer(5)
      setShowResult(null)
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(countdown)
            setSelectedColor(null) // Return to main screen
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(countdown)
    }
  }, [selectedColor])

  const handleSelectColor = (color: string) => {
    setSelectedColor(color)
  }

  const handleAnswer = (index: number) => {
    if (
      selectedColor &&
      "correct" in questions[selectedColor as keyof typeof questions] &&
      index === questions[selectedColor as keyof typeof questions].correct
    ) {
      setShowResult("correct")
    } else {
      setShowResult("wrong")
    }
  }

  const getButtonColorClass = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-500 hover:bg-blue-600"
      case "green":
        return "bg-green-500 hover:bg-green-600"
      case "yellow":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "red":
        return "bg-red-500 hover:bg-red-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const getTextColorClass = (color: string) => {
    switch (color) {
      case "blue":
        return "text-blue-700"
      case "green":
        return "text-green-700"
      case "yellow":
        return "text-yellow-700"
      case "red":
        return "text-red-700"
      default:
        return "text-gray-700"
    }
  }

  const getOptionButtonClass = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-400 hover:bg-blue-500"
      case "green":
        return "bg-green-400 hover:bg-green-500"
      case "yellow":
        return "bg-yellow-400 hover:bg-yellow-500"
      case "red":
        return "bg-red-400 hover:bg-red-500"
      default:
        return "bg-gray-400 hover:bg-gray-500"
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-200 via-yellow-100 to-red-200 p-4">
      <h1 className="text-4xl font-extrabold text-green-700 mb-6 flex items-center gap-2">
        <FaAppleAlt className="text-red-500" /> Catch the Apple!!!
      </h1>
      {!selectedColor ? (
        <div className="grid grid-cols-2 gap-4 mb-6">
          {Object.keys(questions).map((color) => (
            <motion.button
              key={color}
              className={`w-24 h-24 rounded-full ${getButtonColorClass(color)} flex items-center justify-center text-white font-bold shadow-lg transform hover:scale-110 transition duration-300`}
              whileHover={{ scale: 1.2 }}
              onClick={() => handleSelectColor(color)}
            >
              {color.toUpperCase()}
            </motion.button>
          ))}
        </div>
      ) : (
        <motion.div
          className="bg-white p-6 rounded-lg shadow-xl border-4 border-gray-300"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2 className={`text-2xl font-bold text-center mb-4 ${getTextColorClass(selectedColor)}`}>
            {questions[selectedColor as keyof typeof questions].type} Challenge
          </h2>
          {questions[selectedColor as keyof typeof questions].type === "ABC" ? (
            <div>
              <p className="mb-4 text-lg font-medium text-gray-800">
                {questions[selectedColor as keyof typeof questions].question}
              </p>
              {questions[selectedColor as keyof typeof questions].options.map((opt, index) => (
                <Button
                  key={index}
                  className={`flex items-center gap-2 w-full mb-2 p-3 text-lg ${getOptionButtonClass(selectedColor)} text-black rounded-lg shadow-md`}
                  onClick={() => handleAnswer(index)}
                >
                  {opt.icon} {opt.text}
                </Button>
              ))}
              {showResult && (
                <p className={`mt-4 font-bold text-xl ${showResult === "correct" ? "text-green-500" : "text-red-500"}`}>
                  {showResult === "correct" ? "Correct! 🎉" : "Wrong! ❌"}
                </p>
              )}
            </div>
          ) : (
            <div>
              {questions[selectedColor as keyof typeof questions].options.map((option, index) => (
                <p key={index} className="text-lg mb-2 flex items-center gap-2 font-semibold text-gray-700">
                  {option.icon} {option.text}
                </p>
              ))}
            </div>
          )}
          <p className="mt-4 text-gray-500 font-medium text-lg">Time left: {timer}s</p>
        </motion.div>
      )}
    </div>
  )
}

