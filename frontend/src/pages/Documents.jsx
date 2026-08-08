import { useEffect, useRef, useState } from "react";
import { UploadCloud, RefreshCcw, Trash2 } from "lucide-react";
import PageHeader from "../components/PageHeader";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import StatusBadge from "../components/StatusBadge";
import { getDocuments, uploadDocument } from "../services/api";

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [uploadError, setUploadError] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getDocuments();
      setDocuments(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error("Documents API error:", err);
      setError("Unable to connect to the TrustLens AI backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please select a PDF, DOCX, or TXT file.");
      return;
    }

    setSelectedFile(file);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadError("");
    setUploadSuccess("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please select a PDF, DOCX, or TXT file.");
      return;
    }

    setSelectedFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadError("");
    setUploadSuccess("");

    try {
      await uploadDocument(selectedFile);
      setUploadSuccess("Document uploaded successfully.");
      handleRemoveFile();
      await fetchDocuments();
    } catch (err) {
      console.error("Upload API error:", err);
      setUploadError(
        "Unable to upload document. The backend upload endpoint may not be available."
      );
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <main className="page-shell">
      <PageHeader
        eyebrow="DOCUMENT MANAGEMENT"
        title="Documents"
        description="Upload regulatory and organizational documents for AI-powered compliance analysis."
      />

      <section className="content-card upload-panel">
        <div className="card-header">
          <div>
            <h2>Upload a document</h2>
            <p>
              TrustLens will analyze the document and extract requirements,
              evidence, risks, and compliance insights.
            </p>
          </div>
        </div>

        {!selectedFile ? (
          <div
            className="upload-zone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleBrowseClick}
          >
            <div className="upload-icon">
              <UploadCloud size={28} />
            </div>
            <strong>Drop your document here</strong>
            <p>
              or <span className="browse-link">browse files</span> from your
              computer
            </p>
            <small>Supported formats: PDF, DOCX, TXT</small>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleFileSelect}
              hidden
            />
          </div>
        ) : (
          <div className="selected-file">
            <div className="file-info">
              <div className="file-icon">📄</div>
              <div>
                <h3>{selectedFile.name}</h3>
                <p>{formatFileSize(selectedFile.size)}</p>
              </div>
            </div>
            <button type="button" className="remove-file" onClick={handleRemoveFile}>
              <Trash2 size={18} />
            </button>
          </div>
        )}

        {selectedFile && (
          <div className="selected-file-actions">
            <div className="file-actions">
              <span className="ready-status">✓ Ready for upload</span>
              <button
                type="button"
                className="primary-button"
                disabled={uploading}
                onClick={handleUpload}
              >
                {uploading ? "Uploading..." : "Upload document"}
              </button>
            </div>
            {uploadSuccess && <p className="success-message">{uploadSuccess}</p>}
            {uploadError && <p className="error-message">{uploadError}</p>}
          </div>
        )}
      </section>

      <section className="content-card documents-list-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">DOCUMENT LIBRARY</p>
            <h2>Documents from Backend</h2>
            <p>Documents currently available in TrustLens.</p>
          </div>
          <button type="button" className="secondary-button" onClick={fetchDocuments}>
            <RefreshCcw size={16} /> Refresh
          </button>
        </div>

        {loading ? (
          <LoadingState message="Loading documents..." />
        ) : null}

        {!loading && error ? <ErrorState message={error} /> : null}

        {!loading && !error && documents.length === 0 ? (
          <EmptyState
            title="No documents yet"
            message="Upload a regulatory or organizational document to get started."
          />
        ) : null}

        {!loading && !error && documents.length > 0 ? (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Status</th>
                  <th>Uploaded</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((document, index) => (
                  <tr key={document.id ?? `${document.name ?? document.title ?? index}`}>
                    <td>
                      <div className="document-name">
                        <div className="document-icon">📄</div>
                        <div>
                          <strong>
                            {document.name || document.title || document.filename || "Untitled document"}
                          </strong>
                          {document.category && <small>{document.category}</small>}
                        </div>
                      </div>
                    </td>
                    <td>
                      <StatusBadge status={document.status || "Available"} />
                    </td>
                    <td>{document.uploaded_at || document.created_at || document.date || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>
    </main>
  );
}

export default Documents;