-- database: c:\Users\adrie\Desktop\code\maman\core\ma_base.db

-- database: /path/to/database.db
-- ================================
-- INSERTION DES CLASSES
-- ================================
INSERT INTO classes (id, name, user_id, annee_id) VALUES
(1, '6ème A', 1, 1),
(2, '6ème B', 1, 1),
(3, '5ème A', 1, 1),
(4, '5ème B', 1, 1),
(5, '4ème A', 1, 1),
(6, '4ème B', 1, 1),
(7, '3ème A', 1, 1),
(8, '3ème B', 1, 1);

INSERT INTO anee_scolaire(id, annee, debut, fin, is_active) VALUES
('1', '2024', '01/09/2023', '05/07/2024', False);

-- ================================
-- INSERTION DES ÉLÈVES (20 par classe)
-- ================================

-- 6ème A
INSERT INTO eleves (first_name, last_name, classe_id, photo) VALUES
('Paul', 'Martin', 1, NULL),
('Sophie', 'Durand', 1, NULL),
('Lucas', 'Petit', 1, NULL),
('Emma', 'Bernard', 1, NULL),
('Léo', 'Robert', 1, NULL),
('Chloé', 'Richard', 1, NULL),
('Hugo', 'Thomas', 1, NULL),
('Camille', 'Dubois', 1, NULL),
('Nathan', 'Moreau', 1, NULL),
('Manon', 'Laurent', 1, NULL),
('Tom', 'Simon', 1, NULL),
('Sarah', 'Michel', 1, NULL),
('Mathis', 'Garcia', 1, NULL),
('Clara', 'Lefebvre', 1, NULL),
('Jules', 'Fontaine', 1, NULL),
('Anaïs', 'Chevalier', 1, NULL),
('Noah', 'Roux', 1, NULL),
('Inès', 'Boyer', 1, NULL),
('Louis', 'Gauthier', 1, NULL),
('Lina', 'Lopez', 1, NULL);

-- 6ème B
INSERT INTO Eleves (first_name, last_name, classe_id, photo) VALUES
('Ethan', 'Perrin', 2, NULL),
('Léa', 'Fernandez', 2, NULL),
('Gabriel', 'Girard', 2, NULL),
('Mila', 'Andre', 2, NULL),
('Victor', 'Mercier', 2, NULL),
('Alice', 'Dupuis', 2, NULL),
('Arthur', 'Muller', 2, NULL),
('Eva', 'Blanc', 2, NULL),
('Enzo', 'Henry', 2, NULL),
('Jade', 'Riviere', 2, NULL),
('Pauline', 'Noel', 2, NULL),
('Adrien', 'Renard', 2, NULL),
('Juliette', 'Adam', 2, NULL),
('Antoine', 'Georges', 2, NULL),
('Carla', 'Roussel', 2, NULL),
('Maxime', 'Barbier', 2, NULL),
('Mélanie', 'Rolland', 2, NULL),
('Alexandre', 'Perrot', 2, NULL),
('Flavie', 'Leclerc', 2, NULL),
('Bastien', 'Guillot', 2, NULL);

-- 5ème A
INSERT INTO Eleves (first_name, last_name, classe_id, photo) VALUES
('Marine', 'Legrand', 3, NULL),
('Thomas', 'Collet', 3, NULL),
('Zoé', 'Boucher', 3, NULL),
('Clément', 'Roger', 3, NULL),
('Océane', 'Meunier', 3, NULL),
('Yanis', 'Marin', 3, NULL),
('Nina', 'Guichard', 3, NULL),
('Axel', 'Poulain', 3, NULL),
('Maya', 'Prevost', 3, NULL),
('Simon', 'Millet', 3, NULL),
('Eva', 'Marchand', 3, NULL),
('Kylian', 'Brun', 3, NULL),
('Élise', 'Bertin', 3, NULL),
('Adrien', 'Renault', 3, NULL),
('Romane', 'Charles', 3, NULL),
('Sami', 'Riviere', 3, NULL),
('Maëlys', 'Dufour', 3, NULL),
('Nolan', 'Giraud', 3, NULL),
('Elisa', 'Francois', 3, NULL),
('Hugo', 'Grondin', 3, NULL);

-- 5ème B
INSERT INTO Eleves (first_name, last_name, classe_id, photo) VALUES
('Sarah', 'Langlois', 4, NULL),
('David', 'Dupuy', 4, NULL),
('Mélissa', 'Guillaume', 4, NULL),
('Rayan', 'Hubert', 4, NULL),
('Laura', 'Blondel', 4, NULL),
('Imane', 'Texier', 4, NULL),
('Olivier', 'Colin', 4, NULL),
('Charlotte', 'Bazin', 4, NULL),
('Youssef', 'Lemoine', 4, NULL),
('Amandine', 'Bruneau', 4, NULL),
('Gaël', 'Mallet', 4, NULL),
('Morgane', 'Faure', 4, NULL),
('Ilyes', 'Morin', 4, NULL),
('Eva', 'Baron', 4, NULL),
('Théo', 'Chartier', 4, NULL),
('Adèle', 'Maillard', 4, NULL),
('Samira', 'Paris', 4, NULL),
('Corentin', 'Gros', 4, NULL),
('Nora', 'Adam', 4, NULL),
('Sébastien', 'Royer', 4, NULL);

