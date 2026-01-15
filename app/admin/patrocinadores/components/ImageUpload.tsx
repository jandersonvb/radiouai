"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Imagem" }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setError(null);

    // Validar tipo
    if (!file.type.startsWith("image/")) {
      setError("Por favor, selecione uma imagem válida.");
      return;
    }

    // Validar tamanho (max 2MB para base64)
    if (file.size > 2 * 1024 * 1024) {
      setError("Imagem muito grande. Máximo: 2MB");
      return;
    }

    // Converter para base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onChange(result);
    };
    reader.onerror = () => {
      setError("Erro ao ler o arquivo.");
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleClear = () => {
    onChange("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const isBase64 = value.startsWith("data:image");
  const hasValue = value && value.length > 0;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-neutral-300">
          {label}
        </label>
      )}

      {hasValue ? (
        <div className="relative">
          <div className="relative w-full h-48 rounded-xl overflow-hidden bg-neutral-800 border border-neutral-700">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-contain p-2"
            />
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 p-2 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          {isBase64 && (
            <span className="absolute bottom-2 left-2 px-2 py-1 text-xs bg-black/50 text-white rounded">
              Base64
            </span>
          )}
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          className={`relative w-full h-48 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${
            isDragging
              ? "border-red-500 bg-red-500/10"
              : "border-neutral-700 bg-neutral-800/50 hover:border-neutral-600"
          }`}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div
              className={`p-4 rounded-full ${
                isDragging ? "bg-red-500/20" : "bg-neutral-800"
              }`}
            >
              {isDragging ? (
                <Upload className="w-8 h-8 text-red-400" />
              ) : (
                <ImageIcon className="w-8 h-8 text-neutral-500" />
              )}
            </div>
            <div className="text-center">
              <p className="text-neutral-400 text-sm">
                {isDragging
                  ? "Solte a imagem aqui"
                  : "Arraste uma imagem ou clique para selecionar"}
              </p>
              <p className="text-neutral-500 text-xs mt-1">
                PNG, JPG ou WebP (max 2MB)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* URL Input alternative */}
      {!hasValue && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-neutral-500">ou cole uma URL:</span>
          <input
            type="text"
            placeholder="https://..."
            className="flex-1 px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600"
            onBlur={(e) => {
              if (e.target.value.trim()) {
                onChange(e.target.value.trim());
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const input = e.target as HTMLInputElement;
                if (input.value.trim()) {
                  onChange(input.value.trim());
                }
              }
            }}
          />
        </div>
      )}

      {error && <p className="text-red-400 text-xs">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
}
