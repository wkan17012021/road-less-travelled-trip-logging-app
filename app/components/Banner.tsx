import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid'

export default function Banner() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check if geolocation is available and allowed
        if (typeof navigator !== 'undefined' && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            () => {
              // Success: don't show the banner
            },
            (error) => {
              if (error.code === error.PERMISSION_DENIED) {
                setShowBanner(true); // Show banner if user denied geolocation
              }
            }
          );
        } else {
          // Geolocation not supported
          setShowBanner(true);
        }
      }, []);

    if (!showBanner) return null;

  return (
    <div className="flex items-center gap-x-6 bg-indigo-600 mb-8 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <p className="text-sm/6 text-white">
          <strong className="font-semibold">The app relies on your device geolocation</strong>
          <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline size-0.5 fill-current">
            <circle r={1} cx={1} cy={1} />
          </svg>
          Please turn on your location settings&nbsp;<span aria-hidden="true">&rarr;</span>
      </p>
      <div className="flex flex-1 justify-end">
        <button onClick={()=> {setShowBanner(false)}} type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
          <span className="sr-only">Dismiss</span>
          <XMarkIcon aria-hidden="true" className="size-5 text-white cursor-pointer" />
        </button>
      </div>
    </div>
  )
}
