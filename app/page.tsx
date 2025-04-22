import Image from "next/image";
import img from "@/public/images/logo.png";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 to-lime-200 px-6 text-center">
      <Image src={img} alt="App Logo" width={120} height={120} className="mb-6 drop-shadow-lg" />

      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Welcome to Your Issue Tracker
      </h1>

      <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-6">
        Keep your projects organized, track bugs efficiently, and collaborate seamlessly.
        Click <span className="font-semibold text-blue-600">Issues</span> in the navigation bar to begin logging and resolving tickets.
      </p>

      <div className="flex gap-4">
        <Link href={'/issues/list'} className="px-6 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition duration-300">
          View Issues
        </Link>
        <Link href={'/issues/new'} className="px-6 py-2 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition duration-300">
          Create New Issue
        </Link>
      </div>
    </div>
  );
}
