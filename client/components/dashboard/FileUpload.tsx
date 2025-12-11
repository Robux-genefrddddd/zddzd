import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";

interface FileUploadProps {
  onFileSelected: (file: File) => void;
  uploading: boolean;
  theme: string;
}

export function FileUpload({ onFileSelected, uploading, theme }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFileSelected(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelected(files[0]);
    }
  };

  return (
    <div
      className="rounded-xl border-2 p-10 text-center transition-all"
      style={{
        backgroundColor: dragActive
          ? theme === "dark"
            ? "#1A2328"
            : "#F0F9FF"
          : theme === "dark"
            ? "#111214"
            : "#F9FAFB",
        borderColor: dragActive
          ? "#3B82F6"
          : theme === "dark"
            ? "#1F2124"
            : "#E5E7EB",
        borderStyle: "dashed",
      }}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        onChange={handleChange}
        disabled={uploading}
        className="hidden"
        accept="*/*"
      />

      <div className="flex flex-col items-center gap-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            backgroundColor:
              theme === "dark" ? "rgba(59, 130, 246, 0.1)" : "#DBEAFE",
          }}
        >
          <Upload
            className="w-8 h-8"
            style={{
              color: theme === "dark" ? "#60A5FA" : "#3B82F6",
            }}
          />
        </div>

        <div>
          <p
            className="font-semibold text-base"
            style={{
              color: theme === "dark" ? "#FFFFFF" : "#111827",
            }}
          >
            {dragActive ? "Drop your file here" : "Click to upload or drag and drop"}
          </p>
          <p
            className="text-sm mt-1"
            style={{
              color: theme === "dark" ? "#9CA3AF" : "#6B7280",
            }}
          >
            PNG, JPG, PDF or any file up to 100MB
          </p>
        </div>

        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="mt-2 px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          style={{
            backgroundColor: theme === "dark" ? "#1A2647" : "#DBEAFE",
            color: theme === "dark" ? "#60A5FA" : "#1E40AF",
          }}
        >
          {uploading ? "Uploading..." : "Browse Files"}
        </button>
      </div>
    </div>
  );
}
