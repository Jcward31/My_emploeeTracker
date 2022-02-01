
DROP DATABASE IF EXISTS work;
USE company_db;

INSERT INTO department (id, department_name)
VALUES
  (010,'Strickland Propane'),
  (011,'Dales Dead Bugs');


INSERT INTO roles (id, job_title, department_name, role_id, manager_id, salary)
VALUES
  (012,'Salesman', 'Strickland Propane',1, 004, 42000),
  (013,'Tank Wipe','Strickland Propane',2, , 004, 27000),
  (012,'Exterminator','Dales Dead Bugs', 3, 006, 38000),
  (013,'JobsWeDontTalkAbout','Dales Dead Bugs',4, 006, 78000 );


  INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
  (001,'Hank', 'Hill', 1, 004),
  (002,'Peggy', 'Hill', 2, 004),
  (003,'Boby', 'Hill', 2, 004),
  (004,'Buck', 'Strickland', 1, null ),
  (005,'Louanne', 'Platter', 3, 006),
  (006,'Dale', 'Gribble', 3, null),
  (007,'Nancy', 'Gribble', 3, 006),
  (008,'Octavio', 'Dontaskquestions', 4, 006),
  (009,'Brad', 'Thibodeaux', 4, 006);


