import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Smile, Meh, Frown, CloudRain, Sparkles, TrendingUp } from 'lucide-react';

interface MoodEntry {
  mood: string;
  intensity: number;
  timestamp: Date;
  notes?: string;
}

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [intensity, setIntensity] = useState<number>(5);
  const [notes, setNotes] = useState<string>('');
  const [recentEntries, setRecentEntries] = useState<MoodEntry[]>([
    { mood: 'happy', intensity: 7, timestamp: new Date(Date.now() - 86400000) },
    { mood: 'calm', intensity: 8, timestamp: new Date(Date.now() - 172800000) },
    { mood: 'anxious', intensity: 4, timestamp: new Date(Date.now() - 259200000) }
  ]);

  const moods = [
    { name: 'happy', icon: Smile, color: 'bg-gradient-to-br from-yellow-400 to-orange-500', textColor: 'text-yellow-600' },
    { name: 'calm', icon: Heart, color: 'bg-gradient-to-br from-green-400 to-emerald-500', textColor: 'text-green-600' },
    { name: 'neutral', icon: Meh, color: 'bg-gradient-to-br from-gray-400 to-slate-500', textColor: 'text-gray-600' },
    { name: 'sad', icon: Frown, color: 'bg-gradient-to-br from-blue-400 to-indigo-500', textColor: 'text-blue-600' },
    { name: 'anxious', icon: CloudRain, color: 'bg-gradient-to-br from-purple-400 to-violet-500', textColor: 'text-purple-600' }
  ];

  const handleSubmit = () => {
    if (selectedMood) {
      const newEntry: MoodEntry = {
        mood: selectedMood,
        intensity,
        timestamp: new Date(),
        notes: notes || undefined
      };
      setRecentEntries([newEntry, ...recentEntries.slice(0, 6)]);
      setSelectedMood('');
      setIntensity(5);
      setNotes('');
    }
  };

  const getMoodColor = (moodName: string) => {
    const mood = moods.find(m => m.name === moodName);
    return mood ? mood.textColor : 'text-gray-600';
  };

  const averageIntensity = recentEntries.length > 0 
    ? recentEntries.reduce((sum, entry) => sum + entry.intensity, 0) / recentEntries.length 
    : 0;

  return (
    <Card className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-sm shadow-xl border-0 ring-1 ring-white/20 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-full translate-y-12 -translate-x-12"></div>
      
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center space-x-2 text-gray-900">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
            Daily Mood Check-in
          </span>
        </CardTitle>
        
        {/* Mood insights */}
        <div className="flex items-center space-x-4 mt-2">
          <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1 shadow-md">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">
              Avg: {averageIntensity.toFixed(1)}/10
            </span>
          </div>
          <div className="text-sm text-gray-600 font-medium">
            {recentEntries.length} entries this week
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 relative z-10">
        <div>
          <h3 className="font-semibold mb-4 text-gray-900 text-lg">How are you feeling today?</h3>
          <div className="grid grid-cols-5 gap-3">
            {moods.map((mood) => (
              <button
                key={mood.name}
                onClick={() => setSelectedMood(mood.name)}
                className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                  selectedMood === mood.name
                    ? 'border-white shadow-xl scale-105'
                    : 'border-white/30 hover:border-white/60 shadow-lg'
                }`}
                style={{
                  background: selectedMood === mood.name 
                    ? mood.color 
                    : `linear-gradient(135deg, ${mood.color.replace('bg-gradient-to-br ', '').replace('from-', '').replace(' to-', ', ')})`,
                  opacity: selectedMood === mood.name ? 1 : 0.8
                }}
              >
                <div className="flex flex-col items-center space-y-2">
                  <mood.icon className="w-6 h-6 text-white drop-shadow-md" />
                  <span className="text-xs font-semibold text-white capitalize drop-shadow-md">
                    {mood.name}
                  </span>
                </div>
                
                {selectedMood === mood.name && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-md animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {selectedMood && (
          <div className="space-y-4 bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-900">
                Intensity Level: {intensity}/10
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #8b5cf6 ${intensity * 10}%, #e5e7eb ${intensity * 10}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900">Notes (optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What's contributing to this mood?"
                className="w-full p-3 border border-white/30 rounded-xl resize-none h-20 bg-white/60 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            <Button 
              onClick={handleSubmit} 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Heart className="w-4 h-4 mr-2" />
              Save Mood Entry
            </Button>
          </div>
        )}

        <div>
          <h3 className="font-semibold mb-4 text-gray-900 text-lg">Recent Entries</h3>
          <div className="space-y-3">
            {recentEntries.slice(0, 3).map((entry, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getMoodColor(entry.mood).replace('text-', 'bg-')}`}></div>
                    <Badge 
                      variant="outline" 
                      className={`capitalize font-medium border-white/40 ${getMoodColor(entry.mood)} bg-white/40`}
                    >
                      {entry.mood}
                    </Badge>
                    <span className="text-sm text-gray-700 font-medium">
                      Intensity: {entry.intensity}/10
                    </span>
                  </div>
                  <span className="text-xs text-gray-600 font-medium">
                    {entry.timestamp.toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodTracker;