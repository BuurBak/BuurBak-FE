"use client";

import { CheckCircle, ImageIcon, Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "./Button";
import Dropzone, { FileRejection } from "react-dropzone";

type FileUploadProps = {
  onFilesChange: (files: File[]) => void;
};

export default function TrailerImagesUpload({ onFilesChange }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const amountOfImages = 5;
  const maxFileSize = 1024 * 1024

  useEffect(() => {
    onFilesChange(files);
  }, [files]);

  const removeFile = (index: number) => {
    setFiles((files) => files.filter((_, i) => i !== index));
  };

  const addFiles = (acceptedFiles: File[]) => {
    setFiles((files) => files.concat(acceptedFiles));
  };

  const onFileRejections = (fileRejections: FileRejection[]) => { fileRejections.map((rejection) => console.log(rejection)) }

  return (
    <div className="w-full">
      {files.length < amountOfImages ? (
        <Dropzone onDropRejected={onFileRejections} maxSize={maxFileSize} onDrop={addFiles} maxFiles={5} accept={{ 'image/jpeg': [], 'image/png': [] }}>
          {({ getRootProps, getInputProps }) => (
            <section className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${files.length >= amountOfImages ? "border-green-500" : ""}`}>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="flex items-center space-x-4">
                  <Upload className="w-10 h-10 text-gray-400 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-lg font-medium mb-2">
                      Sleep je foto's hierheen
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {files.length} van {amountOfImages} foto's geüpload
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </Dropzone>
      ) : (
        <div className="mt-2 flex items-center space-x-2 text-sm text-green-600">
          <CheckCircle className="w-4 h-4" />
          <span>Foto's uploaden gelukt!</span>
        </div>
      )}

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

      <div className="flex text-sm items-center gap-1">
        <ImageIcon className="w-4 h-4" />
        <span>Maximale bestandsgrootte 1MB</span>
        <span>Ondersteunde formaten: JPG, PNG</span>
      </div>
    </div>
  );
}