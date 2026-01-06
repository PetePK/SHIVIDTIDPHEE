'use client';

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full min-h-screen bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin h-16 w-16 border-4 border-halloween-orange border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-halloween-cream text-lg font-iannnnn-owl">{message}</p>
      </div>
    </div>
  );
}
