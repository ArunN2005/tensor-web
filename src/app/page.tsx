import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 p-8">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">Tensor Club</h1>
      <div className="max-w-lg w-full text-center mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <p className="mb-6 text-lg text-gray-700">
          Premium Tech Community of Amrita Vishwa Vidyapeetham, Coimbatore
        </p>
        <Button size="lg" className="mt-4">
          Get Started
        </Button>
      </div>
    </main>
  );
}