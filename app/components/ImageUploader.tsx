import { useActionData, useNavigation } from "@remix-run/react";
import { useRef, useState, useEffect } from "react";
import { ArrowUpOnSquareIcon } from '@heroicons/react/20/solid'
import exifr from "exifr";

const ImageUploader = ({ onLocationExtracted, onFileSelected }: { onLocationExtracted: (lat: number, lng: number) => void; onFileSelected: (file: File) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileSelectedMessage, setFileSelectedMessage] = useState<string | null>(null);
  const actionData = useActionData<{ error?: string; message?: string; path?: string }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      setFileSelectedMessage(`File ready: ${file.name}`);
      console.log("File selected in ImageUploader:", file);
      onFileSelected(file); // Notify parent component of the selected file

      try {
        // Extract GPS data using exifr
        const gpsData = await exifr.gps(file);
        if (gpsData) {
          const { latitude, longitude } = gpsData;
          onLocationExtracted(latitude, longitude);
        } else {
          // Fallback to browser geolocation if GPS data is not available
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                onLocationExtracted(position.coords.latitude, position.coords.longitude);
              },
              (error) => {
                console.error("Geolocation error:", error);
              }
            );
          }
        }
      } catch (error) {
        console.error("Error reading GPS data with exifr:", error);
      }
    } else {
      setFileSelectedMessage(null);
    }

  };

  // Clear file input after successful upload
  useEffect(() => {
    if (actionData?.message) {
      setSelectedFile(null);
      setFileSelectedMessage(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }, [actionData]);

  return (
    <>
      <input
        type="file"
        name="image"
        ref={inputRef}
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center gap-x-2 rounded-md cursor-pointer bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Select Image
        <ArrowUpOnSquareIcon aria-hidden="true" className="-mr-0.5 size-5" />
      </button>
      {fileSelectedMessage && <p className="text-blue-500">{fileSelectedMessage}</p>}
      {actionData?.error && <p className="text-red-500">{actionData.error}</p>}
      {actionData?.message && (
        <p className="text-green-500">
          {actionData.message}: {actionData.path}
        </p>
      )}
    </>
  );
};

export { ImageUploader };


