import { Star } from "lucide-react";



const ReviewPage: React.FC = () => {
    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-50">
        <h2>Laat een review achter voor jouw gehuurde aanhanger</h2>
        
        <button
            type="submit"
            className="w-full py-2 px-4 bg-primary-100 text-white font-semibold rounded-md hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-opacity-50"
          >
            Verstuur
        </button>        
        </main>
    );
};

export default ReviewPage;