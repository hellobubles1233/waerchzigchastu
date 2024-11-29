import * as FaIcons from "react-icons/fa";
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

interface DriveItem {
  id: string;
  name: string;
  size?: number;
  lastModifiedDateTime: string;
  folder?: any;
  webUrl: string;
}

interface FileListProps {
  files: DriveItem[];
  onFolderClick: (folderId: string) => void;
  onDownload: (fileId: string) => void;
  onCreateFolder: () => void;
  isLoading: boolean;
}

export const FileList = ({
  files,
  onFolderClick,
  onDownload,
  onCreateFolder,
  isLoading,
}: FileListProps) => {
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '-';
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400">Laden...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Meine Dateien</h2>
        <button
          onClick={onCreateFolder}
          className="flex items-center gap-2 px-3 py-1 text-sm text-primary hover:bg-gray-800 rounded-md"
        >
          <FaIcons.FaFolderPlus />
          Neuer Ordner
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Geändert
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Größe
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Aktion
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {files.map((file) => (
              <tr key={file.id} className="hover:bg-gray-800">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    {file.folder ? (
                      <FaIcons.FaFolder className="text-primary mr-2" />
                    ) : (
                      <FaIcons.FaFile className="text-gray-400 mr-2" />
                    )}
                    <span
                      className={`text-sm ${
                        file.folder ? 'text-white cursor-pointer hover:text-primary' : 'text-gray-300'
                      }`}
                      onClick={() => file.folder && onFolderClick(file.id)}
                    >
                      {file.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                  {format(new Date(file.lastModifiedDateTime), 'dd.MM.yyyy HH:mm', {
                    locale: de,
                  })}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                  {formatFileSize(file.size)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                  {!file.folder && (
                    <button
                      onClick={() => onDownload(file.id)}
                      className="text-primary hover:text-primary/80"
                    >
                      <FaIcons.FaDownload />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};