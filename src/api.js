const BASE_URL = "https://openlibrary.org/search.json";

export const fetchBooks = async (query = "harry potter", maxResults = 20) => {
  try {
    console.log(`Fetching books from OpenLibrary: ${query}`);

    // Open Library API
    const response = await fetch(
      `${BASE_URL}?q=${encodeURIComponent(query)}&limit=${maxResults}`,
    );

    if (!response.ok) {
      throw new Error(`API Error status: ${response.status}`);
    }

    const data = await response.json();
    console.log("OpenLibrary Response:", data);

    if (!data.docs || data.docs.length === 0) {
      console.warn("No items found in OpenLibrary response");
      return [];
    }

    // Transform Open Library data to our format
    return data.docs.map((item) => {
      const coverId = item.cover_i;
      let image = "https://via.placeholder.com/128x192?text=No+Cover";

      if (coverId) {
        image = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
      }

      return {
        id: item.key.replace("/works/", ""), // Make ID simpler
        title: item.title || "Άγνωστος Τίτλος",
        author: item.author_name ? item.author_name[0] : "Άγνωστος Συγγραφέας",
        image: image,
        // Create a fake rating based on random/edition count to look nice
        rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
        reviews: item.edition_count || 50,
        // Ensure we get a string for category
        category: item.subject ? item.subject[0] : "Λογοτεχνία",
        // Open Library descriptions are separate, so we use a placeholder or check first_sentence
        description: item.first_sentence
          ? item.first_sentence[0]
          : "Δεν υπάρχει διαθέσιμη σύντομη περιγραφή. Κάντε κλικ για περισσότερα.",
        pageCount: item.number_of_pages_median || null, // Get page count from API
        userReviews: [],
      };
    });
  } catch (error) {
    console.error("Critical Fetch Error (OpenLibrary):", error);
    throw error;
  }
};
