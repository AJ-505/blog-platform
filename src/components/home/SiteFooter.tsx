export function SiteFooter() {
  return (
    <footer className="footer py-12 mt-16 border-t border-outline-variant bg-surface-variant">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
        <div>
          <h5 className="font-bold mb-2">SCRIBBLED</h5>
          <p className="text-sm text-on-surface-variant">
            Elevating voices through premium digital storytelling and curated
            aesthetics.
          </p>
        </div>
        <div>
          <h5 className="font-bold mb-2">RESOURCES</h5>
          <ul className="text-sm space-y-1">
            <li>
              <a href="#">Creator Guide</a>
            </li>
            <li>
              <a href="#">Publishing API</a>
            </li>
            <li>
              <a href="#">Themes Gallery</a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-2">PLATFORM</h5>
          <ul className="text-sm space-y-1">
            <li>
              <a href="#">Premium Plan</a>
            </li>
            <li>
              <a href="#">Success Stories</a>
            </li>
            <li>
              <a href="#">Mobile App</a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-2">SUPPORT</h5>
          <ul className="text-sm space-y-1">
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
