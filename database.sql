CREATE TABLE shoes (
	id SERIAL PRIMARY KEY,
	name VARCHAR(80),
	cost INTEGER
);

INSERT INTO shoes (name, cost)
VALUES ('Red Wing', 250),
('Puma Soliel V2', 40),
('Nike Janoski', 110);

SELECT * FROM shoes;