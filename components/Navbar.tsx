// import Image from "next/image";
// import Link from "next/link";

// const Navbar = () => {
//   return (
//     <header>
//       <nav>
//         <Link href="/" className="logo">
//           <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
//           <p>DevEvent</p>
//         </Link>

//         <ul>
//           <Link href="/">Home</Link>
//           <Link href="/">Event </Link>
//           <Link href="/createEvent">Create Event</Link>
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-black text-white shadow-md">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/icons/logo.png" alt="logo" width={32} height={32} />
          <span className="font-bold text-lg">DevEvent</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center">
          <li className="list-none">
            <Link href="/" className="hover:text-purple-400 transition-colors">
              Home
            </Link>
          </li>
          <li className="list-none">
            <Link
              href="/eventsBoard"
              className="hover:text-purple-400 transition-colors"
            >
              Events
            </Link>
          </li>
          <li className="list-none">
            <Link
              href="/createEvent"
              className="hover:text-purple-400 transition-colors"
            >
              Create Event
            </Link>
          </li>
        </ul>

        {/* Hamburger Icon */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <HiX className="w-6 h-6" />
          ) : (
            <HiMenu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-black text-white px-6 py-4 flex flex-col gap-4">
          <li className="list-none">
            <Link
              href="/"
              className="hover:text-purple-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="list-none">
            <Link
              href="/eventsBoard"
              className="hover:text-purple-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Events
            </Link>
          </li>
          <li className="list-none">
            <Link
              href="/createEvent"
              className="hover:text-purple-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Create Event
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Navbar;
