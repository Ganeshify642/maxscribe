"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="container">
        <nav>
          <div className="logo">maxscribe<span>.ai</span></div>
          
          <div className="mobile-menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="navLinks">
            <Link href="/#features" onClick={toggleMenu}>Features</Link>
            <Link href="/#how" onClick={toggleMenu}>How it Works</Link>
            <Link href="/blog" onClick={toggleMenu}>Blog</Link>
            <Link 
              href="https://apps.apple.com/in/app/maxscribe-ai/id6744329793" 
              className="btn btn-primary" 
              style={{ padding: '8px 24px', borderRadius: '8px', fontSize: '0.9rem', color: '#fff' }}
            >
              Download App
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}