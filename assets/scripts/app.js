const createMovieBtn = document.querySelector("header button");
const addMovieModal = document.getElementById("add-modal");
const backdrop = document.getElementById("backdrop");
const cancelCreateMovieBtn =
  document.getElementsByClassName("modal__actions")[0].firstElementChild;
const addMovieBtn =
  document.getElementsByClassName("modal__actions")[0].lastElementChild;
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const confirmDeleteMovieModal = document.getElementById("delete-modal");

const movieArray = [];

const updateUI = () => {
  if (movieArray.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const deleteMovie = (movieId) => {
  confirmDeleteMovieModal.classList.add("visible");
  toggleBackdrop();
  const cancelDeletionBtn =
    confirmDeleteMovieModal.querySelector(".btn--passive");
  let confirmDeletionBtn =
    confirmDeleteMovieModal.querySelector(".btn--danger");
  cancelDeletionBtn.removeEventListener("click", cancelMovieDeleletionModal);
  confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));
  confirmDeletionBtn = confirmDeleteMovieModal.querySelector(".btn--danger");
  cancelDeletionBtn.addEventListener("click", cancelMovieDeleletionModal);
  confirmDeletionBtn.addEventListener(
    "click",
    deleteMovieFromUI.bind(null, movieId)
  );
};

const deleteMovieFromUI = (movieId) => {
  let movieIndex = 0;
  for (const movie of movieArray) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movieArray.splice(movieIndex, 1);
  const listRoot = document.getElementById("movie-list");
  listRoot.children[movieIndex].remove();
  cancelMovieDeleletionModal();
  updateUI();
};

const renderMovieElements = (id, title, imageURL, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
  <div class="movie-element__image">
  <img src="${imageURL}" alt="${title}" />
  </div>
  <div class="movie-element__info">
  <h2>${title}</h2>
  <p>${rating}/5 stars</p>
  `;
  newMovieElement.addEventListener("click", deleteMovie.bind(null, id));
  const listRoot = document.getElementById("movie-list");
  listRoot.append(newMovieElement);
};
const showMovieModal = () => {
  addMovieModal.classList.add("visible");
  toggleBackdrop();
};

const cancelMovieDeleletionModal = () => {
  toggleBackdrop();
  confirmDeleteMovieModal.classList.remove("visible");
};

const closeMovieModal = () => {
  addMovieModal.classList.remove("visible");
};
const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const backdropHandler = () => {
  closeMovieModal();
  cancelMovieDeleletionModal();
  clearUserInputs();
};

const cancelMovie = () => {
  closeMovieModal();
  toggleBackdrop();
  clearUserInputs();
};

const clearUserInputs = () => {
  for (const usrInput of userInputs) {
    usrInput.value = "";
  }
};

const addMovie = () => {
  const movieTitle = userInputs[0].value;
  const imageURL = userInputs[1].value;
  const movieRating = userInputs[2].value;

  if (
    movieTitle.trim() === "" ||
    imageURL.trim() === "" ||
    movieRating.trim() === "" ||
    parseInt(movieRating) < 1 ||
    parseInt(movieRating) > 5
  ) {
    alert("Enter a valid title, URL and/or rating!");
    return;
  }
  let movieStoreObject = {
    id: Math.random().toString(),
    movieTitle: movieTitle,
    imageURL: imageURL,
    movieRating: movieRating,
  };
  movieArray.push(movieStoreObject);
  console.log(movieArray);
  closeMovieModal();
  toggleBackdrop();
  clearUserInputs();
  renderMovieElements(
    movieStoreObject.id,
    movieStoreObject.movieTitle,
    movieStoreObject.imageURL,
    movieStoreObject.movieRating
  );
  updateUI();
};

createMovieBtn.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropHandler);
cancelCreateMovieBtn.addEventListener("click", cancelMovie);
addMovieBtn.addEventListener("click", addMovie);
