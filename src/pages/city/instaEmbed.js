import React from 'react';

const InstagramPost = ({ links }) => {
    return (
        <div className="w-full flex gap-x-4 justify-center flex-wrap overflow-hidden" style={{ height: '459px' }}>
            {
                links && links?.map((link, index) => (
                    <iframe key={`instagram-link-${link}-${index}`} className={`rounded-lg ${index === 0 ? "first:block hidden sm:block" : index === 1 ? "not:first-child hidden sm:block" : "not:first-child hidden md:block"}`} src={`https://www.instagram.com/p/${link}/embed`} width="325" height="100%" frameBorder="0" scrolling="no" allowFullScreen={true}></iframe>
                ))
            }
        </div>
    );
};
        
export default InstagramPost;
