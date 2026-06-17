import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { UploadCloud, FileSpreadsheet, FileText, CheckCircle2, ShieldCheck, ArrowRight, Loader2, RefreshCw } from 'lucide-react';

export const UploadZone: React.FC = () => {
  const { 
    t, 
    triggerUploadAnalysis, 
    isProcessing, 
    uploadProgress, 
    uploadingFile,
    addToast 
  } = useApp();

  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      validateAndProcess(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcess(e.target.files[0]);
    }
  };

  const validateAndProcess = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    const allowedExtensions = ['pdf', 'csv', 'xlsx', 'xls'];
    
    if (extension && allowedExtensions.includes(extension)) {
      triggerUploadAnalysis(file);
    } else {
      addToast(t('unsupportedFile'), 'danger');
    }
  };

  const handleClick = () => {
    if (fileInputRef.current && !isProcessing) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-8 flex flex-col items-center justify-center min-h-[420px] shadow-xs relative overflow-hidden">
      {/* Absolute high-tech security watermarks */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-60">
        <ShieldCheck size={13} className="text-[#00C48C]" />
        <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">SSL Ingestion Secured</span>
      </div>

      {!isProcessing ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          className={`w-full max-w-2xl border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer select-none transition-all duration-300 ${
            isDragOver 
              ? 'border-accent bg-emerald-50/20 scale-[1.01] shadow-md' 
              : 'border-slate-200 hover:border-accent hover:bg-slate-50 shadow-xs'
          }`}
        >
          {/* Hidden HTML input file */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept=".pdf,.csv,.xlsx,.xls"
            className="hidden"
          />

          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-[#0B3C5D] mb-5 border border-slate-100 group shadow-xs">
            <UploadCloud 
              size={32} 
              className={`transform transition-transform duration-300 group-hover:-translate-y-1 ${
                isDragOver ? 'translate-y-[-4px] text-accent' : 'text-primary'
              }`} 
            />
          </div>

          <h3 className="text-sm font-bold text-slate-800 tracking-tight font-sans transition-colors duration-200">
            {t('dragAndDropTitle')}
          </h3>
          
          <p className="text-[11px] text-slate-400 max-w-md mt-1.5 font-medium leading-relaxed">
            {t('dragAndDropSubtitle')}
          </p>

          <button
            type="button"
            className="mt-6 px-5 py-2.5 bg-primary text-[#00C48C] font-bold text-xs rounded-xl shadow-xs hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            {t('uploadButton')}
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md space-y-6">
          {/* Ingress Progress Section */}
          <div className="flex flex-col items-center justify-center text-center">
            {/* Animated Loading Spin wheel */}
            <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 border border-slate-100 mb-4 shadow-xs">
              <Loader2 className="animate-spin text-accent" size={24} />
              {uploadingFile?.name.includes('csv') ? (
                <FileSpreadsheet size={16} className="text-blue-500 absolute" />
              ) : (
                <FileText size={16} className="text-rose-500 absolute" />
              )}
            </div>

            <h4 className="text-sm font-bold text-slate-800 tracking-tight">
              Ingesting: <span className="font-mono text-xs font-semibold text-slate-500">{uploadingFile?.name}</span>
            </h4>
            
            <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">
              {uploadProgress < 40 
                ? t('analyzingFile') 
                : uploadProgress < 90 
                  ? t('extractingTransactions') 
                  : t('readyToRedirect')
              }
            </p>
          </div>

          {/* Progress indicators wrapper */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[11px] font-bold text-slate-500">
              <span className="flex items-center gap-1.5 font-sans">
                <RefreshCw size={11} className="animate-spin text-accent" />
                OCR Mapping Strategy
              </span>
              <span className="font-mono">{uploadProgress}%</span>
            </div>
            
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50">
              <div 
                className="h-full bg-accent transition-all duration-150 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            
            {/* Simulation detailed stages */}
            <div className="grid grid-cols-3 gap-2 text-[9px] font-bold uppercase tracking-wider text-slate-400 pt-2 text-center">
              <div className={uploadProgress >= 15 ? 'text-primary' : ''}>1. Parse Header</div>
              <div className={uploadProgress >= 50 ? 'text-primary' : ''}>2. OCR Mapping</div>
              <div className={uploadProgress >= 90 ? 'text-accent' : ''}>3. Risk Scoring</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
