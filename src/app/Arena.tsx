import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { Header } from '../components/Header';
import { RoastCard } from '../components/RoastCard';
import { Flame, Send, Share2, AlertCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { useSession } from '../components/SessionProvider';
import { apiCall } from '../lib/supabase';
import { toast } from 'sonner';

interface RoastSession {
  id: string;
  imageUrl: string;
  roastLevel: string;
  caption: string;
  createdAt: string;
  expiresAt: string;
  roastCount: number;
}

interface Submission {
  id: string;
  text: string;
  author: string;
  createdAt: string;
  score: number;
}

export function Arena() {
  const { id } = useParams<{ id: string }>();
  const { session } = useSession();
  
  const [roastSession, setRoastSession] = useState<RoastSession | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [roastText, setRoastText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch roast session
  useEffect(() => {
    if (!id) return;
    
    const fetchRoastSession = async () => {
      try {
        const data = await apiCall(`/roast/${id}`);
        setRoastSession(data.roastSession);
      } catch (error) {
        console.error('Error fetching roast session:', error);
        toast.error('Failed to load roast session');
      } finally {
        setLoading(false);
      }
    };

    fetchRoastSession();
  }, [id]);

  // Fetch submissions
  useEffect(() => {
    if (!id) return;

    const fetchSubmissions = async () => {
      try {
        const data = await apiCall(`/roast/${id}/feed`);
        setSubmissions(data.submissions);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
    
    // Poll for new submissions every 5 seconds
    const interval = setInterval(fetchSubmissions, 5000);
    return () => clearInterval(interval);
  }, [id]);

  const handleSubmitRoast = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!roastText.trim()) {
      toast.error('Please enter a roast');
      return;
    }
    
    if (!session) {
      toast.error('Session not found. Please refresh the page.');
      return;
    }

    setSubmitting(true);

    try {
      const data = await apiCall(`/roast/${id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: roastText,
          sessionId: session.id,
        }),
      });

      // Add new submission to feed
      setSubmissions(prev => [data.submission, ...prev]);
      setRoastText('');
      toast.success('Roast submitted! 🔥');
    } catch (error) {
      console.error('Error submitting roast:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit roast';
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/share/${id}`;
    navigator.clipboard.writeText(url);
    toast.success('Share link copied!');
  };

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

  if (!roastSession) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Roast Not Found</h1>
          <p className="text-gray-600 mb-6">This roast session doesn't exist or has expired.</p>
          <Link
            to="/upload"
            className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
          >
            Upload New Image
          </Link>
        </div>
      </div>
    );
  }

  const timeRemaining = getTimeRemaining(roastSession.expiresAt);
  const topSubmissions = submissions.slice(0, 3);
  const recentSubmissions = submissions.slice(3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">Roast Arena</h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                {getRoastLevelLabel(roastSession.roastLevel)}
                <Flame className="h-3 w-3" />
              </span>
            </div>
            <p className="text-gray-600">
              {roastSession.roastCount} roasts submitted
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{timeRemaining}</span>
            </div>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:border-gray-400"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Image */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg"
            >
              <img
                src={roastSession.imageUrl}
                alt="Image to roast"
                className="w-full max-h-[600px] object-contain"
              />
              {roastSession.caption && (
                <div className="p-4 border-t border-gray-200">
                  <p className="text-gray-700 italic">"{roastSession.caption}"</p>
                </div>
              )}
            </motion.div>

            {/* Roast Input */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Submit Your Roast</h2>
              <form onSubmit={handleSubmitRoast} className="space-y-4">
                <textarea
                  value={roastText}
                  onChange={(e) => setRoastText(e.target.value)}
                  placeholder="Write your roast... Be creative, not cruel."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
                />
                <button
                  type="submit"
                  disabled={submitting || !roastText.trim()}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Roast
                    </>
                  )}
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-3">
                💡 Tip: Be creative and funny. Lazy insults will be blocked.
              </p>
            </div>
          </div>

          {/* Right: Feed */}
          <div className="space-y-6">
            {/* Top Roasts */}
            {topSubmissions.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  🏆 Top Roasts
                </h2>
                <div className="space-y-3">
                  {topSubmissions.map((submission) => (
                    <RoastCard
                      key={submission.id}
                      text={submission.text}
                      author={submission.author}
                      score={submission.score}
                      createdAt={submission.createdAt}
                      isHighlighted
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Recent Roasts */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Recent Roasts
              </h2>
              {recentSubmissions.length > 0 ? (
                <div className="space-y-3">
                  {recentSubmissions.map((submission) => (
                    <RoastCard
                      key={submission.id}
                      text={submission.text}
                      author={submission.author}
                      score={submission.score}
                      createdAt={submission.createdAt}
                    />
                  ))}
                </div>
              ) : submissions.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                  <Flame className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">No roasts yet. Be the first!</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getRoastLevelLabel(level: string): string {
  switch (level) {
    case 'soft': return 'Soft Roast';
    case 'spicy': return 'Spicy Roast';
    case 'savage': return 'Savage Roast';
    default: return 'Roast';
  }
}

function getTimeRemaining(expiresAt: string): string {
  const now = new Date();
  const expires = new Date(expiresAt);
  const hours = Math.floor((expires.getTime() - now.getTime()) / (1000 * 60 * 60));
  
  if (hours < 1) return 'Expires soon';
  if (hours === 1) return '1 hour left';
  return `${hours} hours left`;
}
