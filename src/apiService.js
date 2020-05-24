export default async function (searchQuery, numberOfPage, key) {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${numberOfPage}&per_page=12&key=${key}`,
    );
    const images = response.json();
    return images;
  } catch (err) {
    throw err;
  }
}
