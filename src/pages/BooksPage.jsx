import { FaPen, FaRegLightbulb } from 'react-icons/fa';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';

import {
  currentlyReading,
  finishedBooks,
} from '../data/booksData';
import './BooksPage.css';

const statusLabels = {
  'currently-reading': 'Currently reading',
  finished: 'Finished',
};

const sortByTitle = (books) => [...books].sort((first, second) => (
  first.title.localeCompare(second.title, 'en', { sensitivity: 'base' })
));

const sortedCurrentlyReading = sortByTitle(currentlyReading);
const sortedFinishedBooks = sortByTitle(finishedBooks);

const getReadingMeta = (book) => {
  const { finished, completionDates, completionYears } = book.reading ?? {};
  if (completionYears?.length > 0) {
    return [...new Set(completionYears)].join(' · ');
  }
  if (completionDates?.length > 0) {
    return [...new Set(completionDates.map(date => String(date).slice(0, 4)))].join(' · ');
  }
  return finished ? String(finished).slice(0, 4) : '';
};

const BookCard = ({ book }) => (
  <article
    className="book-card glass-card"
  >
    <div className="book-card-main">
      <div className="book-cover-frame">
        <img
          className="book-cover"
          src={`/assets/img/books/${book.id}.jpg`}
          alt={`Cover of ${book.title} by ${book.author}`}
          loading="lazy"
        />
      </div>
      <div className="book-card-details">
        <div className="book-card-topline">
          <span className={`book-status book-status-${book.status}`}>
            {statusLabels[book.status]}
          </span>
        </div>
        <h3>{book.title}</h3>
        <p className="book-author">{book.author}</p>
        {getReadingMeta(book) && (
          <p className="book-reading-meta">{getReadingMeta(book)}</p>
        )}
        {book.tags?.length > 0 && (
          <ul className="book-tags" aria-label="Tags">
            {book.tags.map(tag => <li key={tag}>{tag}</li>)}
          </ul>
        )}
      </div>
    </div>
    {(book.notes?.summary || book.notes?.takeaways?.length > 0 || book.notes?.thoughts || book.notes?.questions?.length > 0) && (
      <div className="book-notes">
        {book.notes.summary && (
          <div className="book-note-block">
            <div className="book-note-heading">Summary</div>
            <p>{book.notes.summary}</p>
          </div>
        )}
        {book.notes.takeaways?.length > 0 && (
          <div className="book-note-block">
            <div className="book-note-heading"><FaRegLightbulb aria-hidden="true" /> Takeaways</div>
            <ul>{book.notes.takeaways.map(takeaway => <li key={takeaway}>{takeaway}</li>)}</ul>
          </div>
        )}
        {book.notes.thoughts && (
          <div className="book-note-block">
            <div className="book-note-heading"><FaPen aria-hidden="true" /> My thoughts</div>
            <p>{book.notes.thoughts}</p>
          </div>
        )}
        {book.notes.questions?.length > 0 && (
          <div className="book-note-block">
            <div className="book-note-heading">Questions</div>
            <ul>{book.notes.questions.map(question => <li key={question}>{question}</li>)}</ul>
          </div>
        )}
      </div>
    )}
  </article>
);

const BooksPage = () => {
  return (
    <main className="books-page">
      <SEO
        title="Books"
        description="A structured reading record of books finished and currently being read."
        keywords="books, reading, personal reflections, Buddhism, philosophy"
        url="/personal/books"
      />
      <StructuredData
        type="collection"
        collection={{
          title: 'Books',
          description: 'A structured reading record of books finished and currently being read.',
          url: '/personal/books',
        }}
        breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'Books' }]}
      />

      <div className="container">
        <header className="books-hero">
          <p className="books-kicker">Reading record</p>
          <h1 className="books-title">Books</h1>
          <p className="books-subtitle">
            A structured record of books I have finished and what I am reading now.
          </p>

        </header>

        <section className="books-section" aria-labelledby="current-reading-heading">
          <div className="books-section-heading">
            <p className="books-kicker">Open now</p>
            <h2 id="current-reading-heading">Currently reading</h2>
          </div>
          <div className="books-grid books-grid-current">
            {sortedCurrentlyReading.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>

        <section className="books-section" aria-labelledby="finished-reading-heading">
          <div className="books-section-heading">
            <p className="books-kicker">Reading history</p>
            <h2 id="finished-reading-heading">Finished</h2>
            <p>
              These are the books marked finished in the reading record.
            </p>
          </div>
          <div className="books-grid">
            {sortedFinishedBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default BooksPage;
