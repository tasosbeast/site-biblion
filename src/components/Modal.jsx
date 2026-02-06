import React from "react";
import { X } from "lucide-react";

const Modal = ({ book, isOpen, onClose }) => {
  if (!isOpen || !book) return null;

  return (
    <div className={`modal-overlay`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-modal" onClick={onClose}>
          <X />
        </span>
        <div className="modal-body">
          <div className="modal-image-container">
            <img src={book.image} alt={book.title} />
          </div>
          <div className="modal-info">
            <h2
              id="modal-title"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "2rem",
                marginBottom: "0.5rem",
                color: "#2c3e50",
              }}
            >
              {book.title}
            </h2>
            <h4
              id="modal-author"
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: "1.1rem",
                color: "#666",
                marginBottom: "1.5rem",
                fontWeight: 500,
              }}
            >
              {book.author}
            </h4>
            <div className="modal-meta">
              <span
                style={{
                  color: "#f1c40f",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                }}
              >
                ★ {book.rating} / 5
              </span>
              <span
                id="modal-category"
                style={{
                  background: "#eef2f7",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "0.85rem",
                  color: "#555",
                  fontWeight: 600,
                }}
              >
                {book.category}
              </span>
            </div>
            <p
              id="modal-description"
              style={{
                lineHeight: 1.8,
                color: "#444",
                marginBottom: "2.5rem",
                fontSize: "1rem",
              }}
            >
              {book.description}
            </p>

            <div className="modal-reviews-section">
              <h3>Τι λένε οι αναγνώστες</h3>
              <div id="modal-reviews-list">
                {book.userReviews && book.userReviews.length > 0 ? (
                  book.userReviews.map((review, idx) => (
                    <div key={idx} className="review-item">
                      <div className="review-header">
                        <span className="review-user">{review.user}</span>
                      </div>
                      <div className="review-text">"{review.text}"</div>
                    </div>
                  ))
                ) : (
                  <p>Δεν υπάρχουν ακόμη κριτικές.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
