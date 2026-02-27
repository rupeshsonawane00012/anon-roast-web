import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Upload as UploadIcon, X, ImageIcon, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { useSession } from '../components/SessionProvider';
import { toast } from 'sonner';
import { projectId } from '/utils/supabase/info';

type RoastLevel = 'soft' | 'spicy' | 'savage';

export function Upload() {
  const navigate = useNavigate();
  const { session } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [roastLevel, setRoastLevel] = useState<RoastLevel>('spicy');
  const [caption, setCaption] = useState('');
  const [consent, setConsent] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!image) {
      toast.error('Please select an image');
      return;
    }
    
    if (!consent) {
      toast.error('Please accept the consent agreement');
      return;
    }
    
    if (!session) {
      toast.error('Session not found. Please refresh the page.');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('roastLevel', roastLevel);
      formData.append('caption', caption);
      formData.append('consent', 'true');
      formData.append('sessionId', session.id);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-eea9c73f/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Upload failed');
      }

      toast.success('Image uploaded! Entering the arena...');
      navigate(`/arena/${data.roastId}`);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Upload Your Image
          </h1>
          <p className="text-lg text-gray-600">
            Choose wisely. The internet is watching.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Your Image
            </label>
            
            {!imagePreview ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-orange-500 transition-colors bg-white"
              >
                <UploadIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Drop your image here, or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="relative bg-white rounded-xl border border-gray-200 p-4">
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-6 right-6 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 z-10"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-h-96 object-contain rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Roast Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Choose Roast Level
            </label>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setRoastLevel('soft')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  roastLevel === 'soft'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <Flame className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="font-bold text-gray-900">Soft</div>
                <div className="text-xs text-gray-600 mt-1">Playful</div>
              </button>

              <button
                type="button"
                onClick={() => setRoastLevel('spicy')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  roastLevel === 'spicy'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex gap-1 justify-center mb-2">
                  <Flame className="h-6 w-6 text-orange-600" />
                  <Flame className="h-6 w-6 text-orange-600" />
                </div>
                <div className="font-bold text-gray-900">Spicy</div>
                <div className="text-xs text-gray-600 mt-1">Creative</div>
              </button>

              <button
                type="button"
                onClick={() => setRoastLevel('savage')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  roastLevel === 'savage'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex gap-1 justify-center mb-2">
                  <Flame className="h-6 w-6 text-red-600" />
                  <Flame className="h-6 w-6 text-red-600" />
                  <Flame className="h-6 w-6 text-red-600" />
                </div>
                <div className="font-bold text-gray-900">Savage</div>
                <div className="text-xs text-gray-600 mt-1">Maximum</div>
              </button>
            </div>
          </div>

          {/* Optional Caption */}
          <div>
            <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-3">
              Add a Caption (Optional)
            </label>
            <input
              id="caption"
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Give them some context..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>

          {/* Consent */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <input
                id="consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-5 w-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="consent" className="text-sm text-gray-900">
                <strong>I consent to this image being roasted.</strong> I confirm that I own this 
                image or have permission to upload it. I understand that roasts may be creative 
                and sharp, but will be moderated for safety.
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={!image || !consent || uploading}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-8 py-4 text-lg font-semibold text-white hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {uploading ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  Uploading...
                </>
              ) : (
                <>
                  <ImageIcon className="h-5 w-5" />
                  Enter the Arena
                </>
              )}
            </button>
          </div>
        </form>

        {/* Tips */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-3">💡 Tips for Better Roasts</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Clear, high-quality images get better roasts</li>
            <li>• Add context with a caption to inspire creativity</li>
            <li>• Spicy level gets the most engagement</li>
            <li>• The funnier the image, the better the roasts</li>
          </ul>
        </div>
      </div>
    </div>
  );
}