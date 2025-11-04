import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Import Button component

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your App</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          Explore your new Finance Dashboard!
        </p>
        <Link to="/finance-dashboard">
          <Button className="px-6 py-3 text-lg">Go to Finance Dashboard</Button>
        </Link>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;