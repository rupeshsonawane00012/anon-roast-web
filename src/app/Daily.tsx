import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { RoastCard } from '../components/RoastCard';
import { Clock, Trophy, Upload, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { apiCall } from '../lib/supabase';
import { toast } from 'sonner';

interface DailyChallenge {
  date: string;
  topic: string;
  createdAt: string;
  participantCount: number;
}

interface Submission {
  id: string;
  text: string;
  author: string;
  createdAt: string;
  score: number;
}

export function Daily() {
  const [challenge, setChallenge] = useState<DailyChallenge | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const fetchDaily = async () => {
      try {
        const data = await apiCall('/daily');
        setChallenge(data.challenge);
        setSubmissions(data.topSubmissions || []);
      } catch (error) {
        console.error('Error fetching daily challenge:', error);
        toast.error('Failed to load daily challenge');
      } finally {
        setLoading(false);
      }
    };

    fetchDaily();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchDaily, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeRemaining(`${hours}h ${minutes}m`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin h-12 w-12 border-4 border-orange-600 border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Header />
      
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 mb-4">
            <Calendar className="h-4 w-4" />
            <span>Daily Challenge</span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Today's Roast Challenge
          </h1>
          <p className="text-xl text-gray-600">
            One topic. 24 hours. Show us your best roast.
          </p>
        </motion.div>

        {/* Challenge Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-10 text-center text-white mb-12 shadow-2xl"
        >
          <Trophy className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">
            {challenge?.topic || 'Loading...'}
          </h2>
          <div className="flex items-center justify-center gap-6 text-lg mb-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{timeRemaining} remaining</span>
            </div>
            <div className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              <span>{challenge?.participantCount || 0} participants</span>
            </div>
          </div>
          <Link
            to="/upload"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-purple-600 hover:bg-gray-100 transition-colors"
          >
            <Upload className="h-5 w-5" />
            Submit Your Entry
          </Link>
        </motion.div>

        {/* Leaderboard */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Today's Top Roasts
          </h2>
          
          {submissions.length > 0 ? (
            <div className="space-y-4">
              {submissions.map((submission, index) => (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {index < 3 && (
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-lg z-10">
                      {index + 1}
                    </div>
                  )}
                  <div className={index < 3 ? 'ml-6' : ''}>
                    <RoastCard
                      text={submission.text}
                      author={submission.author}
                      score={submission.score}
                      createdAt={submission.createdAt}
                      isHighlighted={index === 0}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                No submissions yet
              </p>
              <p className="text-gray-600 mb-6">
                Be the first to submit for today's challenge!
              </p>
              <Link
                to="/upload"
                className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
              >
                <Upload className="h-4 w-4" />
                Upload Now
              </Link>
            </div>
          )}
        </div>

        {/* How It Works */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-8">
          <h3 className="text-xl font-bold text-blue-900 mb-4">How Daily Challenges Work</h3>
          <ul className="space-y-3 text-blue-800">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">1.</span>
              <span>A new topic is posted every day at midnight</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">2.</span>
              <span>Upload an image related to the topic and enter the arena</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">3.</span>
              <span>Get roasted and roast others—the best roasts rise to the top</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">4.</span>
              <span>Top 10 roasters get featured on the daily leaderboard</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
