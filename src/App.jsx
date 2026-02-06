import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import { booksData } from "./data/books"; // Initial data

function App() {
  // State for My Library. Initialize from localStorage if available.
  const [myLibrary, setMyLibrary] = useState(() => {
    const saved = localStorage.getItem("myLibrary");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever library changes
  useEffect(() => {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  }, [myLibrary]);

  // Function to add a book to the library
  const addToLibrary = (book) => {
    // Check if book already exists
    const exists = myLibrary.find((b) => b.id === book.id);

    if (exists) {
      alert(`Το βιβλίο "${book.title}" υπάρχει ήδη στη βιβλιοθήκη σου!`);
      return;
    }

    // Add new book with default status "want" (Want to read)
    const newBook = { ...book, status: "want" };
    setMyLibrary([...myLibrary, newBook]);
    alert(`Το "${book.title}" προστέθηκε στη λίστα "Θέλω να διαβάσω"!`);
  };

  // Function to update book status
  const updateBookStatus = (bookId, newStatus) => {
    setMyLibrary((prevLibrary) =>
      prevLibrary.map((book) =>
        book.id === bookId ? { ...book, status: newStatus } : book,
      ),
    );
  };

  // Function to remove a book from the library
  const removeFromLibrary = (bookId) => {
    if (
      window.confirm(
        "Είσαι σίγουρος ότι θέλεις να διαγράψεις αυτό το βιβλίο από τη βιβλιοθήκη σου;",
      )
    ) {
      setMyLibrary((prevLibrary) =>
        prevLibrary.filter((book) => book.id !== bookId),
      );
    }
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home addToLibrary={addToLibrary} />} />
          <Route
            path="/library"
            element={
              <Library
                myLibrary={myLibrary}
                onUpdateStatus={updateBookStatus}
                onRemove={removeFromLibrary}
              />
            }
          />
          <Route path="/profile" element={<Profile myLibrary={myLibrary} />} />
        </Routes>

        <footer className="footer">
          <div className="container">
            <p>&copy; 2024 BookLovers. Φτιαγμένο με αγάπη για τα βιβλία.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
