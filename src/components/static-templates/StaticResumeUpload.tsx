/**
 * StaticResumeUpload
 * Step 5: Resume/CV upload with drag-and-drop
 */

import React, { useState, useRef } from 'react';
import { FileText, Upload, ArrowRight, ArrowLeft, Shield, Lock, CheckCircle, X, Lightbulb, File } from 'lucide-react';
import { StaticTemplateProps } from '@/types/onboarding';

const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const StaticResumeUpload: React.FC<StaticTemplateProps> = ({
    onNext,
    onBack,
    onSkip,
    onComplete,
    userData,
    setUserData
}) => {
    const [file, setFile] = useState<File | null>(userData.resumeFile || null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = (file: File): boolean => {
        const extension = file.name.split('.').pop()?.toLowerCase();

        if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
            setError('Please upload a PDF, DOC, or DOCX file');
            return false;
        }

        if (file.size > MAX_FILE_SIZE) {
            setError('File size must be less than 5MB');
            return false;
        }

        setError(null);
        return true;
    };

    const handleFile = (selectedFile: File) => {
        if (validateFile(selectedFile)) {
            setFile(selectedFile);
            setUserData({
                resumeFile: selectedFile,
                resumeFileName: selectedFile.name,
                resumeFileSize: selectedFile.size
            });
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            handleFile(droppedFile);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            handleFile(selectedFile);
        }
    };

    const handleRemove = () => {
        setFile(null);
        setUserData({ resumeFile: undefined, resumeFileName: undefined, resumeFileSize: undefined });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const handleSubmit = () => {
        // Proceed to Skills Assessment step
        onNext();
    };

    return (
        <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20">
                <FileText size={14} className="text-primary" />
                <span className="text-sm font-medium text-white">Upload CV</span>
            </div>

            {/* Title */}
            <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Upload Your Resume
                </h1>
                <p className="text-white/60">
                    Your resume helps us understand your background and match you with the right opportunities.
                </p>
            </div>

            {/* Upload Zone */}
            <div
                className={`
          backdrop-blur-md border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer
          ${isDragging
                        ? 'bg-primary/10 border-primary'
                        : file
                            ? 'bg-secondary/10 border-secondary/50'
                            : 'bg-white/5 border-white/20 hover:border-white/40 hover:bg-white/10'
                    }
        `}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => !file && fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileSelect}
                    className="hidden"
                />

                {file ? (
                    // File uploaded state
                    <div className="space-y-4">
                        <div className="w-16 h-16 mx-auto bg-secondary/20 rounded-2xl flex items-center justify-center">
                            <File size={32} className="text-secondary" />
                        </div>

                        <div className="flex items-center justify-center gap-3">
                            <CheckCircle size={20} className="text-secondary" />
                            <span className="text-lg font-medium text-white">{file.name}</span>
                            <span className="text-sm text-white/50">({formatFileSize(file.size)})</span>
                        </div>

                        <button
                            onClick={(e) => { e.stopPropagation(); handleRemove(); }}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors"
                        >
                            <X size={16} />
                            Remove
                        </button>
                    </div>
                ) : (
                    // Empty state
                    <div className="space-y-4">
                        <div className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center">
                            <Upload size={32} className="text-white/50" />
                        </div>

                        <div>
                            <p className="text-lg text-white/70">
                                Drag and drop your resume here
                            </p>
                            <p className="text-white/40 mt-1">or</p>
                        </div>

                        <button
                            type="button"
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white
                hover:bg-white/20 transition-all"
                        >
                            <Upload size={18} />
                            Browse Files
                        </button>

                        <p className="text-sm text-white/40">
                            Supported formats: PDF, DOC, DOCX (Max 5MB)
                        </p>
                    </div>
                )}

                {error && (
                    <p className="text-sm text-red-400 mt-4">{error}</p>
                )}
            </div>

            {/* Info Box */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <Lightbulb size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-white/70">
                    Your resume will be parsed to auto-fill your Skills Twin profile. You can always edit the details later.
                </p>
            </div>

            {/* Primary CTA */}
            <button
                onClick={handleSubmit}
                disabled={!file}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-black font-semibold rounded-xl
          hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
          disabled:hover:bg-primary"
            >
                Complete Setup
                <ArrowRight size={18} />
            </button>

            {/* Skip - More Visible */}
            {onSkip && (
                <button
                    onClick={onSkip}
                    className="w-full py-3 text-white/50 hover:text-white/70 transition-colors text-center border border-white/10 rounded-xl hover:bg-white/5"
                >
                    Skip for now
                </button>
            )}

            {/* Back Link */}
            {onBack && (
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-white/50 hover:text-white/70 transition-colors mx-auto"
                >
                    <ArrowLeft size={16} />
                    Back to Basic Information
                </button>
            )}

            {/* Footer Trust Badges */}
            <div className="flex items-center justify-center gap-6 pt-4 text-xs text-white/40">
                <div className="flex items-center gap-1.5">
                    <Lock size={12} />
                    <span>Encrypted</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Shield size={12} />
                    <span>Never shared without consent</span>
                </div>
            </div>
        </div>
    );
};

export default StaticResumeUpload;
