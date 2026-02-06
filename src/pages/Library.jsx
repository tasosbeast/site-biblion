import React, { useState } from "react";
import BookCard from "../components/BookCard";
import Modal from "../components/Modal";
import ProgressModal from "../components/ProgressModal";

const Library = ({ myLibrary, onUpdateStatus, onRemove, onUpdateProgress }) => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [progressModalBook, setProgressModalBook] = useState(null);

  // Filter books based on active tab and search query
  const filteredBooks = myLibrary.filter((book) => {
    const matchesFilter = filter === "all" || book.status === filter;
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <main className="container profile-page">
      <section className="library-header">
        <h2 className="section-title">Η Βιβλιοθήκη μου</h2>

        {/* Tabs */}
        <div className="library-tabs">
          {["all", "want", "reading", "read"].map((status) => (
            <button
              key={status}
              className={`tab-btn ${filter === status ? "active" : ""}`}
              onClick={() => setFilter(status)}
            >
              {status === "all" && "Όλα"}
              {status === "want" && "Θέλω να διαβάσω"}
              {status === "reading" && "Διαβάζω τώρα"}
              {status === "read" && "Διαβασμένα"}
            </button>
          ))}
        </div>

        {/* Local Library Search */}
        <div className="library-search">
          <input
            type="text"
            placeholder="Αναζήτηση στα βιβλία μου..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Content Grid */}
      <section className="library-content">
        <div className="book-grid">
          {myLibrary.length === 0 ? (
            <div
              style={{
                gridColumn: "1/-1",
                textAlign: "center",
                padding: "3rem",
              }}
            >
              <p style={{ fontSize: "1.2rem", color: "#666" }}>
                Η βιβλιοθήκη σου είναι άδεια.
              </p>
              <p style={{ color: "#888" }}>
                Πήγαινε στη "Ροή" για να προσθέσεις βιβλία!
              </p>
            </div>
          ) : filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book.id} style={{ position: "relative" }}>
                <BookCard
                  book={book}
                  isLibraryView={true}
                  onUpdateStatus={onUpdateStatus}
                  onRemove={onRemove}
                  onClick={() => setSelectedBook(book)}
                />
                {/* Show progress button for "reading" books */}
                {book.status === "reading" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setProgressModalBook(book);
                    }}
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      padding: "6px 12px",
                      background: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      zIndex: 10,
                      boxShadow: "0 2px 8px rgba(139, 92, 246, 0.3)",
                    }}
                  >
                    📊 Πρόοδος
                  </button>
                )}
              </div>
            ))
          ) : (
            <p
              style={{ gridColumn: "1/-1", textAlign: "center", color: "#888" }}
            >
              Δεν βρέθηκαν βιβλία με αυτά τα κριτήρια.
            </p>
          )}
        </div>
      </section>

      <Modal
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
      />

      <ProgressModal
        book={progressModalBook}
        isOpen={!!progressModalBook}
        onClose={() => setProgressModalBook(null)}
        onUpdate={onUpdateProgress}
      />
    </main>
  );
};

export default Library;
