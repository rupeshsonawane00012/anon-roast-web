import { Link } from 'react-router';
import { Home, Flame } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <Flame className="h-24 w-24 text-orange-500 mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
          <p className="text-2xl font-semibold text-gray-700 mb-4">
            This Page Got Roasted Too Hard
          </p>
          <p className="text-gray-600">
            It no longer exists. But you can still roast other things!
          </p>
        </div>
        
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-8 py-4 text-lg font-semibold text-white hover:bg-orange-700 transition-colors"
        >
          <Home className="h-5 w-5" />
          Go Home
        </Link>
      </div>
    </div>
  );
}
