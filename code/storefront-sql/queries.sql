-- Example query work (from your screenshots / prompt)
-- NOTE: Table/column names must match your actual schema export.

-- Employees hired before 1998 and salary between $3,000 and $5,000.
-- Order by salary ascending.
SELECT first_name, last_name, hire_date, salary
FROM employees
WHERE salary BETWEEN 3000 AND 5000
  AND hire_date < '1998-01-01'
ORDER BY salary;

-- Departments and number of employees with no dependents (subquery).
SELECT d.department_name, COUNT(e.employee_id) AS employee_count
FROM employees e
JOIN departments d ON e.department_id = d.department_id
WHERE e.employee_id NOT IN (
  SELECT dep.employee_id
  FROM dependents dep
  WHERE dep.employee_id IS NOT NULL
)
GROUP BY d.department_name;

-- Total number of employees in each department.
SELECT d.department_name, COUNT(e.employee_id) AS employee_count
FROM employees e
JOIN departments d ON e.department_id = d.department_id
GROUP BY d.department_name
ORDER BY d.department_name;

