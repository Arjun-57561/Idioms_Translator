import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LanguageSelect } from "@/components/LanguageSelect";
import { ProcessingSteps } from "@/components/ProcessingSteps";
import { ResultCard } from "@/components/ResultCard";
import { FloatingAlphabets } from "@/components/FloatingAlphabets";
import { Navigation } from "@/components/Navigation";
import { ArrowRightLeft, Sparkles, Globe, Zap } from "lucide-react";
import { LanguageCode, ProcessingStep, TranslationResult } from "@/lib/types";
import { getIdiomsByLanguage } from "@/data/idioms";
import {
  extractSemanticMeaning,
  generateEmbedding,
  generateTTS,
  findSemanticMatch,
} from "@/lib/googleAI";
import { toast } from "sonner";

const Index = () => {
  const [sourceLang, setSourceLang] = useState<LanguageCode>("en");
  const [targetLang, setTargetLang] = useState<LanguageCode>("de");
  const [inputIdiom, setInputIdiom] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [steps, setSteps] = useState<ProcessingStep[]>([]);
  const [audioUrl, setAudioUrl] = useState<string>("");

  const swapLanguages = () => {
    if (sourceLang !== targetLang) {
      const temp = sourceLang;
      setSourceLang(targetLang);
      setTargetLang(temp);
    }
  };

  const updateStep = (index: number, status: ProcessingStep['status']) => {
    setSteps(prev => prev.map((step, i) => i === index ? { ...step, status } : step));
  };

  const handleTranslate = async () => {
    if (!inputIdiom.trim()) {
      toast.error("Please enter an idiom");
      return;
    }

    if (sourceLang === targetLang) {
      toast.error("Source and target languages must be different");
      return;
    }

    setLoading(true);
    setResult(null);
    setAudioUrl("");

    const processingSteps: ProcessingStep[] = [
      { step: "🧠 Extracting semantic meaning with AI", status: "processing" },
      { step: "🔢 Generating intelligent embeddings", status: "pending" },
      { step: "🎯 Finding best semantic match", status: "pending" },
      { step: "🔊 Generating pronunciation", status: "pending" },
    ];

    setSteps(processingSteps);

    try {
      updateStep(0, "processing");
      const semanticAnalysis = await extractSemanticMeaning(inputIdiom, sourceLang);
      updateStep(0, "complete");

      updateStep(1, "processing");
      await generateEmbedding(inputIdiom);
      updateStep(1, "complete");

      updateStep(2, "processing");
      const targetIdioms = getIdiomsByLanguage(targetLang);

      if (targetIdioms.length === 0) {
        throw new Error(`No idioms found for language: ${targetLang}`);
      }

      const matchResult = await findSemanticMatch(
        inputIdiom,
        sourceLang,
        targetLang,
        targetIdioms
      );

      if (!matchResult) {
        throw new Error("Could not find semantic match");
      }

      updateStep(2, "complete");

      updateStep(3, "processing");
      const ttsAudio = await generateTTS(matchResult.match.idiom, targetLang);
      if (ttsAudio) {
        setAudioUrl(ttsAudio);
      }
      updateStep(3, "complete");

      const confidence = Math.round(matchResult.score * 100);
      const translationResult: TranslationResult = {
        success: true,
        source: {
          idiom: inputIdiom,
          language: sourceLang,
          meaning: {
            literal: "Input idiom",
            semantic: semanticAnalysis.meaning,
            emotion: semanticAnalysis.emotion,
          },
        },
        target: matchResult.match,
        confidence,
        matchedVia: "semantic",
        steps: processingSteps.map(s => ({ ...s, status: 'complete' as const })),
      };

      setResult(translationResult);
      toast.success("✨ Translation complete!");
    } catch (error) {
      console.error("Translation error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Translation failed. Check your API key"
      );
      setSteps(prev => prev.map(s => ({ ...s, status: 'error' as const })));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <FloatingAlphabets />
      <Navigation />

      <div className="container mx-auto px-4 pt-28 pb-16 relative z-10">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-16 space-y-8">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 backdrop-blur-sm mb-6 hover:border-purple-400 transition-all">
            <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Powered by Google Gemini AI
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Idioms
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Translator
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Break language barriers with <span className="font-semibold text-purple-300">semantic AI translation</span>. 
              Understand idioms across 6 languages with cultural context.
            </p>
          </div>

          {/* Badge Row */}
          <div className="flex flex-wrap justify-center gap-3 pt-6">
            <div className="px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-400/50 text-blue-200 text-sm font-medium backdrop-blur">
              ✨ 120+ Idioms
            </div>
            <div className="px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-400/50 text-purple-200 text-sm font-medium backdrop-blur">
              🌍 6 Languages
            </div>
            <div className="px-4 py-2 rounded-lg bg-pink-500/20 border border-pink-400/50 text-pink-200 text-sm font-medium backdrop-blur">
              🚀 Real-time AI
            </div>
          </div>
        </div>

        {/* Main Translator Card */}
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="relative border-2 border-purple-500/30 bg-gradient-to-br from-slate-800/80 via-purple-800/50 to-slate-800/80 backdrop-blur-xl shadow-2xl hover:border-purple-400/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-lg pointer-events-none" />
            
            <CardHeader className="relative pb-6 border-b border-purple-500/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">AI-Powered Translator</CardTitle>
                  <CardDescription className="text-purple-200">
                    Semantic idiom translation with cultural intelligence
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="relative space-y-8 pt-8">
              {/* Language Selection */}
              <div className="space-y-4">
                <label className="text-sm font-semibold text-purple-200 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Select Languages
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg bg-slate-700/50 border border-purple-500/20">
                  <div className="flex-1 w-full">
                    <LanguageSelect
                      value={sourceLang}
                      onValueChange={setSourceLang}
                      label="Source Language"
                      excludeLanguage={targetLang}
                    />
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={swapLanguages}
                    className="shrink-0 bg-gradient-to-br from-purple-600 to-pink-600 border-0 text-white hover:from-purple-700 hover:to-pink-700 rounded-full w-12 h-12 flex items-center justify-center transition-all transform hover:scale-110"
                    title="Swap languages"
                  >
                    <ArrowRightLeft className="h-5 w-5" />
                  </Button>

                  <div className="flex-1 w-full">
                    <LanguageSelect
                      value={targetLang}
                      onValueChange={setTargetLang}
                      label="Target Language"
                      excludeLanguage={sourceLang}
                    />
                  </div>
                </div>
              </div>

              {/* Input Section */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-purple-200 flex items-center gap-2">
                  Sparkles className="h-4 w-4"
                  Enter an Idiom
                </label>
                <Textarea
                  placeholder="e.g., 'Break a leg', 'Hit the nail on the head', 'Spill the beans'..."
                  value={inputIdiom}
                  onChange={(e) => setInputIdiom(e.target.value)}
                  className="min-h-[120px] bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400 resize-none focus:border-purple-400 focus:ring-purple-500/20 rounded-lg"
                  disabled={loading}
                />
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-400">
                    {inputIdiom.length > 0 ? `${inputIdiom.length} characters` : 'Enter text...'}
                  </p>
                  <div className="text-xs font-medium text-purple-300">
                    {inputIdiom.split(' ').filter(w => w).length} words
                  </div>
                </div>
              </div>

              {/* Translate Button */}
              <Button
                onClick={handleTranslate}
                disabled={loading || !inputIdiom.trim() || sourceLang === targetLang}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white font-bold py-6 text-lg rounded-lg shadow-lg hover:shadow-2xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    <span>Translating with AI...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    <span>Translate with AI Magic</span>
                  </div>
                )}
              </Button>

              {/* Processing Steps */}
              {loading && steps.length > 0 && (
                <div className="mt-8 p-6 rounded-lg bg-slate-700/50 border border-purple-500/20">
                  <p className="text-sm font-semibold text-purple-200 mb-4 flex items-center gap-2">
                    Processing...
                  </p>
                  <ProcessingSteps steps={steps} />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Result Card */}
          {result && !loading && (
            <div className="animate-in slide-in-from-bottom duration-500">
              <ResultCard result={result} audioUrl={audioUrl} />
            </div>
          )}

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-4 mt-12">
            <Card className="border-purple-500/30 bg-gradient-to-br from-slate-800/50 to-purple-800/30 hover:border-purple-400/50 transition-all hover:shadow-lg hover:shadow-purple-500/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="text-2xl">🧠</span>
                  AI-Powered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">
                  Google Gemini extracts semantic meaning, cultural context, and emotional nuance
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-500/30 bg-gradient-to-br from-slate-800/50 to-purple-800/30 hover:border-purple-400/50 transition-all hover:shadow-lg hover:shadow-purple-500/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="text-2xl">🌍</span>
                  Multilingual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">
                  Support for English, German, Italian, Portuguese, Russian, and Turkish
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-500/30 bg-gradient-to-br from-slate-800/50 to-purple-800/30 hover:border-purple-400/50 transition-all hover:shadow-lg hover:shadow-purple-500/20">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="text-2xl">🔊</span>
                  Audio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">
                  Real-time pronunciation with Google Cloud Text-to-Speech
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
