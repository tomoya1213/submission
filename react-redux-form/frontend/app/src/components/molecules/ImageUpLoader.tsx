import React, { useRef, useState } from "react";
import { Error } from "../atoms/Index";
import { UserIcon } from "@heroicons/react/24/solid";


type ImageUploaderProps = {
  className?: string;
  label?: string;
  onFileSelect: (file: File) => void;
  error?: string | undefined;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ className,label, onFileSelect, error }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setSelectedImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
      onFileSelect(file);
    }
  };

  return (
    <div className={className}>
      <label>{label}</label>
      <div>
      <button
  type="button"
  className="border rounded-full w-16 h-16  items-center justify-center overflow-hidden aspect-w-1 aspect-h-1"
  onClick={() => fileInputRef.current?.click()}
>
  {selectedImage ? (
    <img
      src={selectedImage}
      alt="Selected"
      className="object-cover w-full h-full rounded-full"
    />
  ) : (
    <UserIcon className="object-cover w-full h-full rounded-full" />
  )}
</button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <p>タップして画像を変更</p>
      </div>
      {error && (
        <Error>
          {error}
        </Error>
      )}
    </div>
  );
};

export default ImageUploader;
