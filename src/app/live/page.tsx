'use client';

import StreamChat from '@/components/StreamChat';

export default function Live() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Fixed video at the top */}
      <div className="w-full bg-white shadow-md">
        <div className="max-w-5xl mx-auto">
        <div className="w-full aspect-video">
              <video className="h-full w-full object-cover" controls autoPlay>
                <source
                  src="https://docs.material-tailwind.com/demo.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          
          {/* Stream info below the video */}
          {/* <div className="mt-4 pb-2">
            <h1 className="text-2xl font-bold text-gray-800">Live Stream Title</h1>
            <div className="flex items-center mt-2">
              <div className="flex-shrink-0 h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                S
              </div>
              <div className="ml-2">
                <p className="text-gray-800 font-medium">StarRoute</p>
                <p className="text-gray-500 text-sm">1.2K watching now</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      
      {/* Scrollable chat below */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-5xl mx-auto h-full">
          <StreamChat autoAddMessages={true} lightMode={true} />
        </div>
      </div>
    </div>
  );
}
