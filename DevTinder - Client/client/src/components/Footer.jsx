import React from 'react'

const Footer = () => {
  return (
   <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 w-full">
  <aside>
    <p className="text-center text-sm">Copyright © {new Date().getFullYear()} - Goutham Mallya G</p>
  </aside>
</footer>
  )
}

export default Footer