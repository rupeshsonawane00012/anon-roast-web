import { Link, useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Flame, Upload, Zap, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useSession } from '../components/SessionProvider';
import { useEffect } from 'react';

export function Landing() {
  const navigate = useNavigate();
  const { session, createSession, loading } = useSession();

  useEffect(() => {
    // Auto-create session if none exists
    if (!loading && !session) {
      createSession().catch(console.error);
    }
  }, [loading, session, createSession]);

  const handleStartRoasting = () => {
    navigate('/upload');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 mb-6">
            <Flame className="h-4 w-4" />
            <span>Anonymous. Creative. Clean.</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Upload an Image.
            <br />
            <span className="text-orange-600">Get Roasted.</span>
            <br />
            Stay Anonymous.
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            The internet's first visual roasting platform. Upload memes, screenshots, selfies, or anything—
            and watch the internet's creativity roast it to perfection. All anonymous. All moderated.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleStartRoasting}
              className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-8 py-4 text-lg font-semibold text-white hover:bg-orange-700 transition-colors"
            >
              <Upload className="h-5 w-5" />
              Start Roasting
            </button>
            
            <Link
              to="/how"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 hover:border-gray-400 transition-colors"
            >
              See How It Works
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* How It Works - 3 Steps */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Three Steps to Viral Roasts
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm"
          >
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">1. Upload</h3>
            <p className="text-gray-600">
              Upload any image—memes, screenshots, selfies, code, chat convos. 
              Choose your roast level: Soft, Spicy, or Savage.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm"
          >
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">2. Get Roasted</h3>
            <p className="text-gray-600">
              Watch creative roasts roll in real-time. The community uses text, 
              drawings, and memes to roast your image—cleverly, not cruelly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm"
          >
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">3. Share</h3>
            <p className="text-gray-600">
              The best roasts get highlighted. Share them anywhere. 
              All content is AI-moderated for safety—no hate, no harassment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Example Roasts */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 bg-gray-50 rounded-3xl">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Top Roasts This Week
        </h2>
        <p className="text-center text-gray-600 mb-12">
          See what the community is creating
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
          >
            <div className="aspect-video bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1630416763848-607070f954d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGZ1bm55JTIwcm9hc3QlMjBjb21lZHl8ZW58MXx8fHwxNzcyMjAyODk1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Roast example"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <p className="font-medium text-gray-900 mb-2">
                "Your code has more bugs than a rainforest expedition 🐛"
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium text-orange-600">EpicRoaster247</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  94 points
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
          >
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1759668358492-927c1a1062b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsYXB0b3AlMjB3b3Jrc3BhY2UlMjBzZXR1cHxlbnwxfHx8fDE3NzIyMDI4OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Roast example"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <p className="font-medium text-gray-900 mb-2">
                "Your workspace is so clean, I bet you don't actually work there"
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium text-orange-600">SavageCritic891</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  87 points
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <Shield className="h-12 w-12 text-orange-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Safe, Moderated, Anonymous
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Every roast is AI-moderated before going live. No hate speech, no harassment, 
            no NSFW content. Just creative, clever roasts. Everyone stays anonymous.
          </p>
          <Link
            to="/rules"
            className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700"
          >
            Read Our Community Rules
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-orange-600 to-pink-600 rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-4">
            Ready to Get Roasted?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of people sharing laughs every day
          </p>
          <button
            onClick={handleStartRoasting}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-orange-600 hover:bg-gray-100 transition-colors"
          >
            <Flame className="h-5 w-5" />
            Upload Your First Image
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-900 font-bold">
              <Flame className="h-5 w-5 text-orange-500" />
              <span>RoastMe</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-600">
              <Link to="/rules" className="hover:text-gray-900">Rules</Link>
              <a href="#" className="hover:text-gray-900">Privacy</a>
              <a href="#" className="hover:text-gray-900">Terms</a>
              <a href="#" className="hover:text-gray-900">Contact</a>
            </div>
            <div className="text-sm text-gray-600">
              © 2026 RoastMe. Stay creative.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
