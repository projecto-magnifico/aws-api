DROP DATABASE IF EXISTS delphi_test;
CREATE DATABASE delphi_test;

\c delphi_test

CREATE TABLE threads (
    thread_id SERIAL PRIMARY KEY,
    name VARCHAR,
    summary_1 VARCHAR,
    summary_2 VARCHAR,
    summary_3 VARCHAR,
    score DECIMAL NOT NULL,
    date_created DATE DEFAULT NOW(),
    img_url VARCHAR
);

CREATE TABLE quizzes (
    quiz_id SERIAL PRIMARY KEY,
    thread_id INT,
    question VARCHAR,
    state VARCHAR,
    date_created DATE DEFAULT NOW(),
    revisit_date DATE,
    FOREIGN KEY (thread_id) REFERENCES threads(thread_id)
);

CREATE TABLE answers (
    answer_id SERIAL PRIMARY KEY,
    proto VARCHAR,
    quiz_id INT,
    votes INT,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id)
);

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR
);

CREATE TABLE variations (
    variation_id SERIAL PRIMARY KEY,
    answer_id INT,
    user_id INT,
    variation VARCHAR,
    FOREIGN KEY (answer_id) REFERENCES answers(answer_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


CREATE TABLE tags (
    tag_id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    detail VARCHAR
);

CREATE TABLE keywords (
    keyword_id SERIAL PRIMARY KEY,
    word VARCHAR NOT NULL,
    thread_id INT NOT NULL,
    relevance DECIMAL NOT NULL,
    tag_id INT,
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id),
    FOREIGN KEY (thread_id) REFERENCES threads(thread_id)
);

CREATE TABLE sources (
    source_id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    logo_url VARCHAR
);

CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY,
    thread_id INT NOT NULL,
    title VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    url VARCHAR NOT NULL,
    age INT NOT NULL,
    source_id INT NOT NULL,
    image_url VARCHAR,
    FOREIGN KEY (thread_id) REFERENCES threads(thread_id),
    FOREIGN KEY (source_id) REFERENCES sources(source_id)
);

CREATE TABLE snapshots (
    snapshot_id SERIAL PRIMARY KEY,
    top_story_log VARCHAR NOT NULL,
    snap_date DATE DEFAULT NOW(),
    snap_time TIME DEFAULT NOW()
);

INSERT INTO sources (name) VALUES
('abc-news-au'),
('al-jazeera-english'),
('associated-press'),
('bbc-news'),
('cnn'),
('the-guardian-uk'),
('the-huffington-post'),
('independent'),
('metro'),
('mirror'),
('newsweek'),
('new-york-magazine'),
('the-new-york-times'),
('reuters'),
('the-telegraph'),
('usa-today'),
('the-washington-post');

INSERT INTO threads (name, summary_1, summary_2, score, img_url) VALUES ('test', 'hello', 'one', 0.8, '1234');

INSERT INTO articles (thread_id, title, description, url, age, source_id) VALUES (1, 'hello', '1234', '567', 2, 4);

INSERT INTO keywords (word, thread_id, relevance) VALUES ('hi', 1, 0.8);

INSERT INTO quizzes (thread_id, question, state) VALUES (1, '12345', '23456');



