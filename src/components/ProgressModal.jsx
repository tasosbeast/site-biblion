import React, { useState, useEffect } from "react";
import { X, BookOpen } from "lucide-react";

const ProgressModal = ({ book, isOpen, onClose, onUpdate }) => {
  const [currentPage, setCurrentPage] = useState("");
  const totalPages = book?.totalPages || book?.pageCount || 300; // Use API data or fallback

  useEffect(() => {
    if (book) {
      // Only set if there's actual progress, otherwise leave empty
      setCurrentPage(book.currentPage > 0 ? book.currentPage : "");
    }
  }, [book]);

  if (!isOpen || !book) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const pageNum = parseInt(currentPage) || 0;
    onUpdate(book.id, {
      currentPage: pageNum,
      totalPages: totalPages, // Save the total from API
    });
    onClose();
  };

  const pageNum = parseInt(currentPage) || 0;
  const progress =
    totalPages > 0 ? Math.round((pageNum / totalPages) * 100) : 0;
  const pagesLeft = totalPages - pageNum;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "450px",
          background: "white",
          borderRadius: "20px",
          padding: "0",
          overflowY: "auto",
          maxHeight: "90vh",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        {/* Header with gradient */}
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "2rem",
            color: "white",
            position: "relative",
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "white",
            }}
          >
            <X size={20} />
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <BookOpen size={32} />
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "1.5rem",
                  fontWeight: 700,
                }}
              >
                Πρόοδος Ανάγνωσης
              </h2>
            </div>
          </div>

          <div style={{ opacity: 0.9 }}>
            <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600 }}>
              {book.title}
            </p>
            <p
              style={{
                margin: "0.25rem 0 0 0",
                fontSize: "0.9rem",
                opacity: 0.8,
              }}
            >
              {book.author}
            </p>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
          {/* Current Page Input */}
          <div style={{ marginBottom: "2rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.75rem",
                fontWeight: 600,
                color: "#333",
                fontSize: "0.95rem",
              }}
            >
              Σε ποια σελίδα βρίσκεσαι;
            </label>
            <input
              type="number"
              min="0"
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "") {
                  setCurrentPage("");
                } else {
                  // Parse to number to remove leading zeros, but keep as string for input
                  const num = Math.min(parseInt(val, 10), totalPages);
                  setCurrentPage(num.toString());
                }
              }}
              placeholder="π.χ. 145"
              style={{
                width: "100%",
                padding: "1rem",
                border: "2px solid #e0e0e0",
                borderRadius: "12px",
                fontSize: "1.2rem",
                fontWeight: 600,
                outline: "none",
                transition: "border-color 0.2s",
                textAlign: "center",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
              required
              autoFocus
            />
            <p
              style={{
                margin: "0.5rem 0 0 0",
                fontSize: "0.85rem",
                color: "#888",
                textAlign: "center",
              }}
            >
              από {totalPages} σελίδες συνολικά
            </p>
          </div>

          {/* Progress Visualization */}
          <div
            style={{
              background: "#f8f9fa",
              borderRadius: "16px",
              padding: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{ fontWeight: 600, color: "#555", fontSize: "0.9rem" }}
              >
                Πρόοδος
              </span>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {progress}%
              </span>
            </div>

            <div
              style={{
                width: "100%",
                height: "14px",
                background: "#e0e0e0",
                borderRadius: "10px",
                overflow: "hidden",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #667eea, #764ba2)",
                  transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  borderRadius: "10px",
                }}
              ></div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.85rem",
                color: "#666",
              }}
            >
              <span>📖 {pageNum} διαβασμένες</span>
              <span>📚 {pagesLeft} απομένουν</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "1rem", paddingBottom: "1rem" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: "1rem",
                border: "2px solid #e0e0e0",
                background: "white",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "1rem",
                color: "#666",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#f5f5f5")}
              onMouseLeave={(e) => (e.target.style.background = "white")}
            >
              Ακύρωση
            </button>
            <button
              type="submit"
              style={{
                flex: 2,
                padding: "1rem",
                border: "none",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "1rem",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow =
                  "0 6px 20px rgba(102, 126, 234, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow =
                  "0 4px 15px rgba(102, 126, 234, 0.4)";
              }}
            >
              💾 Αποθήκευση
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProgressModal;
