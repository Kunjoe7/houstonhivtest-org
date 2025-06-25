export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container-max">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-gradient bg-gradient-to-r from-pride-purple to-pride-teal bg-clip-text text-transparent">
              HoustonHIVTest.org
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Empowering Houston's LGBTQ+ and BIPOC communities with free, confidential HIV testing resources. 
              Know your status, own your health.
            </p>
            <div className="flex gap-4">
              <span className="text-2xl">🏳️‍🌈</span>
              <span className="text-2xl">❤️</span>
              <span className="text-2xl">🤝</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#find-testing" className="hover:text-pride-teal transition-colors">
                  Find Testing Sites
                </a>
              </li>
              <li>
                <a href="#home-test" className="hover:text-pride-teal transition-colors">
                  Order Home Test Kit
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-pride-teal transition-colors">
                  Community Events
                </a>
              </li>
              <li>
                <a href="#support" className="hover:text-pride-teal transition-colors">
                  Support Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get Help</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="tel:211" className="hover:text-pride-teal transition-colors">
                  📞 Call 2-1-1 for Resources
                </a>
              </li>
              <li>
                <a href="https://montrosecenter.org" className="hover:text-pride-teal transition-colors">
                  🏳️‍🌈 Montrose Center
                </a>
              </li>
              <li>
                <a href="https://legacycommunityhealth.org" className="hover:text-pride-teal transition-colors">
                  🏥 Legacy Community Health
                </a>
              </li>
              <li>
                <a href="https://hiv.gov" className="hover:text-pride-teal transition-colors">
                  🌐 HIV.gov Resources
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            <p>© 2025 HoustonHIVTest.org Demo. Built for Pride Houston 2025.</p>
            <p className="mt-1">This is a demonstration website showcasing HIV testing resources.</p>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <span className="text-red-500">❤️</span>
              Made with love for Houston
            </span>
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-400 text-center">
            <strong>Important:</strong> This is a demo website for educational purposes. 
            For actual HIV testing services, please contact the organizations listed above or visit 
            <a href="https://hiv.gov" className="text-pride-teal hover:underline ml-1">HIV.gov</a> 
            for official resources.
          </p>
        </div>
      </div>
    </footer>
  )
}