-- 4ème A
INSERT INTO Eleves (first_name, last_name, classe_id, photo) VALUES
('Amine', 'Dupont', 5, NULL),
('Yasmine', 'Jacquet', 5, NULL),
('Raphaël', 'Poirier', 5, NULL),
('Louna', 'Charton', 5, NULL),
('Ayman', 'Legros', 5, NULL),
('Énora', 'Turpin', 5, NULL),
('Idriss', 'Pichon', 5, NULL),
('Mélina', 'Teixeira', 5, NULL),
('Adrien', 'Marion', 5, NULL),
('Soline', 'Benoit', 5, NULL),
('Clémentine', 'Lebon', 5, NULL),
('Matis', 'Carlier', 5, NULL),
('Yara', 'Vallee', 5, NULL),
('Tony', 'Humbert', 5, NULL),
('Ilona', 'Colas', 5, NULL),
('Nassim', 'René', 5, NULL),
('Naël', 'Torres', 5, NULL),
('Célia', 'Breton', 5, NULL),
('Rayan', 'Paul', 5, NULL),
('Leila', 'Benali', 5, NULL);

-- 4ème B
INSERT INTO Eleves (first_name, last_name, classe_id, photo) VALUES
('Camille', 'Dupre', 6, NULL),
('Nicolas', 'Masson', 6, NULL),
('Morgane', 'Colomb', 6, NULL),
('Selma', 'Pires', 6, NULL),
('Arnaud', 'Deschamps', 6, NULL),
('Mélodie', 'Lagarde', 6, NULL),
('Bilel', 'Dos Santos', 6, NULL),
('Fanny', 'Boulanger', 6, NULL),
('Imrane', 'Gillet', 6, NULL),
('Lucie', 'Freret', 6, NULL),
('Emilie', 'Gay', 6, NULL),
('Rayan', 'Jourdan', 6, NULL),
('Anissa', 'Texier', 6, NULL),
('Clément', 'Riou', 6, NULL),
('Emna', 'Boucher', 6, NULL),
('Loïc', 'Albert', 6, NULL),
('Mathilde', 'Vidal', 6, NULL),
('Sofiane', 'Marais', 6, NULL),
('Alicia', 'Caron', 6, NULL),
('Quentin', 'Besnard', 6, NULL);

-- 3ème A
INSERT INTO Eleves (first_name, last_name, classe_id, photo) VALUES
('Younes', 'Riviere', 7, NULL),
('Sacha', 'Noel', 7, NULL),
('Anastasia', 'Carpentier', 7, NULL),
('Mehdi', 'Menard', 7, NULL),
('Oceane', 'Poulain', 7, NULL),
('Elyas', 'Diallo', 7, NULL),
('Amira', 'Picard', 7, NULL),
('Jonas', 'Navarro', 7, NULL),
('Hana', 'Cohen', 7, NULL),
('Samy', 'Andre', 7, NULL),
('Alban', 'Jourdan', 7, NULL),
('Nadia', 'Pires', 7, NULL),
('Eline', 'Descamps', 7, NULL),
('Naïm', 'Boucher', 7, NULL),
('Ludovic', 'Loiseau', 7, NULL),
('Ismael', 'Texier', 7, NULL),
('Aya', 'Devaux', 7, NULL),
('Hedi', 'Barre', 7, NULL),
('Morgane', 'Thierry', 7, NULL),
('Bilal', 'Fernandez', 7, NULL);

-- 3ème B
INSERT INTO Eleves (first_name, last_name, classe_id, photo) VALUES
('Clara', 'Roussel', 8, NULL),
('Zakaria', 'Blanc', 8, NULL),
('Sarah', 'Mahe', 8, NULL),
('Amine', 'Valette', 8, NULL),
('Dorian', 'Delattre', 8, NULL),
('Maëlle', 'Peron', 8, NULL),
('Riyad', 'Hamel', 8, NULL),
('Louna', 'Vaillant', 8, NULL),
('Mickael', 'Pires', 8, NULL),
('Camila', 'Dias', 8, NULL),
('Erwan', 'Lebrun', 8, NULL),
('Sana', 'Carlier', 8, NULL),
('Thibault', 'Ferreira', 8, NULL),
('Amina', 'Mehdi', 8, NULL),
('Noe', 'Costa', 8, NULL),
('Eden', 'Durand', 8, NULL),
('Farah', 'Pasquier', 8, NULL),
('Adem', 'Mendes', 8, NULL),
('Selena', 'Moreira', 8, NULL),
('Omar', 'Da Silva', 8, NULL);
