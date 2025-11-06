import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle, Volume2 } from "lucide-react";
import { TranslationResult } from "@/lib/types";
import { getLanguageByCode } from "@/data/languages";
import { useState } from "react";
import { toast } from "sonner";

interface ResultCardProps {
  result: TranslationResult;
  audioUrl?: string;
}

export function ResultCard({ result, audioUrl }: ResultCardProps) {
  const [copied, setCopied] = useState(false);
  const [playing, setPlaying] = useState(false);
  const targetLang = getLanguageByCode(result.target.language);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.target.idiom);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      setPlaying(true);
      audio.play().catch(err => {
        console.error("Audio playback error:", err);
        toast.error("Could not play audio");
      });
      audio.onended = () => setPlaying(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(result.target.idiom);
      utterance.lang = result.target.language;
      speechSynthesis.speak(utterance);
      setPlaying(true);
      setTimeout(() => setPlaying(false), 2000);
    }
  };

  return (
    <Card className="glass-card border-2 animate-in slide-in-from-bottom duration-500">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="gradient-text">🎯 AI Translation Result</span>
          <span className="text-2xl">{targetLang?.flag}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground font-medium">Target Idiom</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleSpeak}
                className="h-8 w-8"
                disabled={playing}
              >
                <Volume2 className={`h-4 w-4 ${playing ? 'animate-pulse' : ''}`} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
                className="h-8 w-8"
              >
                {copied ? (
                  <CheckCircle className="h-4 w-4 text-primary" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <p className="text-3xl font-bold text-primary">{result.target.idiom}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 p-4 rounded-lg bg-muted/50">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Literal Meaning
            </p>
            <p className="text-sm">{result.target.literalMeaning}</p>
          </div>
          <div className="space-y-2 p-4 rounded-lg bg-muted/50">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Semantic Meaning
            </p>
            <p className="text-sm">{result.target.semanticMeaning}</p>
          </div>
        </div>

        {result.source.meaning && (
          <div className="space-y-2 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Input Analysis (Gemini AI)
            </p>
            <div className="text-sm space-y-1">
              <p><strong>Semantic:</strong> {result.source.meaning.semantic}</p>
              <p><strong>Emotion:</strong> {result.source.meaning.emotion}</p>
            </div>
          </div>
        )}

        <div className="space-y-2 p-4 rounded-lg bg-secondary/5 border border-secondary/20">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
            Cultural Context
          </p>
          <p className="text-sm text-foreground/90">{result.target.context}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">AI Confidence Score</span>
            <span className="text-lg font-bold text-primary">{result.confidence}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out"
              style={{ width: `${result.confidence}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Category:</span>
          <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-medium capitalize">
            {result.target.category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Match Type:</span>
          <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium">
            🤖 Semantic AI
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
