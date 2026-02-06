import React, { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import Modal from "../components/Modal";
import { fetchBooks } from "../api";
import { booksData } from "../data/books";
import { Search } from "lucide-react";

const Home = ({ addToLibrary }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [usingOfflineData, setUsingOfflineData] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("harry potter");

  // Function to handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setDebouncedQuery(searchQuery);
    }
  };

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      try {
        console.log(`Searching for: ${debouncedQuery}`);
        const fetchedBooks = await fetchBooks(debouncedQuery);

        if (fetchedBooks && fetchedBooks.length > 0) {
          setBooks(fetchedBooks);
          setUsingOfflineData(false);
        } else {
          throw new Error("API returned empty");
        }
      } catch (err) {
        console.error("API failed/empty, falling back:", err);
        if (debouncedQuery === "harry potter") {
          // Only fallback to local data if we fail on the initial load
          setBooks(booksData);
          setUsingOfflineData(true);
        } else {
          setBooks([]); // If user searched for something specific and it failed, show empty
        }
      }
      setLoading(false);
    };

    loadBooks();
  }, [debouncedQuery]);

  return (
    <main>
      <section className="hero">
        <div className="container">
          <h2 className="hero-title">Βρες το επόμενο βιβλίο σου</h2>
          <p className="hero-subtitle">
            Ανακάλυψε εκατομμύρια βιβλία και φτιάξε την ψηφιακή σου βιβλιοθήκη.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            style={{
              maxWidth: "500px",
              margin: "2rem auto 0",
              position: "relative",
            }}
          >
            <input
              type="text"
              placeholder="Αναζήτηση συγγραφέα, τίτλου..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "1rem 1.5rem",
                paddingRight: "3rem",
                borderRadius: "50px",
                border: "2px solid rgba(0,0,0,0.1)",
                fontSize: "1rem",
                outline: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            />
            <button
              type="submit"
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "var(--primary-color)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Search size={20} />
            </button>
          </form>
        </div>
      </section>

      <section className="book-section container">
        <h2 className="section-title">
          {debouncedQuery === "harry potter"
            ? "Δημοφιλή στην Κοινότητα"
            : `Αποτελέσματα για "${debouncedQuery}"`}
        </h2>

        {usingOfflineData && (
          <div
            style={{
              background: "#fff3e0",
              color: "#e65100",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            ⚠️ Λειτουργία εκτός σύνδεσης.
          </div>
        )}

        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              fontSize: "1.2rem",
              color: "#888",
            }}
          >
            <div className="spinner" style={{ marginBottom: "1rem" }}>
              📚
            </div>
            Αναζήτηση βιβλίων...
          </div>
        ) : (
          <div className="book-grid">
            {books.length > 0 ? (
              books.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onClick={() => setSelectedBook(book)}
                  // Pass custom onAdd handler
                  onAdd={() => addToLibrary(book)}
                />
              ))
            ) : (
              <p
                style={{
                  textAlign: "center",
                  width: "100%",
                  color: "#666",
                  fontSize: "1.1rem",
                }}
              >
                Δεν βρέθηκαν βιβλία για αυτή την αναζήτηση. Δοκίμασε κάτι άλλο!
              </p>
            )}
          </div>
        )}
      </section>

      <Modal
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    </main>
  );
};

export default Home;
