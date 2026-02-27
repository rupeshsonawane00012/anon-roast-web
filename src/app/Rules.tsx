import { Header } from '../components/Header';
import { Shield, AlertTriangle, Ban, Flag, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';

export function Rules() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 mb-4">
            <Shield className="h-4 w-4" />
            <span>Community Guidelines</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Rules & Safety
          </h1>
          <p className="text-xl text-gray-600">
            Keep it fun, creative, and respectful. Always.
          </p>
        </motion.div>

        {/* Core Rules */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Core Rules</h2>
          
          <div className="space-y-4">
            <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-green-900 mb-2">1. Be Creative, Not Cruel</h3>
                  <p className="text-green-800">
                    Roasts should be witty, clever, and funny. The goal is to make people laugh, 
                    not to hurt them. Think comedy roast, not personal attack.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-green-900 mb-2">2. Anonymous by Default</h3>
                  <p className="text-green-800">
                    Everyone gets a random username. No profiles, no followers, no personal info. 
                    Your roasts speak for themselves.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-green-900 mb-2">3. Consent is Required</h3>
                  <p className="text-green-800">
                    Only upload images you own or have permission to share. Never upload someone 
                    else's photo without their consent. Violators will be banned.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-green-900 mb-2">4. AI Moderates Everything</h3>
                  <p className="text-green-800">
                    Every roast is scanned before going live. Content that violates our rules is 
                    automatically blocked. The system learns and improves over time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strictly Forbidden */}
        <section className="mb-12">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Ban className="h-8 w-8 text-red-600" />
              <h2 className="text-3xl font-bold text-red-900">Strictly Forbidden</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-red-900 mb-1">Hate Speech & Slurs</h3>
                  <p className="text-red-800 text-sm">
                    Any language targeting race, ethnicity, religion, gender, sexual orientation, 
                    disability, or nationality is permanently banned.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-red-900 mb-1">Sexual Harassment & NSFW Content</h3>
                  <p className="text-red-800 text-sm">
                    No sexual comments, explicit images, or harassment of any kind. This is a 
                    clean platform.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-red-900 mb-1">Threats & Doxxing</h3>
                  <p className="text-red-800 text-sm">
                    No threats of violence, no sharing of personal information, no attempts to 
                    identify users. Zero tolerance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-red-900 mb-1">Body Shaming & Discrimination</h3>
                  <p className="text-red-800 text-sm">
                    Roast the content, not the person. No attacks on appearance, weight, 
                    disabilities, or personal characteristics.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-red-900 mb-1">Lazy Insults</h3>
                  <p className="text-red-800 text-sm">
                    Generic insults like "you're ugly" or "you suck" will be blocked. 
                    Put effort into your roasts—be creative!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Moderation */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How AI Moderation Works</h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
            <div className="space-y-4 text-blue-900">
              <p className="font-medium">
                Our AI moderation system protects the community 24/7:
              </p>
              
              <ul className="space-y-3 ml-6">
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>
                    <strong>Image scanning:</strong> Checks for NSFW content, violence, or inappropriate material
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>
                    <strong>Text analysis:</strong> Detects hate speech, threats, slurs, and harassment in real-time
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>
                    <strong>Creativity scoring:</strong> Rewards clever, original roasts and blocks lazy insults
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>
                    <strong>Pattern detection:</strong> Identifies repeat offenders and auto-mutes bad actors
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>
                    <strong>Human review:</strong> Flagged content is reviewed by moderators when needed
                  </span>
                </li>
              </ul>
              
              <p className="mt-4 pt-4 border-t border-blue-200">
                <strong>False positive?</strong> If your roast was incorrectly blocked, 
                you can report it for review. We're constantly improving the system.
              </p>
            </div>
          </div>
        </section>

        {/* Reporting */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Reporting Content</h2>
          
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
            <div className="flex items-start gap-4 mb-4">
              <Flag className="h-6 w-6 text-gray-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-700 mb-4">
                  See something that violates our rules? Report it immediately. Every report 
                  is reviewed, and action is taken quickly.
                </p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">How to Report:</h4>
                    <ol className="text-sm text-gray-700 space-y-1 ml-6">
                      <li>1. Click the flag icon on any roast</li>
                      <li>2. Select a reason (hate speech, harassment, NSFW, etc.)</li>
                      <li>3. Submit—your report is anonymous</li>
                      <li>4. We'll review within 24 hours</li>
                    </ol>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-300">
                    <h4 className="font-bold text-gray-900 mb-1">What Happens Next:</h4>
                    <ul className="text-sm text-gray-700 space-y-1 ml-6">
                      <li>• Severe violations result in immediate content removal</li>
                      <li>• Repeat offenders are permanently banned</li>
                      <li>• False reports are also reviewed and may result in penalties</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Age Restriction */}
        <section className="mb-12">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-yellow-900 mb-2">18+ Only</h3>
                <p className="text-yellow-800">
                  RoastMe is intended for users 18 years and older. While we moderate content 
                  heavily, roasts can be sharp and mature. By using this platform, you confirm 
                  you are at least 18 years old.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Consequences */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Consequences for Violations</h2>
          
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-bold text-yellow-900 mb-2">⚠️ First Warning</h3>
              <p className="text-sm text-yellow-800">
                Minor violations get a warning. Content is removed. Account is flagged.
              </p>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="font-bold text-orange-900 mb-2">🚫 Temporary Ban</h3>
              <p className="text-sm text-orange-800">
                Repeat offenses result in a 7-day ban. Further violations = permanent ban.
              </p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="font-bold text-red-900 mb-2">🔨 Permanent Ban</h3>
              <p className="text-sm text-red-800">
                Severe violations (hate, threats, doxxing) = immediate permanent ban. No appeals.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 text-center text-white">
          <Shield className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">
            Ready to Roast Responsibly?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Follow the rules, be creative, and have fun!
          </p>
          <Link
            to="/upload"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 hover:bg-gray-100 transition-colors"
          >
            Start Roasting
          </Link>
        </div>
      </div>
    </div>
  );
}
