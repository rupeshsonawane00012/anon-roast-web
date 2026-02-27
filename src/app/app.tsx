import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from 'sonner';
import { SessionProvider } from './components/SessionProvider';

export default function App() {
  return (
    <SessionProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </SessionProvider>
  );
}
