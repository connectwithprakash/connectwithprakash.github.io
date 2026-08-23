import { motion, useReducedMotion } from 'framer-motion';
import {
  FaBalanceScale,
  FaEye,
  FaLeaf,
  FaQuestionCircle,
  FaYinYang,
} from 'react-icons/fa';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';

import './QuestionPage.css';

const timeline = [
  {
    period: 'Early questioning',
    title: 'Religion, suffering, and responsibility',
    icon: <FaQuestionCircle />,
    tags: ['Ethics', 'Religious questioning'],
    text: 'As a child, I was drawn to Hanuman, although I do not know exactly why. A visit to Gadhimai, where animals were sacrificed in the name of a deity, left me wondering why a god would require suffering. I now see this as one early moment when questions about religious practice began to appear, although I cannot say that it immediately led to a formed position.',
  },
  {
    period: 'School and early adulthood',
    title: 'Atheism, skepticism, and animal ethics',
    icon: <FaBalanceScale />,
    tags: ['Skepticism', 'Animal ethics'],
    text: 'My movement toward skepticism and my interest in veganism overlapped in time. Questions about animal suffering, sacrifice, religious authority, and how one should live became connected for me, though I do not think of them as one simple causal progression. Veganism was an important former practice and remains an unresolved ethical concern.',
  },

  {
    period: 'Before and during graduate school',
    title: 'Self-observation',
    icon: <FaEye />,
    tags: ['Self-knowledge', 'Observation'],
    text: 'I had already begun noticing thoughts, reactions, self-images, and judgments before encountering Krishnamurti. I encountered Krishnamurti later, and his work gave me language for examining something I had already begun noticing.',
  },
  {
    period: 'Late 2025',
    title: 'The observer and the observed',
    icon: <FaEye />,
    tags: ['Krishnamurti', 'Self-image', 'Non-dual inquiry'],
    text: 'Around late 2025, perhaps November or December, I noticed a division between the thought involved in acting and the thought commenting on or observing the action. After an interaction went poorly, I felt more identified with an imagined, more mindful future self than with the actual person who had acted. I later understood that future self as an image, while the past action had really happened. Seeing this felt both liberating and slightly funny. It also exposed how the mind could create an observer who seemed separate from what it observed.',
  },
  {
    period: 'Continuing practice · overlapping period',
    title: 'Thoughts, meditation, and action',
    icon: <FaLeaf />,
    tags: ['Meditation', 'Practice', 'Attention'],
    text: 'At first, the thought involved in acting and the thought commenting on it did not feel like ordinary thoughts passing by. The division created confusion and fear. Later, through an uncertain combination of listening, guided meditation, and personal observation, I began to wonder whether the observing process might also be a thought rather than a separate observer. The division has not disappeared, but I have become more able to continue doing what is needed while difficult thoughts and feelings are present.',
  },
  {
    period: 'Current exploration',
    title: 'Buddhism, Dzogchen, and Advaita Vedanta',
    icon: <FaYinYang />,
    tags: ['Buddhism', 'Dzogchen', 'Vedanta'],
    text: 'After moving to New York, I began learning about Buddhism and Advaita Vedanta. In my limited, early exploration, they seemed similar around questioning the ordinary self, self-inquiry, direct observation, freedom from identification, and impermanence. I am currently reading about Dzogchen and plan to study Advaita Vedanta more closely. I am still learning about the important differences between Buddhist teachings on no-self and Advaita Vedanta’s language of the true Self.',
  },
];

const QuestionPage = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="question-page">
    <SEO
      title="The Question"
      description="A personal inquiry into ethics, self-knowledge, Buddhism, Dzogchen, and Advaita Vedanta."
      keywords="ethics, self-knowledge, skepticism, Buddhism, Dzogchen, Advaita Vedanta, meditation"
      url="/personal/inquiry"
    />
    <StructuredData
      type="collection"
      collection={{
        title: 'The Question',
        description: 'A personal inquiry into ethics, self-knowledge, Buddhism, Dzogchen, and Advaita Vedanta.',
        url: '/personal/inquiry',
      }}
      breadcrumbs={[{ name: 'Home', url: '/' }, { name: 'The Question' }]}
    />

    <div className="container">
      <header className="question-hero">
        <h1 className="question-title">The Question</h1>
        <blockquote className="question-quote">
          “What is that through which, if it is known, everything else becomes known?”
          <cite>— English translation of <em>Mundaka Upanishad</em>, 1.1.3</cite>
        </blockquote>

      </header>

      <section className="question-section" aria-labelledby="timeline-heading">
        <div className="question-section-heading">
          <h2 id="timeline-heading">Timeline</h2>
          <p>
            The periods are approximate.
          </p>
        </div>
        <div className="question-timeline">
          <div className="question-timeline-line" aria-hidden="true" />
          {timeline.map((entry, index) => (
            <motion.article
              className="question-entry glass-card"
              key={entry.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.2) }}
            >
              <div className="question-entry-marker" aria-hidden="true">{entry.icon}</div>
              <div className="question-entry-content">
                <p className="question-entry-period">{entry.period}</p>
                <h3>{entry.title}</h3>
                <ul className="question-tags" aria-label="Topics">
                  {entry.tags.map(tag => <li key={tag}>{tag}</li>)}
                </ul>
                <p>{entry.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>


      <section className="question-closing glass-card" aria-labelledby="current-heading">
        <p className="question-kicker">Current inquiry</p>
        <h2 id="current-heading">What remains open</h2>
        <p>
          I am still trying to understand what it means to observe thought, whether the observer
          is separate from what it observes, and whether the self is a fixed entity or a changing
          construction. The inquiry continues through reading, reflection, meditation, and the
          ordinary work of living.
        </p>
      </section>
    </div>
  </main>
  );
};

export default QuestionPage;
