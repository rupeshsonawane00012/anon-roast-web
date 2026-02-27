import { useParams, Link } from 'react-router';
import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Share2, Copy, Check, Upload } from 'lucide-react';
import { motion } from 'motion/react';
import { apiCall } from '../lib/supabase';
import { toast } from 'sonner';

interface RoastSession {
  id: string;
  imageUrl: string;
  roastLevel: string;
  caption: string;
  roastCount: number;
}

interface TopRoast {
  id: string;
  text: string;
  author: string;
  score: number;
}

export function Share() {
  const { roastId } = useParams<{ roastId: string }>();
  const [roastSession, setRoastSession] = useState<RoastSession | null>(null);
  const [topRoast, setTopRoast] = useState<TopRoast | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!roastId) return;

    const fetchData = async () => {
      try {
        const sessionData = await apiCall(`/roast/${roastId}`);
        setRoastSession(sessionData.roastSession);

        const feedData = await apiCall(`/roast/${roastId}/feed`);
        if (feedData.submissions.length > 0) {
          setTopRoast(feedData.submissions[0]);
        }
      } catch (error) {
        console.error('Error fetching share data:', error);
        toast.error('Failed to load roast');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roastId]);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this roast on RoastMe! 🔥`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'reddit':
        window.open(`https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`, '_blank');
        break;
    }
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Roast Not Found</h1>
          <Link to="/" className="text-orange-600 hover:text-orange-700 font-semibold">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Epic Roast Alert 🔥
          </h1>
          <p className="text-lg text-gray-600">
            This roast got {roastSession.roastCount} submissions
          </p>
        </motion.div>

        {/* Roast Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-2xl mb-8"
        >
          <img
            src={roastSession.imageUrl}
            alt="Roasted content"
            className="w-full max-h-[500px] object-contain bg-gray-100"
          />
          
          {topRoast && (
            <div className="p-6 border-t-2 border-orange-500 bg-orange-50">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0">
                  🏆
                </div>
                <div className="flex-1">
                  <p className="text-lg font-bold text-gray-900 mb-2">Top Roast:</p>
                  <p className="text-gray-800 text-lg leading-relaxed">"{topRoast.text}"</p>
                  <div className="flex items-center gap-3 mt-3 text-sm">
                    <span className="font-semibold text-orange-600">{topRoast.author}</span>
                    <span className="text-gray-500">•</span>
                    <span className="font-bold text-orange-600">{topRoast.score} points</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {roastSession.caption && (
            <div className="px-6 pb-6">
              <p className="text-gray-600 italic">Original caption: "{roastSession.caption}"</p>
            </div>
          )}

          {/* RoastMe Watermark */}
          <div className="bg-gray-900 px-6 py-4 text-center">
            <p className="text-white font-semibold">
              Created on <span className="text-orange-400">RoastMe</span> — The Internet's Roasting Platform
            </p>
          </div>
        </motion.div>

        {/* Share Buttons */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Share This Roast
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={() => handleShare('twitter')}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#1DA1F2] px-6 py-3 font-semibold text-white hover:bg-[#1a8cd8] transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Twitter
            </button>
            
            <button
              onClick={() => handleShare('facebook')}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#4267B2] px-6 py-3 font-semibold text-white hover:bg-[#365899] transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
            
            <button
              onClick={() => handleShare('reddit')}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF4500] px-6 py-3 font-semibold text-white hover:bg-[#e63e00] transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
              </svg>
              Reddit
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              value={window.location.href}
              readOnly
              className="w-full px-4 py-3 pr-24 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm"
            />
            <button
              onClick={handleCopyLink}
              className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-600 to-pink-600 rounded-2xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Want to Create Your Own Roast?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Upload your image and let the internet work its magic
          </p>
          <Link
            to="/upload"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-orange-600 hover:bg-gray-100 transition-colors"
          >
            <Upload className="h-5 w-5" />
            Upload Your Image
          </Link>
        </div>
      </div>
    </div>
  );
}
