import Image from "next/image";
import img from "@/public/images/logo.png";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="backdrop-blur-md bg-white/70 border border-blue-100 shadow-xl rounded-3xl p-10 flex flex-col items-center max-w-lg w-full mx-4">
        <div className="bg-gradient-to-tr from-blue-500 to-lime-400 rounded-full p-2 mb-6 shadow-lg">
          <Image
            src={img}
            alt="App Logo"
            width={90}
            height={90}
            className="rounded-full"
            priority
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">
          Welcome to <span className="text-blue-600">Issue Tracker</span>
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-8">
          Organize your projects, track bugs, and collaborate with your team.  <br />
          <span className="font-semibold text-blue-500">Get started below!</span>
        </p>
        <div className="flex gap-4 w-full">
          <Link
            href="/issues/list"
            className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition duration-200 text-center"
          >
            View Issues
          </Link>
          <Link
            href="/issues/new"
            className="flex-1 px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition duration-200 text-center"
          >
            Create Issue
          </Link>
        </div>
      </div>
    </main>
  );
}
