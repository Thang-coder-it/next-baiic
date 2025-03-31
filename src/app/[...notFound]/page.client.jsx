"use client";
import Link from "next/link";

import "./style.scss";

export default function Client() {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
          <h2 className="text-animation">404 - The Page can't be found</h2>
        </div>
        <Link href="/" replace>
          Go TO Homepage
        </Link>
      </div>
    </div>
  );
}
