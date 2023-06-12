import Link from "next/link"

export default function NavBar() {

    return (
        
        <div className="vertical-navbar">
          <div className="title-container">
            Cerulean-Lion
          </div>
          <div className="links-container">
            <div className="nav-container">
              <Link href="/" className="navbar-links">Home</Link>
            <Link href="/blog" className="navbar-links">Blog</Link>
            </div>
            
          </div>
        </div>
    )
}