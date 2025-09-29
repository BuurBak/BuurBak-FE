"use client";

import type React from "react";

import { AlertCircle, ImageIcon, Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Button from "./Button";

type FileUploadProps = {
  onFilesChange: (files: File[]) => void;
  maxFileSize?: number; // in bytes, default 5MB
  maxFiles?: number;
};

type FileError = {
  fileName: string;
  error: string;
};

export default function FileUpload({
  onFilesChange,
  maxFiles = 5,
  maxFileSize = maxFiles * 1024 * 1024, // 5MB default
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [fileErrors, setFileErrors] = useState<FileError[]>([]);

  useEffect(() => {
    onFilesChange(files);
  }, [files, onFilesChange]);

  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  }, []);

  const validateFiles = useCallback(
    (filesToValidate: File[]): { validFiles: File[]; errors: FileError[] } => {
      const validFiles: File[] = [];
      const errors: FileError[] = [];

      filesToValidate.forEach((file) => {
        if (!file.type.startsWith("image/")) {
          errors.push({
            fileName: file.name,
            error: "Alleen afbeeldingen zijn toegestaan",
          });
        } else if (file.size > maxFileSize) {
          errors.push({
            fileName: file.name,
            error: `Bestand is te groot (${formatFileSize(
              file.size
            )}). Maximum: ${formatFileSize(maxFileSize)}`,
          });
        } else {
          validFiles.push(file);
        }
      });

      return { validFiles, errors };
    },
    [maxFileSize, formatFileSize]
  );

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
      const { validFiles, errors } = validateFiles(droppedFiles);

      setFileErrors(errors);
      setFiles((prev) => [...prev, ...validFiles].slice(0, maxFiles));
    },
    [maxFiles, validateFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const selectedFiles = Array.from(e.target.files);
        const { validFiles, errors } = validateFiles(selectedFiles);

        setFileErrors(errors);
        setFiles((prev) => [...prev, ...validFiles].slice(0, maxFiles));
      }
    },
    [maxFiles, validateFiles]
  );

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearErrors = useCallback(() => {
    setFileErrors([]);
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
            <p className="text-xs text-muted-foreground mt-1">
              {files.length} van {maxFiles} foto&apos;s geüpload
            </p>
            <p className="text-xs text-muted-foreground">
              Maximum bestandsgrootte: {formatFileSize(maxFileSize)}
            </p>
          </div>
        </div>
      </div>

      {/* Error Messages */}
      {fileErrors.length > 0 && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-red-800 mb-2">
                  Sommige bestanden konden niet worden geüpload:
                </h4>
                <ul className="text-sm text-red-700 space-y-1">
                  {fileErrors.map((error, index) => (
                    <li key={index}>
                      <strong>{error.fileName}:</strong> {error.error}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              onClick={clearErrors}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          {files.map((file, index) => (
            <div key={index} className="relative group">
              <Image
                src={URL.createObjectURL(file) || "/placeholder.svg"}
                alt={`Uploaded image ${index + 1}`}
                width={200}
                height={200}
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                {formatFileSize(file.size)}
              </div>
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
        <span>
          Ondersteunde formaten: JPG, PNG • Max: {formatFileSize(maxFileSize)}
        </span>
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
