"use client";

import { AlertCircle, ImageIcon, Upload } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Button from "./Button";

type FileUploadProps = {
  onFilesChange: (files: File[]) => void; // Callback to notify parent of file changes
};

export default function FileUpload({ onFilesChange }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const maxFiles = 5;

  // Notify the parent component when files change
  useEffect(() => {
    onFilesChange(files);
  }, [files, onFilesChange]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      const imageFiles = droppedFiles.filter((file) =>
        file.type.startsWith("image/")
      );
      setFiles((prev) => [...prev, ...imageFiles].slice(0, maxFiles));
    },
    [maxFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const selectedFiles = Array.from(e.target.files);
        const imageFiles = selectedFiles.filter((file) =>
          file.type.startsWith("image/")
        );
        setFiles((prev) => [...prev, ...imageFiles].slice(0, maxFiles));
      }
    },
    [maxFiles]
  );

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${
          isDragging ? "border-primary bg-primary/10" : "border-gray-300"
        } ${files.length >= maxFiles ? "border-green-500" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileInput}
        />
        <div className="flex items-center space-x-4">
          <Upload className="w-10 h-10 text-gray-400 flex-shrink-0" />
          <div className="text-left">
            <p className="text-lg font-medium mb-2">
              Sleep je foto&apos;s hierheen
            </p>
            <p className="text-sm text-muted-foreground">
              Upload tenminste {maxFiles} foto&apos;s
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {files.length} van {maxFiles} foto&apos;s geüpload
            </p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          {files.map((file, index) => (
            <div key={index} className="relative group">
              <Image
                src={URL.createObjectURL(file)}
                alt={`Uploaded image ${index + 1}`}
                width={200}
                height={200}
                className="w-full h-40 object-cover rounded-lg"
              />
              <Button
                label=""
                icon
                IconName="X"
                onClick={(e: any) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity !px-0 !pl-2"
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center space-x-2 text-sm text-muted-foreground">
        <ImageIcon className="w-4 h-4" />
        <span>Ondersteunde formaten: JPG, PNG</span>
      </div>

      {files.length >= maxFiles && (
        <div className="mt-2 flex items-center space-x-2 text-sm text-green-600">
          <AlertCircle className="w-4 h-4" />
          <span>Je hebt het maximale aantal foto&apos;s geüpload!</span>
        </div>
      )}
    </div>
  );
}
