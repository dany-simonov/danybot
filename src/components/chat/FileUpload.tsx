
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Paperclip, X } from 'lucide-react';

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

  if (selectedFiles.length === 0) {
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
  }

  return (
    <div className="mb-3">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
        accept="*/*"
      />
      
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedFiles.map((file, index) => (
          <Card key={index} className="flex items-center p-2 bg-muted/50 border-border">
            <Paperclip className="w-3 h-3 mr-2 text-muted-foreground" />
            <span className="text-xs text-foreground mr-2 max-w-32 truncate">
              {file.name}
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onRemoveFile(index)}
              className="w-4 h-4 p-0 hover:bg-destructive/20 text-destructive"
            >
              <X className="w-3 h-3" />
            </Button>
          </Card>
        ))}
      </div>
      
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleButtonClick}
        className="text-xs text-muted-foreground hover:text-foreground"
      >
        <Paperclip className="w-3 h-3 mr-1" />
        Добавить файлы
      </Button>
    </div>
  );
};
