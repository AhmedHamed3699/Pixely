CREATE TABLE Artist (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  picture VARCHAR(512)
);

CREATE TABLE Artwork (
  id SERIAL PRIMARY KEY,
  title VARCHAR(512) NOT NULL,
  description TEXT,
  picture VARCHAR(512),
  likes INT DEFAULT 0,
  views INT DEFAULT 0,
  artistId INT NOT NULL,
  FOREIGN KEY (artistId) REFERENCES Artist (id)
);

CREATE TABLE Follow (
  followerId INT NOT NULL,
  artistId INT NOT NULL,
  PRIMARY KEY (followerId, artistId),
  FOREIGN KEY (followerId) REFERENCES Artist (id),
  FOREIGN KEY (artistId) REFERENCES Artist (id)
);

-- Insert into Artist table
INSERT INTO
  Artist (name, username, password)
VALUES
  ('Leonardo da Vinci', 'leonardo', 'password123'),
  ('Vincent van Gogh', 'vincent', 'password123'),
  ('Pablo Picasso', 'pablo', 'password123'),
  ('Claude Monet', 'claude', 'password123'),
  ('Salvador Dali', 'salvador', 'password123');

-- Insert into Artwork table
INSERT INTO
  Artwork (title, description, picture, artistId)
VALUES
  ('Mona Lisa', 'A portrait of a lady', NULL, 1),
  ('Starry Night', 'A night sky with stars', NULL, 2),
  (
    'Guernica',
    'A depiction of the horrors of war',
    NULL,
    3
  ),
  (
    'Water Lilies',
    'A series of water lilies paintings',
    NULL,
    4
  ),
  (
    'The Persistence of Memory',
    'Melting clocks',
    NULL,
    5
  );

-- Insert into Follow table
INSERT INTO
  Follow (followerId, artistId)
VALUES
  (1, 2),
  (1, 3),
  (2, 4),
  (3, 5),
  (4, 1);
