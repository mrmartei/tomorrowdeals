import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Edit2, Check, X } from 'lucide-react';

interface EditableTextProps {
  id: string;
  defaultText: string;
  className?: string;
  multiline?: boolean;
}

export const EditableText: React.FC<EditableTextProps> = ({ id, defaultText, className, multiline }) => {
  const { profile } = useAuth();
  const isAdmin = profile?.role === 'admin';
  
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(defaultText);
  const [tempText, setTempText] = useState(defaultText);

  useEffect(() => {
    const saved = localStorage.getItem(`editable_${id}`);
    if (saved) {
      setText(saved);
      setTempText(saved);
    }
  }, [id]);

  const handleSave = () => {
    setText(tempText);
    localStorage.setItem(`editable_${id}`, tempText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempText(text);
    setIsEditing(false);
  };

  if (!isAdmin) {
    return <span className={className}>{text}</span>;
  }

  if (isEditing) {
    return (
      <div className="relative inline-block w-full group">
        {multiline ? (
          <textarea
            value={tempText}
            onChange={(e) => setTempText(e.target.value)}
            className={`w-full bg-white border-2 border-brand-green rounded-lg p-2 focus:outline-none ${className}`}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={tempText}
            onChange={(e) => setTempText(e.target.value)}
            className={`w-full bg-white border-2 border-brand-green rounded-lg px-2 py-1 focus:outline-none ${className}`}
            autoFocus
          />
        )}
        <div className="absolute -top-8 right-0 flex gap-1 bg-white shadow-sm border border-gray-100 rounded-lg p-1 z-10">
          <button onClick={handleSave} className="p-1 text-green-500 hover:bg-green-50 rounded">
            <Check size={14} />
          </button>
          <button onClick={handleCancel} className="p-1 text-red-500 hover:bg-red-50 rounded">
            <X size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group inline-block">
      <span className={className}>{text}</span>
      <button 
        onClick={() => setIsEditing(true)}
        className="absolute -right-6 top-1/2 -translate-y-1/2 p-1 text-gray-300 hover:text-brand-green opacity-0 group-hover:opacity-100 transition-all"
      >
        <Edit2 size={12} />
      </button>
    </div>
  );
};
