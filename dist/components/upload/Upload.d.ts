import React from "react";
export interface UploadProps {
    action: string;
    onProcess?: (percentage: number, file: File) => void;
    onSuccess?: (res: any, file: File) => void;
    onFail?: (err: any, file: File) => void;
    onBeforeUpload?: (file: File) => boolean | Promise<File>;
    onChange?: (file: File) => void;
    onRemove?: (file: UploadStateProps) => void;
    defaultFile?: UploadStateProps[];
    accept?: string;
    multiple?: boolean;
    children?: React.ReactNode;
    drag: boolean;
}
export type fileStatus = "ready" | "uploading" | "success" | "error";
export interface UploadStateProps {
    uid: string;
    size: number;
    name: string;
    status: fileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    err?: any;
}
export declare const Upload: React.FC<UploadProps>;
export default Upload;
