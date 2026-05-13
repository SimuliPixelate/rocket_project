import { Link } from "react-router";
function Footer() {
  return (
    <footer className="flex flex-col p-10 items-center text-white bg-black">
      <div className="grid grid-flow-col mb-5">
        <Link
          to="/home"
          className="text-xl text-white font-bold tracking-widest"
        >
          AROCKET
        </Link>
      </div>

      <div className="w-full max-w-5xl border-b border-gray-700 pb-4">
        <div className="flex flex-wrap justify-center gap-12 text-sm uppercase tracking-widest font-medium">
          <Link to="/home">Home</Link>

          <Link to="/apod">Explore</Link>

          <Link to="/personal">Learnings</Link>

          <Link to="/about">About</Link>

          <Link to="/profile">Profile</Link>
        </div>
      </div>
      <hr />
      <div className="text-center mt-5">
        <p>
          &copy; Copyright 2026 - ARocket. All Rights Reserved. Programmed and
          Designed By The ARocket Team.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
