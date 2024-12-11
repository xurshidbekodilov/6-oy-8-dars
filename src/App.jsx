import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  const addBook = () => {
    setBooks([...books, { name: bookName, author: author, read: false }]);
    setBookName("");
    setAuthor("");
  };

  const toggleRead = (index) => {
    const newBooks = [...books];
    newBooks[index].read = !newBooks[index].read;
    setBooks(newBooks);
  };

  const deleteBook = (index) => {
    const newBooks = books.filter((_, i) => i !== index);
    setBooks(newBooks);
  };

  const fetchWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=your_api_key`)
      .then((res) => res.json())
      .then((data) => {
        setWeather({
          temp: data.main.temp,
          humidity: data.main.humidity,
          wind: data.wind.speed,
        });
      });
  };

  const searchMovies = () => {
    fetch(`http://www.omdbapi.com/?s=${query}&apikey=your_api_key`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovies(data.Search);
          setError("");
        } else {
          setMovies([]);
          setError("Film topilmadi!");
        }
      });
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card">
      <h1>Hammasi bitta joyda</h1>

      <div>
        <h2>Kitoblar ro'yxati</h2>
        <input
          type="text"
          placeholder="Kitob nomi"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Muallif"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button onClick={addBook}>Kitob qo'shish</button>
        <ul>
          {books.map((book, index) => (
            <li
              key={index}
              className={book.read ? "read" : "unread"}
            >
              {book.name} - {book.author}
              <button onClick={() => toggleRead(index)}>
                {book.read ? "O'qilmagan" : "O'qilgan"}
              </button>
              <button onClick={() => deleteBook(index)}>O'chirish</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Ob-havo ma'lumoti</h2>
        <input
          type="text"
          placeholder="Shahar nomi"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Qidirish</button>
        {weather && (
          <div>
            <p>Harorat: {weather.temp}K</p>
            <p>Namlik: {weather.humidity}%</p>
            <p>Shamol: {weather.wind} m/s</p>
          </div>
        )}
      </div>

      <div>
        <h2>Ish qidiruv</h2>
        <input
          type="text"
          placeholder="Ish nomi"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ul>
          {filteredJobs.map((job) => (
            <li key={job.id}>{job.title}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Film qidirish</h2>
        <input
          type="text"
          placeholder="Film nomi"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchMovies}>Qidirish</button>
        {error && <p>{error}</p>}
        <div>
          {movies.map((movie) => (
            <div key={movie.imdbID}>
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <img src={movie.Poster} alt={movie.Title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
