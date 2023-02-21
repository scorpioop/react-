import React from "react";
import { UploadStateProps } from "./Upload";
export interface FileListProps {
    defaultFile?: UploadStateProps[];
    onRemove: (file: UploadStateProps) => void;
    filesStatusArray: UploadStateProps[];
}
declare const FileList: React.FC<FileListProps>;
export default FileList;
