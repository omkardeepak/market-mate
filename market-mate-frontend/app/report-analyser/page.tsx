"use client"

import type React from "react"
import Navbar from "@/components/Navbar/page"
import Footer from "@/components/Footer/page"
import { useState } from "react"
import { FileText, Loader2, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



export default function PdfAnalyzer() {
  const [file, setFile] = useState<File | null>(null)
  const [prompt, setPrompt] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isAnalyzingprompt, setIsAnalyzingprompt] = useState(false)
  const [answer, setAnswer] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
    }
  }

  const removeFile = () => {
    setFile(null)
  }



  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!file) return;

  setIsAnalyzing(true);

  const formData = new FormData();
  formData.append("file", file);         // PDF file


  try {
    const response = await fetch("http://localhost:8000/analyse", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log(result);
    // Use result.answer or result.content as needed
  } catch (error) {
    console.error("Error analyzing PDF:", error);
  } finally {
    setIsAnalyzing(false);
  }
};

  const handlePrompt = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!prompt) return;

  setIsAnalyzingprompt(true);

  const formData = new FormData();
  formData.append("prompt", prompt);         // prompt


  try {
    const response = await fetch("http://localhost:8000/prompt", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    const answer=result.answer;
    setAnswer(answer)
    console.log(answer);
    // Use result.answer or result.content as needed
  } catch (error) {
    console.error("Error analyzing PDF:", error);
  } finally {
    setIsAnalyzingprompt(false);
  }
};

  return (
    <div>
    <div className="flex min-h-screen flex-col text-white bg-gradient-to-bl from-neutral-950 to bg-green-800">
    <Navbar></Navbar>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Company Report Analyzer</h1>    <Card className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* PDF Upload Section */}
        <div className="space-y-2">
          <Label htmlFor="file-upload" className="text-base font-medium">
            Upload PDF Report
          </Label>
          <div className="flex items-center gap-4">
            {!file ? (
              <div className="relative flex-1">
                <Input
                  id="file-upload"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
                <div className="flex h-32 w-full items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8" />
                    <span className="text-sm font-medium">Click to upload or drag and drop</span>
                    <span className="text-xs">PDF files only (max 10MB)</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-between rounded-md border bg-gray-50 px-4 py-3">
                <div className="flex items-center">
                  <FileText className="mr-2 h-6 w-6 text-yellow-700" />
                  <div>
                    <span className="text-sm font-medium block">{file.name}</span>
                    <span className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB • PDF Document
                    </span>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={removeFile}
                  className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Remove file</span>
                </Button>
              </div>
            )}
          </div>
        </div>
        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          disabled={!file || isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing PDF...
            </>
          ) : (
            "Analyze PDF"
          )}
        </Button>
      </form>

      <form onSubmit={handlePrompt} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="prompt" className="text-base font-medium">
            What would you like to know about this report?
          </Label>
          <Input
            id="prompt"
            placeholder="E.g., Summarize the key financial metrics, or analyze the growth trends"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-3"
          />
        </div>
        <Button
          type="submit"
          className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium"
          disabled={!prompt || isAnalyzingprompt}
        >
          {isAnalyzingprompt ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing prompt...
            </>
          ) : (
            "Analyze prompt"
          )}
        </Button>
      </form>

      {answer && (
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Analysis Results</h2>
          <div className="bg-gray-50 p-4 rounded-md border">
            <p className="text-gray-800 text-sm  whitespace-pre-line">{answer}</p>
          </div>
        </div>
      )}
    </Card>
 </div>
    </div>
     <Footer></Footer>
     </div>
  )
}
