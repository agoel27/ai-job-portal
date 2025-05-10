import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
if (!API_KEY) {
  console.error("VITE_GEMINI_API_KEY is not set in your .env file.");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function AIParsing({ file, onComplete }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (file && API_KEY) {
      parseAndSummarizePdf(file);
    } else if (!API_KEY) {
      setError("API Key not configured.");
      alert("Error: Gemini API Key not configured. Check console.");
    }
  }, [file]);

  const extractTextFromPdf = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        fullText += pageText + "\n\n";
      }
      return fullText;
    } catch (err) {
      console.error("Error extracting text from PDF:", err);
      throw new Error("Failed to read PDF content.");
    }
  };

  const summarizeTextWithGemini = async (text) => {
    try {
      const prompt = `Please provide a concise summary of the following resume text:\n${text}\n`;
      const result = await model.generateContent(prompt);
      const response = result.response;
      const summary = response.text();
      return summary;
    } catch (err) {
      console.error("Error calling Gemini API:", err);
      throw new Error("Failed to get summary from AI.");
    }
  };

  const parseAndSummarizePdf = async (pdfFile) => {
    setLoading(true);
    setError(null);
    try {
      console.log("BEGIN PDF EXTRACT WEEEEE");
      const extractedText = await extractTextFromPdf(pdfFile);

      if (!extractedText.trim()) {
        throw new Error("Could not extract any text from the PDF.");
      }

      const summary = await summarizeTextWithGemini(extractedText);
      console.log("TAKE MY SUMMARY:", summary);

      alert(`Summary:\n${summary}`);
      if (onComplete) {
        onComplete(summary);
      }
    } catch (err) {
      console.error("Error during parsing/summarization:", err);
      setError(err.message || "An unknown error occurred.");
      alert(`Error: ${err.message || "An unknown error occurred."}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center">Parsing Time :3</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>;
  }
  return null;
}

export default AIParsing;
