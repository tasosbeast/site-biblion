import React from "react";
import BookCard from "../components/BookCard";

const Profile = ({ myLibrary }) => {
  // Basic User Info
  const user = {
    name: "Τάσος",
    handle: "@tasos_reads",
    bio: "Λάτρης των κλασικών και της επιστημονικής φαντασίας. Πάντα με ένα βιβλίο στο χέρι και έναν καφέ στο άλλο. ☕📚",
  };

  // Derived Stats from Real Library Data
  const totalBooks = myLibrary.length;
  // Find a book marked as 'reading', or fall back to the last added book if any exists
  const readingNow = myLibrary.find((b) => b.status === "reading") || null;

  // Get the last 3 books added to display as recent
  const recentBooks = [...myLibrary].reverse().slice(0, 3);

  return (
    <main className="container profile-page">
      <section className="profile-header">
        <div className="profile-info">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
            alt="Profile"
            className="profile-avatar"
          />
          <div className="profile-text">
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-handle">{user.handle}</p>
            <p className="profile-bio">{user.bio}</p>
            <div className="profile-actions">
              <button className="btn btn-outline">Επεξεργασία</button>
              <button className="btn btn-primary">Ρυθμίσεις</button>
            </div>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-number">{totalBooks}</span>
            <span className="stat-label">Βιβλία</span>
          </div>
          {/* Placeholder stats for now until we implement Friends/Lists features */}
          <div className="stat-item">
            <span className="stat-number">128</span>
            <span className="stat-label">Φίλοι</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">3</span>
            <span className="stat-label">Λίστες</span>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Currently Reading Section */}
      {readingNow ? (
        <section className="current-read-section">
          <h3 className="section-subtitle">Διαβάζω τώρα</h3>
          <div className="reading-card">
            <img
              src={readingNow.image}
              alt="Book Cover"
              className="reading-cover"
            />
            <div className="reading-info">
              <h4>{readingNow.title}</h4>
              <p className="author">{readingNow.author}</p>
              <div className="progress-container">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "45%" }}></div>
                </div>
                <span className="progress-text">Σελιδα 120 (45%)</span>
              </div>
              <button className="btn-text">Ενημέρωση προόδου</button>
            </div>
          </div>
        </section>
      ) : (
        <section className="current-read-section">
          <h3 className="section-subtitle">Διαβάζω τώρα</h3>
          <div
            style={{
              padding: "2rem",
              background: "white",
              borderRadius: "12px",
              textAlign: "center",
              color: "#666",
              border: "1px solid #eee",
            }}
          >
            <p>Δεν διαβάζεις κάποιο βιβλίο αυτή τη στιγμή.</p>
            <p style={{ fontSize: "0.9rem" }}>
              Πήγαινε στη Βιβλιοθήκη και όρισε ένα βιβλίο ως "Διαβάζω τώρα"!
            </p>
          </div>
        </section>
      )}

      <section className="bookshelves-section">
        <h3 className="section-subtitle">Πρόσφατα στη βιβλιοθήκη μου</h3>
        <div className="book-grid">
          {recentBooks.length > 0 ? (
            recentBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                isLibraryView={true}
                onClick={() => {}} // Simple view, no modal needed for now
              />
            ))
          ) : (
            <p style={{ color: "#888" }}>Δεν έχεις προσθέσει βιβλία ακόμα.</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Profile;
