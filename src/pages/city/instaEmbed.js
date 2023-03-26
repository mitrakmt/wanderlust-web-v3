import React, { useEffect } from 'react';

const InstagramPost = ({ links }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = '//www.instagram.com/embed.js';
        script.async = true;
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
    }, []);
    
    return (
        <div className="w-full flex gap-x-4 flex-wrap" style={{ height: '455px' }}>
            {
                links.map((link, index) => (
                    <div key={`instagram-link-${link}-${index}`} className={`w-100 h-full ${index === 0 ? "first:block hidden sm:block" : "not:first-child hidden sm:block"}`}>
                        <blockquote
                            className={`instagram-media`}
                            data-instgrm-captioned
                            data-instgrm-permalink={link}
                            data-instgrm-version="14"
                        ></blockquote>
                    </div>
                ))
            }
        </div>
    );
};
        
export default InstagramPost;
