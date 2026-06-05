export default function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        
        <footer className="w-full bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-8 mt-auto border-t border-gray-300 dark:border-gray-800 transition-colors duration-500">
            
            <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
                
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <span className="text-xl font-bold text-black dark:text-white mb-2">Food Tracker</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                        Aggregate grocery prices, track your meals, and make informed nutritional choices every day.
                    </p>
                </div>

                <div className="flex flex-col items-center md:items-start gap-2 text-sm">
                    <span className="font-semibold text-black dark:text-white mb-1">Navigation</span>
                    <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</a>
                    <a href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">About Us</a>
                    <a href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact</a>
                </div>

                <div className="flex flex-col items-center md:items-start gap-2 text-sm">
                    <span className="font-semibold text-black dark:text-white mb-1">Legal</span>
                    <a href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Privacy Policy</a>
                    <a href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Terms of Service</a>
                </div>

            </div>

            <div className="max-w-5xl mx-auto px-6 mt-8 pt-4 border-t border-gray-300 dark:border-gray-800 flex flex-col items-center">
                <p className="text-xs text-gray-500 dark:text-gray-500">
                    &copy; {currentYear} Food Tracker. All rights reserved.
                </p>
            </div>

        </footer>
    );
}