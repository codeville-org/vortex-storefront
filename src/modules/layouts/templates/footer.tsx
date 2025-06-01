import React from "react";

export function Footer() {
  return (
    <div className="w-full h-12 border-t">
      <div className="content-container h-full mx-auto flex items-center justify-between">
        <h2 className="text-sm">
          © {new Date().getFullYear()} Medusa Store. All rights reserved.
        </h2>
        <h3 className="flex gap-x-2 text-sm items-center">
          Powered by
          <a href="https://codeville.uk" target="_blank" rel="noreferrer">
            Codeville
          </a>
        </h3>
      </div>
    </div>
  );
}
