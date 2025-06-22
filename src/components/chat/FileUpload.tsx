
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Paperclip } from 'lucide-react';

interface FileUploadProps {
  userType: 'basic' | 'premium';
  onFileSelect: (files: File[]) => void;
  selectedFiles: File[];
  onRemoveFile: (index: number) => void;
}

export const FileUpload = ({ userType, onFileSelect, selectedFiles, onRemoveFile }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      onFileSelect(files);
    }
    // Reset input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = () => {
    if (userType === 'basic') {
      alert('Загрузка файлов доступна только в премиум версии');
      return;
    }
    fileInputRef.current?.click();
  };

  return (
    <div className="inline-block">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
        accept="*/*"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleButtonClick}
        className="text-muted-foreground hover:text-foreground hover:bg-accent smooth-transition rounded-xl"
        disabled={userType === 'basic'}
      >
        <Paperclip className="w-4 h-4" />
      </Button>
    </div>
  );
};
