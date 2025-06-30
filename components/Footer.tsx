import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Facebook } from 'lucide-react'



function Footer() {
  return (
      <footer
        className="py-16 bg-black border-t border-yellow-500/20 relative overflow-hidden"
      >
        {/* Dimmed full background image */}
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
        backgroundImage: "url('/footer-img.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        opacity: 0.15,
        pointerEvents: "none",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <Image
                src="/lead_logo.png"
                alt="Basesh Gala Logo"
                width={120}
                height={120}
                className="object-contain mb-4"
              />
          <p className="text-gray-400 mb-6 max-w-md">
         Lead The Business by Chandrabhan Singh Rajawat
          </p>
          <div className="flex space-x-4">
            <Link href="https://www.facebook.com/profile.php?id=61551078663563" target="_blank" rel="noopener noreferrer">
              <Button
              size="icon"
              variant="outline"
              className="border-yellow-500/30 hover:bg-yellow-500 hover:text-black"
              >
              <Facebook className="w-5 h-5 text-black" />
              </Button>
            </Link>
            <Link href="https://www.instagram.com/leadthebusinessofficial?igsh=MWQ1a21rNTZ2emxxdg%3D%3D" target="_blank" rel="noopener noreferrer">
              <Button
              size="icon"
              variant="outline"
              className="border-yellow-500/30 hover:bg-yellow-500 hover:text-black"
              >
              <Instagram className="w-5 h-5 text-black" />
              </Button>
            </Link>
          
           
           
          </div>
        </div>

        <div>
        
          <div className="space-y-2 text-gray-400">
            <h2 className='text-yellow-500'>Pages</h2>
            <Link href="/" className="block hover:text-yellow-500 transition-colors">
              Home
            </Link>
            <Link href="/about" className="block hover:text-yellow-500 transition-colors">
              About
            </Link>
            <Link href="/course" className="block hover:text-yellow-500 transition-colors">
              Events
            </Link>
            <Link href="/contact" className="block hover:text-yellow-500 transition-colors">
              Contact Us
            </Link>
            <Link href="/blog" className="block hover:text-yellow-500 transition-colors">
            Blog
            </Link>
            <Link href="/gallery" className="block hover:text-yellow-500 transition-colors">
              Gallery
            </Link>
           
          </div>
        </div>

        <div>
          <h4 className="font-bold text-yellow-500 mb-4">Contact</h4>
          <div className="space-y-3 text-gray-400">
            <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4 text-yellow-500" />
          <span>careleadthebusiness@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
          {/* <Phone className="w-4 h-4 text-yellow-500" />
          <span>+91 98765 43210</span> */}
            </div>
            <div className="flex items-center space-x-2">
          <MapPin className="w-8 h-8 text-yellow-500" />
          <Link href={""}>
            <span>23-A ,Gagan Vihar, Harnathpura, Jhotwara,Niwaru Road,Jaipur,Rajasthan 302012</span>
          </Link>
            </div>
          </div>
        </div>
          </div>

          <div className="border-t border-yellow-500/20 mt-12 pt-8 text-center text-gray-400">
        <p>&copy; 2025 | Lead The Business | All Rights Reserved</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer