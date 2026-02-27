import { Link } from 'react-router';
import { Header } from '../components/Header';
import { Upload, Flame, Shield, MessageSquare, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function HowItWorks() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            How RoastMe Works
          </h1>
          <p className="text-xl text-gray-600">
            Everything you need to know before entering the arena
          </p>
        </motion.div>

        {/* What Is RoastMe */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What is RoastMe?</h2>
          <div className="prose prose-lg text-gray-700">
            <p>
              RoastMe is an anonymous, image-based roasting platform where you can upload 
              any image and get creatively roasted by the internet. Think of it as a 
              friendly roast battle—but with visuals, anonymity, and strong moderation.
            </p>
            <p>
              Unlike traditional social media, there are <strong>no profiles, no followers, 
              no likes, and no DMs</strong>. Just pure, creative roasting fun.
            </p>
          </div>
        </section>

        {/* What You Can Upload */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What Can You Upload?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Memes and screenshots',
              'Code snippets',
              'Chat conversations',
              'Selfies (with consent)',
              'Desktop setups',
              'Resumes or bios',
              'Design work',
              'Anything roastable!',
            ].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 bg-gray-50 rounded-lg p-4"
              >
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-gray-700 font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Roast Levels */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Choose Your Roast Level</h2>
          <div className="space-y-4">
            <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="h-5 w-5 text-green-600" />
                <h3 className="text-xl font-bold text-green-900">Soft</h3>
              </div>
              <p className="text-green-800">
                Playful and lighthearted. Perfect for beginners or sensitive topics.
              </p>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="h-5 w-5 text-orange-600" />
                <Flame className="h-5 w-5 text-orange-600" />
                <h3 className="text-xl font-bold text-orange-900">Spicy</h3>
              </div>
              <p className="text-orange-800">
                Sharp and witty. The sweet spot for most roasts. Gets creative.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="h-5 w-5 text-red-600" />
                <Flame className="h-5 w-5 text-red-600" />
                <Flame className="h-5 w-5 text-red-600" />
                <h3 className="text-xl font-bold text-red-900">Savage</h3>
              </div>
              <p className="text-red-800">
                Maximum creativity and impact. Still clean—no hate allowed.
              </p>
            </div>
          </div>
        </section>

        {/* What's Not Allowed */}
        <section className="mb-16">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-8 w-8 text-red-600" />
              <h2 className="text-3xl font-bold text-red-900">What's NOT Allowed</h2>
            </div>
            <ul className="space-y-3 text-red-900">
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">✗</span>
                <span><strong>Hate speech, slurs, or threats</strong> of any kind</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">✗</span>
                <span><strong>Sexual harassment or NSFW content</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">✗</span>
                <span><strong>Body shaming, racism, or discrimination</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">✗</span>
                <span><strong>Uploading images without consent</strong> (e.g., someone else's photo)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">✗</span>
                <span><strong>Lazy insults</strong> (e.g., "you're ugly")—be creative!</span>
              </li>
            </ul>
          </div>
        </section>

        {/* AI Moderation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How AI Moderation Works</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
            <div className="space-y-4 text-blue-900">
              <p>
                Every roast is automatically scanned by AI before it goes live. Our moderation system:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Blocks hate speech, slurs, and threats in real-time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Scores roasts on creativity and originality</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Suggests witty rewrites for lazy insults</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Auto-highlights the best roasts for sharing</span>
                </li>
              </ul>
              <p className="mt-4">
                <strong>Users can also report content.</strong> Repeat offenders get auto-muted.
              </p>
            </div>
          </div>
        </section>

        {/* The Arena */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Roast Arena</h2>
          <div className="prose prose-lg text-gray-700">
            <p>
              After uploading, you enter the <strong>Roast Arena</strong>—the heart of RoastMe. 
              Here's what happens:
            </p>
            <ol className="space-y-3">
              <li>
                <strong>Your image is displayed</strong> in the center
              </li>
              <li>
                <strong>Other users roast it</strong> using text, drawings, memes, and stickers
              </li>
              <li>
                <strong>Roasts appear in real-time</strong> in a live feed below
              </li>
              <li>
                <strong>Top roasts are highlighted</strong> based on creativity score
              </li>
              <li>
                <strong>You can share the best ones</strong> anywhere
              </li>
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="bg-gradient-to-r from-orange-600 to-pink-600 rounded-2xl p-10 text-center text-white">
            <MessageSquare className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Ready to Enter the Arena?</h2>
            <p className="text-lg mb-6 opacity-90">
              Upload your first image and see what the internet can create
            </p>
            <Link
              to="/upload"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-orange-600 hover:bg-gray-100 transition-colors"
            >
              Upload Now
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
