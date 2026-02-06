import React from "react";
import { Heart, Plus, Trash2 } from "lucide-react";

const BookCard = ({
  book,
  onClick,
  isLibraryView,
  onAdd,
  onUpdateStatus,
  onRemove,
}) => {
  // Generate stars string
  const stars =
    "★".repeat(Math.floor(book.rating)) +
    "☆".repeat(5 - Math.floor(book.rating));

  // Status Logic for Library View
  let statusSelector = null;
  let removeButton = null;

  if (isLibraryView) {
    // Status Dropdown
    const getStatusStyle = (status) => {
      switch (status) {
        case "read":
          return {
            background: "#e8f5e9",
            color: "#2e7d32",
            border: "1px solid #c8e6c9",
          };
        case "reading":
          return {
            background: "#e3f2fd",
            color: "#1565c0",
            border: "1px solid #bbdefb",
          };
        default:
          return {
            background: "#fff3e0",
            color: "#ef6c00",
            border: "1px solid #ffe0b2",
          };
      }
    };

    const currentStyle = getStatusStyle(book.status);

    statusSelector = (
      <div
        className="status-selector-container"
        onClick={(e) => e.stopPropagation()}
        style={{ position: "absolute", top: "10px", right: "10px", zIndex: 5 }}
      >
        <select
          value={book.status}
          onChange={(e) => onUpdateStatus(book.id, e.target.value)}
          style={{
            ...currentStyle,
            padding: "4px 8px",
            borderRadius: "20px",
            fontSize: "0.75rem",
            fontWeight: 600,
            outline: "none",
            cursor: "pointer",
            appearance: "none",
            textAlign: "center",
          }}
        >
          <option value="want">Στη Λίστα</option>
          <option value="reading">Διαβάζω</option>
          <option value="read">Διαβασμένο</option>
        </select>
      </div>
    );

    // Remove Button (Trash Icon)
    removeButton = (
      <button
        className="btn-remove"
        onClick={(e) => {
          e.stopPropagation();
          if (onRemove) onRemove(book.id);
        }}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 5,
          background: "rgba(255, 255, 255, 0.9)",
          border: "none",
          borderRadius: "50%",
          width: "32px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#e74c3c",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
        title="Διαγραφή από τη βιβλιοθήκη"
      >
        <Trash2 size={16} />
      </button>
    );
  }

  return (
    <div
      className="book-card"
      onClick={() => onClick(book)}
      style={{ position: "relative" }}
    >
      {removeButton}
      <div className="book-cover-container">
        <img src={book.image} alt={book.title} className="book-cover" />
        {isLibraryView ? (
          statusSelector
        ) : (
          <span className="book-category">{book.category}</span>
        )}
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>

        <div className="book-social-stats">
          <div className="rating">
            <span className="stars">{stars}</span>
            {!isLibraryView && (
              <span className="rating-num">{book.rating}</span>
            )}
          </div>
          {!isLibraryView && (
            <span className="reviews-count">{book.reviews} κριτικές</span>
          )}
        </div>

        <div className="action-buttons">
          {!isLibraryView && (
            <button
              className="btn-action btn-want"
              onClick={(e) => {
                e.stopPropagation();
                if (onAdd) onAdd();
              }}
              title="Προσθήκη στη βιβλιοθήκη"
            >
              <Plus size={16} style={{ marginRight: "4px" }} />
              Λίστα
            </button>
          )}
          <button
            className="btn-action btn-like"
            onClick={(e) => {
              e.stopPropagation();
              alert("Like! (Demo)");
            }}
          >
            <Heart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
