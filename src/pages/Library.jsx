import React, { useState } from "react";
import BookCard from "../components/BookCard";
import Modal from "../components/Modal";

const Library = ({ myLibrary, onUpdateStatus, onRemove }) => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  // Filter books based on active tab and search query
  const filteredBooks = myLibrary.filter((book) => {
    // Filter by status (Want to Read, Reading, Read)
    const matchesFilter = filter === "all" || book.status === filter;

    // Filter by text search
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
              <BookCard
                key={book.id}
                book={book}
                isLibraryView={true}
                onUpdateStatus={onUpdateStatus}
                onRemove={onRemove}
                onClick={() => setSelectedBook(book)}
              />
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
    </main>
  );
};

export default Library;
