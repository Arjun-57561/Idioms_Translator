import { Navigation } from "@/components/Navigation";
import { FloatingAlphabets } from "@/components/FloatingAlphabets";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { languages } from "@/data/languages";
import { idiomDatabase } from "@/data/idioms";
import { calculateIdiomsStats } from "@/lib/vectorUtils";

const Analysis = () => {
  const stats = calculateIdiomsStats(idiomDatabase);

  const languageData = languages.map(lang => ({
    name: lang.name,
    count: idiomDatabase[lang.code]?.length || 0,
    color: lang.color,
  }));

  const categoryData = Object.entries(stats.categoriesCount).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    color: languages[Math.floor(Math.random() * languages.length)]?.color || "hsl(217 91% 60%)",
  }));

  const accuracyData = [
    { pair: "EN→DE", accuracy: 92 },
    { pair: "EN→IT", accuracy: 89 },
    { pair: "EN→PT", accuracy: 91 },
    { pair: "EN→RU", accuracy: 87 },
    { pair: "EN→TR", accuracy: 88 },
    { pair: "DE→IT", accuracy: 86 },
    { pair: "IT→PT", accuracy: 94 },
    { pair: "RU→TR", accuracy: 85 },
  ];

  const performanceData = [
    { model: "Gemini 1.5 Flash", latency: 1.2, accuracy: 91 },
    { model: "Embeddings", latency: 0.8, accuracy: 89 },
    { model: "Cosine Similarity", latency: 0.1, accuracy: 94 },
  ];

  const avgLanguageIdioms = Math.round(stats.totalIdioms / languages.length);
  const avgAccuracy = Math.round(
    accuracyData.reduce((sum, item) => sum + item.accuracy, 0) / accuracyData.length
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      <FloatingAlphabets />
      <Navigation />

      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Translation Analytics</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Performance metrics and insights across {languages.length} languages
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 glass-card">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="glass-card border-2">
                  <CardHeader>
                    <CardTitle>Dataset Distribution by Language</CardTitle>
                    <CardDescription>Number of idioms available per language</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={languageData}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            background: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                          {languageData.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="glass-card border-2">
                  <CardHeader>
                    <CardTitle>Key Metrics</CardTitle>
                    <CardDescription>Overall system performance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Total Idioms</span>
                        <span className="text-2xl font-bold text-primary">{stats.totalIdioms}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-secondary w-full" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Avg Per Language</span>
                        <span className="text-2xl font-bold text-secondary">{avgLanguageIdioms}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-secondary to-accent"
                          style={{ width: `${(avgLanguageIdioms / 100) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Avg Accuracy</span>
                        <span className="text-2xl font-bold text-accent">{avgAccuracy}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent to-primary"
                          style={{ width: `${avgAccuracy}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Categories</span>
                        <span className="text-2xl font-bold gradient-text">
                          {Object.keys(stats.categoriesCount).length}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary via-secondary to-accent w-full" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <Card className="glass-card border-2">
                <CardHeader>
                  <CardTitle>Model Performance Comparison</CardTitle>
                  <CardDescription>Latency and accuracy metrics for AI models</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="model" />
                      <YAxis yAxisId="left" label={{ value: 'Latency (s)', angle: -90, position: 'insideLeft' }} />
                      <YAxis yAxisId="right" orientation="right" label={{ value: 'Accuracy (%)', angle: 90, position: 'insideRight' }} />
                      <Tooltip
                        contentStyle={{
                          background: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="latency" stroke="hsl(217 91% 60%)" strokeWidth={2} name="Latency (s)" />
                      <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="hsl(270 60% 65%)" strokeWidth={2} name="Accuracy (%)" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories" className="space-y-6">
              <Card className="glass-card border-2">
                <CardHeader>
                  <CardTitle>Idiom Categories Distribution</CardTitle>
                  <CardDescription>Breakdown of idioms by semantic category</CardDescription>
                </CardHeader>
                <CardContent>
                  {categoryData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={400}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}`}
                          outerRadius={150}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            background: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-96 text-muted-foreground">
                      No category data available
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="accuracy" className="space-y-6">
              <Card className="glass-card border-2">
                <CardHeader>
                  <CardTitle>Language Pair Accuracy</CardTitle>
                  <CardDescription>Translation accuracy scores across different language combinations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={accuracyData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="pair" type="category" />
                      <Tooltip
                        contentStyle={{
                          background: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="accuracy" fill="hsl(142 76% 36%)" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
