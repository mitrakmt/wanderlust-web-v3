import Button from '../Button/Button';

function CookiesBar({ acceptCookies }) {
    return (
        <div style={{ zIndex: 2000 }} className={`fixed bottom-0 ml-16 right-0 transition-all flex items-center justify-center w-full p-4 text-sm text-gray-700 bg-gray-100 left-0 dark:bg-gray-700 dark:text-gray-300`} role="alert">
            <div className="flex flex-wrap">
                We use our own cookies as well as third-party cookies on our website to enhance your experience, analyze traffic, and for security.
            </div>
            <Button onClick={acceptCookies} text="Accept Cookies" classes="ml-4" />
        </div>
    );
}

export default CookiesBar;