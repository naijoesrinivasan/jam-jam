export async function auth() {
    console.log("Auth function running...")
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        throw {
            message: "no_access_token"
        }
    }
    return accessToken;
}

export const getSeedGenres = (allGenres) => {
  console.log("All genres: ", allGenres);
  const genreCount = allGenres.reduce((acc, genre) => {
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {});

  // Step 3: Convert the genreCount object to an array of [genre, count] pairs
  const genreEntries = Object.entries(genreCount);

  // Step 4: Sort the genres by frequency in descending order
  genreEntries.sort((a, b) => b[1] - a[1]);

  // Step 5: Get the top 5 genres
  const top5Genres = genreEntries.slice(0, 5).map(([genre]) => genre);

  // Output the result
  console.log("Top 5 Genres:", top5Genres);

  const genreQuery = top5Genres.join(',');
 
  // Output the result
  console.log(genreQuery);
  return genreQuery;
}