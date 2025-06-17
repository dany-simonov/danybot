
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Paperclip, X, FileText, Image, File } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface FileUploadProps {
  userType: 'basic' | 'premium';
  onFileSelect: (files: File[]) => void;
  selectedFiles: File[];
  onRemoveFile: (index: number) => void;
}

export const FileUpload = ({ userType, onFileSelect, selectedFiles, onRemoveFile }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onFileSelect(files);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-4 h-4 text-neon-purple" />;
    } else if (file.type.includes('pdf') || file.type.includes('document')) {
      return <FileText className="w-4 h-4 text-neon-cyan" />;
    }
    return <File className="w-4 h-4 text-neon-green" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (userType === 'basic') {
    return (
      <Button 
        variant="ghost" 
        size="sm"
        disabled
        className="text-gray-500 cursor-not-allowed"
        title="Загрузка файлов доступна только в премиум версии"
      >
        <Paperclip className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.gif,.mp3,.wav,.mp4"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        className="text-neon-cyan hover:bg-neon-cyan/10 neon-border"
        title="Загрузить файлы (PDF, изображения, аудио, видео)"
      >
        <Paperclip className="w-4 h-4" />
      </Button>

      {selectedFiles.length > 0 && (
        <div className="max-w-md space-y-2">
          {selectedFiles.map((file, index) => (
            <Card key={index} className="bg-black/50 neon-border p-2 flex items-center gap-2">
              {getFileIcon(file)}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate font-mono">{file.name}</p>
                <p className="text-xs text-gray-400 font-mono">{formatFileSize(file.size)}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveFile(index)}
                className="text-red-400 hover:bg-red-400/10 h-6 w-6 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
