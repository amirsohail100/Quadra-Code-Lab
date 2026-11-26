/* data/sql.questions.js  –  Quadra Code Lab SQL track
   56 questions · 8 categories · 7 per category
   Each question: id, cat, level, title, desc, tables[], expected{cols,rows,ordered?}, hints[], solution (hidden)
   tables[]: { name, cols:[[colName, sqlType], ...], rows:[[...], ...] }
*/
(function () {
  "use strict";

  const CATEGORIES = [
    { id: "select",  name: "SELECT Basics",         icon: "🔎", desc: "Filtering, sorting, DISTINCT, LIMIT" },
    { id: "join",    name: "JOINs",                 icon: "🔗", desc: "INNER, LEFT, RIGHT, FULL joins" },
    { id: "agg",     name: "Aggregation",           icon: "📊", desc: "GROUP BY, HAVING, COUNT, SUM, AVG" },
    { id: "sub",     name: "Subqueries",            icon: "🪆", desc: "Correlated and uncorrelated subqueries" },
    { id: "window",  name: "Window Functions",      icon: "🪟", desc: "ROW_NUMBER, RANK, LAG, LEAD, partition" },
    { id: "string",  name: "String Functions",      icon: "🔤", desc: "UPPER, LOWER, SUBSTR, REPLACE, LIKE" },
    { id: "date",    name: "Date & Time",           icon: "📅", desc: "Date arithmetic and formatting" },
    { id: "adv",     name: "Advanced SQL",          icon: "🚀", desc: "CTEs, CASE, PIVOT, recursive queries" },
  ];

  const QUESTIONS = [];
  let _id = 0;
  function add(cat, level, title, desc, tables, expected, hints, solution) {
    _id++;
    QUESTIONS.push({ id: cat + "-" + _id, cat, level, title, desc, tables, expected, hints, solution });
  }

  /* shared tables used across questions */
  const empTable = {
    name: "employees",
    cols: [["emp_id","INTEGER"],["name","TEXT"],["dept","TEXT"],["salary","REAL"],["hire_date","TEXT"],["manager_id","INTEGER"]],
    rows: [
      [1,"Alice","Engineering",95000,"2019-03-15",null],
      [2,"Bob","Engineering",88000,"2020-07-01",1],
      [3,"Carol","Marketing",72000,"2018-11-20",null],
      [4,"Dave","Marketing",68000,"2021-02-28",3],
      [5,"Eve","Engineering",102000,"2017-05-10",1],
      [6,"Frank","HR",61000,"2022-01-05",null],
      [7,"Grace","HR",59000,"2022-06-15",6],
      [8,"Heidi","Marketing",75000,"2020-09-01",3],
      [9,"Ivan","Engineering",91000,"2019-12-01",1],
      [10,"Judy","HR",63000,"2021-08-20",6],
    ]
  };

  const orderTable = {
    name: "orders",
    cols: [["order_id","INTEGER"],["customer_id","INTEGER"],["product","TEXT"],["amount","REAL"],["order_date","TEXT"],["status","TEXT"]],
    rows: [
      [1,101,"Laptop",1200,"2024-01-10","shipped"],
      [2,102,"Phone",800,"2024-01-15","delivered"],
      [3,101,"Tablet",450,"2024-02-02","shipped"],
      [4,103,"Laptop",1200,"2024-02-14","pending"],
      [5,104,"Phone",800,"2024-03-01","delivered"],
      [6,102,"Headphones",150,"2024-03-10","delivered"],
      [7,101,"Keyboard",95,"2024-03-20","shipped"],
      [8,105,"Monitor",350,"2024-04-01","pending"],
      [9,103,"Tablet",450,"2024-04-15","delivered"],
      [10,104,"Laptop",1200,"2024-05-01","delivered"],
    ]
  };

  const customerTable = {
    name: "customers",
    cols: [["customer_id","INTEGER"],["name","TEXT"],["city","TEXT"],["email","TEXT"]],
    rows: [
      [101,"Alice Smith","New York","alice@example.com"],
      [102,"Bob Jones","Chicago","bob@example.com"],
      [103,"Carol White","New York","carol@example.com"],
      [104,"Dave Brown","Los Angeles","dave@example.com"],
      [105,"Eve Davis","Chicago","eve@example.com"],
      [106,"Frank Miller","New York","frank@example.com"],
    ]
  };

  const productTable = {
    name: "products",
    cols: [["product_id","INTEGER"],["name","TEXT"],["category","TEXT"],["price","REAL"],["stock","INTEGER"]],
    rows: [
      [1,"Laptop","Electronics",1200,15],
      [2,"Phone","Electronics",800,32],
      [3,"Tablet","Electronics",450,20],
      [4,"Headphones","Electronics",150,50],
      [5,"Keyboard","Accessories",95,100],
      [6,"Monitor","Electronics",350,25],
      [7,"Mouse","Accessories",45,80],
      [8,"Desk Lamp","Home",35,60],
      [9,"Notebook","Stationery",8,200],
      [10,"Pen Set","Stationery",12,150],
    ]
  };

  const salesTable = {
    name: "sales",
    cols: [["sale_id","INTEGER"],["rep","TEXT"],["region","TEXT"],["amount","REAL"],["sale_date","TEXT"],["product","TEXT"]],
    rows: [
      [1,"Alice","North",5000,"2024-01-05","Laptop"],
      [2,"Bob","South",3200,"2024-01-12","Phone"],
      [3,"Alice","North",4500,"2024-01-20","Tablet"],
      [4,"Carol","East",2100,"2024-02-03","Headphones"],
      [5,"Bob","South",6000,"2024-02-15","Laptop"],
      [6,"Alice","North",1800,"2024-02-28","Keyboard"],
      [7,"Dave","West",3500,"2024-03-10","Monitor"],
      [8,"Carol","East",4200,"2024-03-20","Tablet"],
      [9,"Bob","South",2800,"2024-04-01","Phone"],
      [10,"Dave","West",5500,"2024-04-15","Laptop"],
      [11,"Alice","North",900,"2024-05-01","Mouse"],
      [12,"Carol","East",3800,"2024-05-10","Tablet"],
    ]
  };

  const scoreTable = {
    name: "scores",
    cols: [["student","TEXT"],["subject","TEXT"],["score","INTEGER"],["exam_date","TEXT"]],
    rows: [
      ["Alice","Math",92,"2024-01-15"],
      ["Alice","Science",88,"2024-01-20"],
      ["Bob","Math",75,"2024-01-15"],
      ["Bob","Science",80,"2024-01-20"],
      ["Carol","Math",98,"2024-01-15"],
      ["Carol","Science",95,"2024-01-20"],
      ["Dave","Math",65,"2024-01-15"],
      ["Dave","Science",70,"2024-01-20"],
      ["Eve","Math",85,"2024-01-15"],
      ["Eve","Science",90,"2024-01-20"],
    ]
  };

  /* ───────── SELECT Basics ───────── */
  add("select","easy","List All Employees",
    "Return the name, department and salary of all employees, ordered by salary descending.",
    [empTable],
    {
      cols:["name","dept","salary"],
      rows:[
        ["Eve","Engineering",102000],
        ["Alice","Engineering",95000],
        ["Ivan","Engineering",91000],
        ["Bob","Engineering",88000],
        ["Heidi","Marketing",75000],
        ["Carol","Marketing",72000],
        ["Dave","Marketing",68000],
        ["Judy","HR",63000],
        ["Frank","HR",61000],
        ["Grace","HR",59000],
      ],
      ordered:true
    },
    ["SELECT name, dept, salary FROM employees ORDER BY salary DESC"],
    "SELECT name, dept, salary FROM employees ORDER BY salary DESC;"
  );

  add("select","easy","High Earners",
    "Return the name and salary of employees earning more than 80000, ordered by salary descending.",
    [empTable],
    {
      cols:["name","salary"],
      rows:[
        ["Eve",102000],
        ["Alice",95000],
        ["Ivan",91000],
        ["Bob",88000],
      ],
      ordered:true
    },
    ["Use WHERE salary > 80000"],
    "SELECT name, salary FROM employees WHERE salary > 80000 ORDER BY salary DESC;"
  );

  add("select","medium","Distinct Departments",
    "Return a list of unique department names from the employees table, sorted alphabetically.",
    [empTable],
    {
      cols:["dept"],
      rows:[["Engineering"],["HR"],["Marketing"]],
      ordered:true
    },
    ["Use SELECT DISTINCT"],
    "SELECT DISTINCT dept FROM employees ORDER BY dept;"
  );

  add("select","medium","Top 3 Salaries",
    "Return the names and salaries of the 3 highest-paid employees.",
    [empTable],
    {
      cols:["name","salary"],
      rows:[["Eve",102000],["Alice",95000],["Ivan",91000]],
      ordered:true
    },
    ["Use ORDER BY salary DESC LIMIT 3"],
    "SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 3;"
  );

  add("select","hard","Salary Ranges",
    "Return each employee's name, salary, and a 'band' column: 'High' if salary ≥ 90000, 'Mid' if 70000–89999, 'Low' otherwise. Order by salary descending.",
    [empTable],
    {
      cols:["name","salary","band"],
      rows:[
        ["Eve",102000,"High"],
        ["Alice",95000,"High"],
        ["Ivan",91000,"High"],
        ["Bob",88000,"Mid"],
        ["Heidi",75000,"Mid"],
        ["Carol",72000,"Mid"],
        ["Dave",68000,"Low"],
        ["Judy",63000,"Low"],
        ["Frank",61000,"Low"],
        ["Grace",59000,"Low"],
      ],
      ordered:true
    },
    ["Use CASE WHEN ... THEN ... ELSE ... END"],
    "SELECT name, salary, CASE WHEN salary >= 90000 THEN 'High' WHEN salary >= 70000 THEN 'Mid' ELSE 'Low' END AS band FROM employees ORDER BY salary DESC;"
  );

  /* ───────── JOINs ───────── */
  add("join","easy","Orders with Customer Names",
    "Return each order's order_id, customer name, product and amount. Only show orders where the customer is in the customers table.",
    [orderTable, customerTable],
    {
      cols:["order_id","name","product","amount"],
      rows:[
        [1,"Alice Smith","Laptop",1200],
        [2,"Bob Jones","Phone",800],
        [3,"Alice Smith","Tablet",450],
        [4,"Carol White","Laptop",1200],
        [5,"Dave Brown","Phone",800],
        [6,"Bob Jones","Headphones",150],
        [7,"Alice Smith","Keyboard",95],
        [8,"Eve Davis","Monitor",350],
        [9,"Carol White","Tablet",450],
        [10,"Dave Brown","Laptop",1200],
      ],
      ordered:false
    },
    ["INNER JOIN orders and customers on customer_id"],
    "SELECT o.order_id, c.name, o.product, o.amount FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id;"
  );

  add("join","easy","Customers Without Orders",
    "Return the names of customers who have placed no orders.",
    [orderTable, customerTable],
    {
      cols:["name"],
      rows:[["Frank Miller"]],
      ordered:false
    },
    ["LEFT JOIN customers to orders; filter WHERE order_id IS NULL"],
    "SELECT c.name FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id WHERE o.order_id IS NULL;"
  );

  add("join","medium","Employee Managers",
    "Return each employee's name and their manager's name (as 'manager'). Employees without a manager should show NULL for manager.",
    [empTable],
    {
      cols:["employee","manager"],
      rows:[
        ["Alice",null],
        ["Bob","Alice"],
        ["Carol",null],
        ["Dave","Carol"],
        ["Eve","Alice"],
        ["Frank",null],
        ["Grace","Frank"],
        ["Heidi","Carol"],
        ["Ivan","Alice"],
        ["Judy","Frank"],
      ],
      ordered:false
    },
    ["Self-join employees table: e LEFT JOIN employees m ON e.manager_id = m.emp_id"],
    "SELECT e.name AS employee, m.name AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.emp_id;"
  );

  add("join","medium","Products Never Ordered",
    "Return product names from the products table that have never appeared in any order.",
    [orderTable, productTable],
    {
      cols:["name"],
      rows:[["Mouse"],["Desk Lamp"],["Notebook"],["Pen Set"]],
      ordered:false
    },
    ["LEFT JOIN products to orders on product name; filter WHERE order_id IS NULL"],
    "SELECT p.name FROM products p LEFT JOIN orders o ON p.name = o.product WHERE o.order_id IS NULL;"
  );

  add("join","hard","Order Summary per Customer",
    "For each customer (including those with no orders), return name, order count, and total amount spent (0 if no orders). Order by total_spent descending.",
    [orderTable, customerTable],
    {
      cols:["name","order_count","total_spent"],
      rows:[
        ["Dave Brown",2,2000],
        ["Alice Smith",3,1745],
        ["Carol White",2,1650],
        ["Bob Jones",2,950],
        ["Eve Davis",1,350],
        ["Frank Miller",0,0],
      ],
      ordered:true
    },
    ["LEFT JOIN, GROUP BY customer, COALESCE(SUM(...),0)"],
    "SELECT c.name, COUNT(o.order_id) AS order_count, COALESCE(SUM(o.amount),0) AS total_spent FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.customer_id, c.name ORDER BY total_spent DESC;"
  );

  /* ───────── Aggregation ───────── */
  add("agg","easy","Department Headcount",
    "Return the number of employees in each department, ordered by count descending.",
    [empTable],
    {
      cols:["dept","headcount"],
      rows:[["Engineering",4],["Marketing",3],["HR",3]],
      ordered:true
    },
    ["SELECT dept, COUNT(*) ... GROUP BY dept ORDER BY COUNT(*) DESC"],
    "SELECT dept, COUNT(*) AS headcount FROM employees GROUP BY dept ORDER BY headcount DESC;"
  );

  add("agg","easy","Average Salary by Department",
    "Return the average salary per department, rounded to 2 decimal places, ordered alphabetically by department.",
    [empTable],
    {
      cols:["dept","avg_salary"],
      rows:[["Engineering",94000],["HR",61000],["Marketing",71666.67]],
      ordered:true
    },
    ["ROUND(AVG(salary), 2)"],
    "SELECT dept, ROUND(AVG(salary), 2) AS avg_salary FROM employees GROUP BY dept ORDER BY dept;"
  );

  add("agg","medium","Departments with High Average",
    "Return departments where the average salary is above 80000, along with the average salary (rounded to 2 dp).",
    [empTable],
    {
      cols:["dept","avg_salary"],
      rows:[
        ["Engineering",94000],
      ],
      ordered:false
    },
    ["Use HAVING AVG(salary) > 80000"],
    "SELECT dept, ROUND(AVG(salary), 2) AS avg_salary FROM employees GROUP BY dept HAVING AVG(salary) > 80000;"
  );

  add("agg","medium","Monthly Order Revenue",
    "Return the total order amount per month (formatted as 'YYYY-MM'), ordered chronologically.",
    [orderTable],
    {
      cols:["month","total"],
      rows:[["2024-01",2000],["2024-02",1650],["2024-03",1045],["2024-04",800],["2024-05",1200]],
      ordered:true
    },
    ["Use SUBSTR(order_date,1,7) to extract year-month"],
    "SELECT SUBSTR(order_date,1,7) AS month, SUM(amount) AS total FROM orders GROUP BY month ORDER BY month;"
  );

  add("agg","hard","Top Product per Month",
    "Return the product with the highest total sales amount for each month. Output: month, product, total_amount.",
    [orderTable],
    {
      cols:["month","product","total_amount"],
      rows:[
        ["2024-01","Laptop",1200],
        ["2024-02","Laptop",1200],
        ["2024-03","Phone",800],
        ["2024-04","Tablet",450],
        ["2024-05","Laptop",1200],
      ],
      ordered:true
    },
    ["CTE or subquery: sum per month+product, then filter to max per month"],
    "WITH monthly AS (SELECT SUBSTR(order_date,1,7) AS month, product, SUM(amount) AS total_amount FROM orders GROUP BY month, product), ranked AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY month ORDER BY total_amount DESC) rn FROM monthly) SELECT month, product, total_amount FROM ranked WHERE rn=1 ORDER BY month;"
  );

  /* ───────── Subqueries ───────── */
  add("sub","easy","Above Average Salary",
    "Return names and salaries of employees earning above the company-wide average salary.",
    [empTable],
    {
      cols:["name","salary"],
      rows:[
        ["Alice",95000],
        ["Bob",88000],
        ["Eve",102000],
        ["Ivan",91000],
      ],
      ordered:false
    },
    ["Use a scalar subquery: WHERE salary > (SELECT AVG(salary) FROM employees)"],
    "SELECT name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
  );

  add("sub","easy","Highest Paid in Each Dept",
    "Return the name, department and salary of the highest-paid employee in each department.",
    [empTable],
    {
      cols:["name","dept","salary"],
      rows:[["Eve","Engineering",102000],["Heidi","Marketing",75000],["Judy","HR",63000]],
      ordered:false
    },
    ["Subquery: WHERE salary = (SELECT MAX(salary) FROM employees e2 WHERE e2.dept = e.dept)"],
    "SELECT name, dept, salary FROM employees e WHERE salary = (SELECT MAX(salary) FROM employees e2 WHERE e2.dept = e.dept);"
  );

  add("sub","medium","Employees Earning More Than Manager",
    "Return the names of employees whose salary is higher than their own manager's salary.",
    [empTable],
    {
      cols:["name"],
      rows:[
        ["Eve"],
        ["Heidi"],
        ["Judy"],
      ],
      ordered:false
    },
    ["Self-join or correlated subquery comparing e.salary to m.salary where m.emp_id = e.manager_id"],
    "SELECT e.name FROM employees e JOIN employees m ON e.manager_id = m.emp_id WHERE e.salary > m.salary;"
  );

  add("sub","medium","Customers Who Bought Every Premium Product",
    "Return names of customers who have ordered every product in the products table priced at 1000 or more (at least one order for each such product). Order by name.",
    [orderTable, customerTable, productTable],
    {
      cols:["name"],
      rows:[
        ["Alice Smith"],
        ["Carol White"],
        ["Dave Brown"],
      ],
      ordered:false
    },
    ["Use NOT EXISTS or COUNT DISTINCT with a correlated subquery for each expensive product"],
    "SELECT c.name FROM customers c WHERE NOT EXISTS (SELECT p.name FROM products p WHERE p.price >= 1000 AND NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id AND o.product = p.name)) ORDER BY c.name;"
  );

  add("sub","hard","Second Highest Salary",
    "Return the second highest salary value from employees. If there is no second highest, return NULL.",
    [empTable],
    {
      cols:["second_highest"],
      rows:[[95000]],
      ordered:false
    },
    ["Use OFFSET 1 or a subquery with MAX where salary < (SELECT MAX salary)"],
    "SELECT MAX(salary) AS second_highest FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);"
  );

  /* ───────── Window Functions ───────── */
  add("window","easy","Salary Rank per Department",
    "Return each employee's name, department, salary and their rank within their department (1=highest). Use RANK().",
    [empTable],
    {
      cols:["name","dept","salary","dept_rank"],
      rows:[
        ["Eve","Engineering",102000,1],
        ["Alice","Engineering",95000,2],
        ["Ivan","Engineering",91000,3],
        ["Bob","Engineering",88000,4],
        ["Heidi","Marketing",75000,1],
        ["Carol","Marketing",72000,2],
        ["Dave","Marketing",68000,3],
        ["Judy","HR",63000,1],
        ["Frank","HR",61000,2],
        ["Grace","HR",59000,3],
      ],
      ordered:false
    },
    ["RANK() OVER (PARTITION BY dept ORDER BY salary DESC)"],
    "SELECT name, dept, salary, RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS dept_rank FROM employees;"
  );

  add("window","easy","Running Total of Sales",
    "Return each sale's sale_id, rep, amount and the running total of amounts ordered by sale_id.",
    [salesTable],
    {
      cols:["sale_id","rep","amount","running_total"],
      rows:[
        [1,"Alice",5000,5000],
        [2,"Bob",3200,8200],
        [3,"Alice",4500,12700],
        [4,"Carol",2100,14800],
        [5,"Bob",6000,20800],
        [6,"Alice",1800,22600],
        [7,"Dave",3500,26100],
        [8,"Carol",4200,30300],
        [9,"Bob",2800,33100],
        [10,"Dave",5500,38600],
        [11,"Alice",900,39500],
        [12,"Carol",3800,43300],
      ],
      ordered:true
    },
    ["SUM(amount) OVER (ORDER BY sale_id ROWS UNBOUNDED PRECEDING)"],
    "SELECT sale_id, rep, amount, SUM(amount) OVER (ORDER BY sale_id) AS running_total FROM sales ORDER BY sale_id;"
  );

  add("window","medium","Previous Sale Comparison",
    "For each sale (ordered by sale_id), return sale_id, rep, amount and the previous sale's amount (NULL if first). Name the column prev_amount.",
    [salesTable],
    {
      cols:["sale_id","rep","amount","prev_amount"],
      rows:[
        [1,"Alice",5000,null],
        [2,"Bob",3200,5000],
        [3,"Alice",4500,3200],
        [4,"Carol",2100,4500],
        [5,"Bob",6000,2100],
        [6,"Alice",1800,6000],
        [7,"Dave",3500,1800],
        [8,"Carol",4200,3500],
        [9,"Bob",2800,4200],
        [10,"Dave",5500,2800],
        [11,"Alice",900,5500],
        [12,"Carol",3800,900],
      ],
      ordered:true
    },
    ["LAG(amount, 1) OVER (ORDER BY sale_id)"],
    "SELECT sale_id, rep, amount, LAG(amount, 1) OVER (ORDER BY sale_id) AS prev_amount FROM sales ORDER BY sale_id;"
  );

  add("window","medium","Top N per Group",
    "Return the top 2 earners in each department (by salary). Use ROW_NUMBER and a subquery/CTE.",
    [empTable],
    {
      cols:["dept","name","salary"],
      rows:[
        ["Engineering","Eve",102000],
        ["Engineering","Alice",95000],
        ["HR","Judy",63000],
        ["HR","Frank",61000],
        ["Marketing","Heidi",75000],
        ["Marketing","Carol",72000],
      ],
      ordered:false
    },
    ["ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) rn, then WHERE rn <= 2"],
    "WITH ranked AS (SELECT dept, name, salary, ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) rn FROM employees) SELECT dept, name, salary FROM ranked WHERE rn <= 2;"
  );

  add("window","hard","Moving Average",
    "For each sale (ordered by sale_id), compute a 3-row moving average of amounts (current row + 2 preceding). Round to 2 decimal places. Name column moving_avg.",
    [salesTable],
    {
      cols:["sale_id","amount","moving_avg"],
      rows:[
        [1,5000,5000],
        [2,3200,4100],
        [3,4500,4233.33],
        [4,2100,3266.67],
        [5,6000,4200],
        [6,1800,3300],
        [7,3500,3766.67],
        [8,4200,3166.67],
        [9,2800,3500],
        [10,5500,4166.67],
        [11,900,3066.67],
        [12,3800,3400],
      ],
      ordered:true
    },
    ["AVG(amount) OVER (ORDER BY sale_id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)"],
    "SELECT sale_id, amount, ROUND(AVG(amount) OVER (ORDER BY sale_id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS moving_avg FROM sales ORDER BY sale_id;"
  );

  /* ───────── String Functions ───────── */
  add("string","easy","Upper Case Names",
    "Return each employee's name in UPPERCASE and their department. Order by name.",
    [empTable],
    {
      cols:["upper_name","dept"],
      rows:[
        ["ALICE","Engineering"],
        ["BOB","Engineering"],
        ["CAROL","Marketing"],
        ["DAVE","Marketing"],
        ["EVE","Engineering"],
        ["FRANK","HR"],
        ["GRACE","HR"],
        ["HEIDI","Marketing"],
        ["IVAN","Engineering"],
        ["JUDY","HR"],
      ],
      ordered:true
    },
    ["UPPER(name)"],
    "SELECT UPPER(name) AS upper_name, dept FROM employees ORDER BY name;"
  );

  add("string","easy","Email Domain",
    "Return each customer's name and their email domain (the part after '@'). Order by name.",
    [customerTable],
    {
      cols:["name","domain"],
      rows:[
        ["Alice Smith","example.com"],
        ["Bob Jones","example.com"],
        ["Carol White","example.com"],
        ["Dave Brown","example.com"],
        ["Eve Davis","example.com"],
        ["Frank Miller","example.com"],
      ],
      ordered:true
    },
    ["SUBSTR(email, INSTR(email,'@')+1)"],
    "SELECT name, SUBSTR(email, INSTR(email,'@')+1) AS domain FROM customers ORDER BY name;"
  );

  add("string","medium","Name Search",
    "Return names and departments of employees whose name contains the letter 'a' (case-insensitive), ordered by name.",
    [empTable],
    {
      cols:["name","dept"],
      rows:[
        ["Alice","Engineering"],
        ["Carol","Marketing"],
        ["Dave","Marketing"],
        ["Frank","HR"],
        ["Grace","HR"],
        ["Ivan","Engineering"],
      ],
      ordered:true
    },
    ["LOWER(name) LIKE '%a%'"],
    "SELECT name, dept FROM employees WHERE LOWER(name) LIKE '%a%' ORDER BY name;"
  );

  add("string","medium","Initials",
    "Return each employee's initials — the first letter of their name — along with their department. Order by name.",
    [empTable],
    {
      cols:["initial","dept"],
      rows:[["A","Engineering"],["B","Engineering"],["C","Marketing"],["D","Marketing"],["E","Engineering"],["F","HR"],["G","HR"],["H","Marketing"],["I","Engineering"],["J","HR"]],
      ordered:true
    },
    ["SUBSTR(name, 1, 1)"],
    "SELECT SUBSTR(name,1,1) AS initial, dept FROM employees ORDER BY name;"
  );

  add("string","hard","Format Full Name",
    "The customers table has a 'name' column in 'First Last' format. Return a 'formatted' column as 'Last, First', ordered by last name.",
    [customerTable],
    {
      cols:["formatted"],
      rows:[
        ["Brown, Dave"],
        ["Davis, Eve"],
        ["Jones, Bob"],
        ["Miller, Frank"],
        ["Smith, Alice"],
        ["White, Carol"],
      ],
      ordered:true
    },
    ["Use INSTR to find the space; SUBSTR to extract first and last parts"],
    "SELECT SUBSTR(name, INSTR(name,' ')+1) || ', ' || SUBSTR(name, 1, INSTR(name,' ')-1) AS formatted FROM customers ORDER BY SUBSTR(name, INSTR(name,' ')+1);"
  );

  /* ───────── Date & Time ───────── */
  add("date","easy","Orders in Q1 2024",
    "Return order_id, product and order_date for orders placed in Q1 2024 (January–March), ordered by date.",
    [orderTable],
    {
      cols:["order_id","product","order_date"],
      rows:[
        [1,"Laptop","2024-01-10"],
        [2,"Phone","2024-01-15"],
        [3,"Tablet","2024-02-02"],
        [4,"Laptop","2024-02-14"],
        [5,"Phone","2024-03-01"],
        [6,"Headphones","2024-03-10"],
        [7,"Keyboard","2024-03-20"],
      ],
      ordered:true
    },
    ["WHERE order_date < '2024-04-01'"],
    "SELECT order_id, product, order_date FROM orders WHERE order_date >= '2024-01-01' AND order_date < '2024-04-01' ORDER BY order_date;"
  );

  add("date","easy","Employees Hired Before 2020",
    "Return names and hire dates of employees hired before 2020, ordered by hire_date.",
    [empTable],
    {
      cols:["name","hire_date"],
      rows:[
        ["Eve","2017-05-10"],
        ["Carol","2018-11-20"],
        ["Alice","2019-03-15"],
        ["Ivan","2019-12-01"],
      ],
      ordered:true
    },
    ["WHERE hire_date < '2020-01-01'"],
    "SELECT name, hire_date FROM employees WHERE hire_date < '2020-01-01' ORDER BY hire_date;"
  );

  add("date","medium","Days Since Hire",
    "Return each employee's name and the number of days since they were hired (use '2024-12-31' as today). Order by days_since_hire descending.",
    [empTable],
    {
      cols:["name","days_since_hire"],
      rows:[
        ["Eve",2792],
        ["Carol",2233],
        ["Alice",2118],
        ["Ivan",1857],
        ["Bob",1644],
        ["Heidi",1582],
        ["Dave",1402],
        ["Judy",1229],
        ["Frank",1091],
        ["Grace",930],
      ],
      ordered:true
    },
    ["Use julianday('2024-12-31') - julianday(hire_date) and CAST to INTEGER"],
    "SELECT name, CAST(julianday('2024-12-31') - julianday(hire_date) AS INTEGER) AS days_since_hire FROM employees ORDER BY days_since_hire DESC;"
  );

  add("date","medium","Orders by Day of Week",
    "Return the count of orders placed on each day of the week that has at least one order (0=Sunday ... 6=Saturday, as in SQLite strftime('%w')). Order by order_count descending, then day_of_week ascending.",
    [orderTable],
    {
      cols:["day_of_week","order_count"],
      rows:[
        [3,4],
        [1,3],
        [5,2],
        [0,1],
      ],
      ordered:true
    },
    ["strftime('%w', order_date) gives day of week"],
    "SELECT CAST(strftime('%w', order_date) AS INTEGER) AS day_of_week, COUNT(*) AS order_count FROM orders GROUP BY day_of_week ORDER BY order_count DESC, day_of_week;"
  );

  add("date","hard","Month-over-Month Growth",
    "Return each month's total order amount and the percentage growth compared to the previous month (NULL for the first month). Round to 2dp. Order by month.",
    [orderTable],
    {
      cols:["month","total","mom_growth_pct"],
      rows:[
        ["2024-01",2000,null],
        ["2024-02",1650,-17.5],
        ["2024-03",1045,-36.67],
        ["2024-04",800,-23.44],
        ["2024-05",1200,50],
      ],
      ordered:true
    },
    ["CTE for monthly totals + LAG for previous month + (current-prev)/prev*100"],
    "WITH monthly AS (SELECT SUBSTR(order_date,1,7) AS month, SUM(amount) AS total FROM orders GROUP BY month) SELECT month, total, ROUND((total - LAG(total) OVER (ORDER BY month)) * 100.0 / LAG(total) OVER (ORDER BY month), 2) AS mom_growth_pct FROM monthly ORDER BY month;"
  );

  /* ───────── Advanced SQL ───────── */
  add("adv","easy","Simple CTE",
    "Using a CTE, calculate the average score per subject and return subjects where the average is above 82. Output: subject, avg_score (round to 2dp).",
    [scoreTable],
    {
      cols:["subject","avg_score"],
      rows:[["Science",84.6],["Math",83]],
      ordered:false
    },
    ["WITH avg_cte AS (SELECT subject, ROUND(AVG(score),2) ... ) SELECT ... WHERE avg_score > 82"],
    "WITH avg_cte AS (SELECT subject, ROUND(AVG(score),2) AS avg_score FROM scores GROUP BY subject) SELECT subject, avg_score FROM avg_cte WHERE avg_score > 82 ORDER BY avg_score DESC;"
  );

  add("adv","easy","CASE for Grade",
    "Return each student's name, their average score and a letter grade: A (≥90), B (80–89), C (70–79), D otherwise. Order by avg_score desc.",
    [scoreTable],
    {
      cols:["student","avg_score","grade"],
      rows:[
        ["Carol",96.5,"A"],
        ["Alice",90,"A"],
        ["Eve",87.5,"B"],
        ["Bob",77.5,"C"],
        ["Dave",67.5,"D"],
      ],
      ordered:true
    },
    ["AVG per student, then CASE WHEN avg >= 90 THEN 'A' ..."],
    "SELECT student, AVG(score) AS avg_score, CASE WHEN AVG(score)>=90 THEN 'A' WHEN AVG(score)>=80 THEN 'B' WHEN AVG(score)>=70 THEN 'C' ELSE 'D' END AS grade FROM scores GROUP BY student ORDER BY avg_score DESC;"
  );

  add("adv","medium","Recursive Hierarchy",
    "Using a recursive CTE, return all employees under manager Alice (emp_id=1) at any depth, including Alice herself. Output: emp_id, name, level (1=Alice, 2=direct reports, etc.).",
    [empTable],
    {
      cols:["emp_id","name","level"],
      rows:[[1,"Alice",1],[2,"Bob",2],[5,"Eve",2],[9,"Ivan",2]],
      ordered:false
    },
    ["WITH RECURSIVE cte(emp_id, name, level) AS (base case + recursive step joining on manager_id)"],
    "WITH RECURSIVE tree(emp_id, name, lvl) AS (SELECT emp_id, name, 1 FROM employees WHERE emp_id=1 UNION ALL SELECT e.emp_id, e.name, t.lvl+1 FROM employees e JOIN tree t ON e.manager_id=t.emp_id) SELECT emp_id, name, lvl AS level FROM tree;"
  );

  add("adv","medium","Pivot Sales by Region",
    "Return each sales rep's total amount per region as a wide table: rep, North, South, East, West. Use CASE-based pivoting. 0 if no sales.",
    [salesTable],
    {
      cols:["rep","North","South","East","West"],
      rows:[
        ["Alice",12200,0,0,0],
        ["Bob",0,12000,0,0],
        ["Carol",0,0,10100,0],
        ["Dave",0,0,0,9000],
      ],
      ordered:false
    },
    ["SUM(CASE WHEN region='North' THEN amount ELSE 0 END) AS North ..."],
    "SELECT rep, SUM(CASE WHEN region='North' THEN amount ELSE 0 END) AS North, SUM(CASE WHEN region='South' THEN amount ELSE 0 END) AS South, SUM(CASE WHEN region='East' THEN amount ELSE 0 END) AS East, SUM(CASE WHEN region='West' THEN amount ELSE 0 END) AS West FROM sales GROUP BY rep ORDER BY rep;"
  );

  add("adv","hard","Gaps and Islands",
    "The orders table has daily orders. Find date ranges where NO orders were placed between '2024-01-01' and '2024-05-31'. Output: gap_start, gap_end (the first and last date of each run of order-free days), ordered by gap_start. Hint: build a date series with a recursive CTE, then group consecutive missing dates.",
    [orderTable],
    {
      cols:["gap_start","gap_end"],
      rows:[
        ["2024-01-01","2024-01-09"],
        ["2024-01-11","2024-01-14"],
        ["2024-01-16","2024-02-01"],
        ["2024-02-03","2024-02-13"],
        ["2024-02-15","2024-02-29"],
        ["2024-03-02","2024-03-09"],
        ["2024-03-11","2024-03-19"],
        ["2024-03-21","2024-03-31"],
        ["2024-04-02","2024-04-14"],
        ["2024-04-16","2024-04-30"],
        ["2024-05-02","2024-05-31"],
      ],
      ordered:true
    },
    ["Generate a series of dates with a recursive CTE, then LEFT JOIN orders, then find consecutive NULLs"],
    "WITH RECURSIVE dates(d) AS (SELECT '2024-01-01' UNION ALL SELECT date(d,'+1 day') FROM dates WHERE d < '2024-05-31'), missing AS (SELECT d, julianday(d) - ROW_NUMBER() OVER (ORDER BY d) AS grp FROM dates WHERE d NOT IN (SELECT order_date FROM orders)) SELECT MIN(d) AS gap_start, MAX(d) AS gap_end FROM missing GROUP BY grp ORDER BY gap_start;"
  );

  /* ═══════════ MORE QUESTIONS (added in Quadra Code Lab) ═══════════ */

  add("select","easy","Top 3 Highest Paid",
    "Return the `name` and `salary` of the 3 highest paid employees, highest salary first.",
    [empTable],
    { cols: ["name", "salary"], rows: [
        ["Eve",102000],
        ["Alice",95000],
        ["Ivan",91000]
      ], ordered: true },
    ["ORDER BY ... DESC and LIMIT 3."],
    "SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 3"
  );

  add("select","medium","Recent Hires in Two Departments",
    "Return `name` and `dept` of employees who work in `Engineering` or `HR` AND were hired after 2019-12-31. Sort by name.",
    [empTable],
    { cols: ["name", "dept"], rows: [
        ["Bob","Engineering"],
        ["Frank","HR"],
        ["Grace","HR"],
        ["Judy","HR"]
      ], ordered: true },
    ["IN ('Engineering','HR') combined with AND on the date. Dates are ISO text, so string comparison works."],
    "SELECT name, dept FROM employees WHERE dept IN ('Engineering','HR') AND hire_date > '2019-12-31' ORDER BY name"
  );

  add("join","easy","Orders with Customer Name",
    "Return the customer `name` and the `product` of every order. Sort by `order_id`.",
    [orderTable, customerTable],
    { cols: ["name", "product"], rows: [
        ["Alice Smith","Laptop"],
        ["Bob Jones","Phone"],
        ["Alice Smith","Tablet"],
        ["Carol White","Laptop"],
        ["Dave Brown","Phone"],
        ["Bob Jones","Headphones"],
        ["Alice Smith","Keyboard"],
        ["Eve Davis","Monitor"],
        ["Carol White","Tablet"],
        ["Dave Brown","Laptop"]
      ], ordered: true },
    ["INNER JOIN orders and customers on customer_id."],
    "SELECT c.name, o.product FROM orders o JOIN customers c ON c.customer_id = o.customer_id ORDER BY o.order_id"
  );

  add("join","medium","Customers Without Orders",
    "Return the `name` of every customer who has never placed an order.",
    [customerTable, orderTable],
    { cols: ["name"], rows: [
        ["Frank Miller"]
      ], ordered: false },
    ["LEFT JOIN customers to orders, then keep rows where the order side is NULL."],
    "SELECT c.name FROM customers c LEFT JOIN orders o ON o.customer_id = c.customer_id WHERE o.order_id IS NULL"
  );

  add("agg","medium","Revenue per Product",
    "Return each `product` and the sum of its order `amount` as `total`. Highest total first; break ties by product name.",
    [orderTable],
    { cols: ["product", "total"], rows: [
        ["Laptop",3600],
        ["Phone",1600],
        ["Tablet",900],
        ["Monitor",350],
        ["Headphones",150],
        ["Keyboard",95]
      ], ordered: true },
    ["GROUP BY product, then ORDER BY total DESC, product."],
    "SELECT product, SUM(amount) AS total FROM orders GROUP BY product ORDER BY total DESC, product"
  );

  add("agg","hard","Regions Above Average",
    "First total the sales `amount` per `region`. Return the regions (`region`, `total`) whose total is higher than the AVERAGE of all region totals. Sort by region.",
    [salesTable],
    { cols: ["region", "total"], rows: [
        ["North",12200],
        ["South",12000]
      ], ordered: true },
    ["Put the per-region totals in a CTE, then compare each total with (SELECT AVG(total) FROM cte)."],
    "WITH t AS (SELECT region, SUM(amount) AS total FROM sales GROUP BY region) SELECT region, total FROM t WHERE total > (SELECT AVG(total) FROM t) ORDER BY region"
  );

  add("sub","easy","Above Average Salary",
    "Return `name` and `salary` of employees who earn more than the average salary of all employees. Highest salary first.",
    [empTable],
    { cols: ["name", "salary"], rows: [
        ["Eve",102000],
        ["Alice",95000],
        ["Ivan",91000],
        ["Bob",88000]
      ], ordered: true },
    ["Use (SELECT AVG(salary) FROM employees) inside the WHERE."],
    "SELECT name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees) ORDER BY salary DESC"
  );

  add("sub","hard","Top Earner per Department",
    "Return `dept`, `name` and `salary` of the highest paid employee in EACH department (use a correlated subquery). Sort by dept.",
    [empTable],
    { cols: ["dept", "name", "salary"], rows: [
        ["Engineering","Eve",102000],
        ["HR","Judy",63000],
        ["Marketing","Heidi",75000]
      ], ordered: true },
    ["For every row compare salary with (SELECT MAX(salary) FROM employees WHERE dept = outer.dept)."],
    "SELECT dept, name, salary FROM employees e WHERE salary = (SELECT MAX(salary) FROM employees WHERE dept = e.dept) ORDER BY dept"
  );

  add("window","medium","Running Total",
    "Return `sale_id`, `amount` and a running total of `amount` called `running_total`, ordered by `sale_date` then `sale_id`. The output is sorted by `sale_id`.",
    [salesTable],
    { cols: ["sale_id", "amount", "running_total"], rows: [
        [1,5000,5000],
        [2,3200,8200],
        [3,4500,12700],
        [4,2100,14800],
        [5,6000,20800],
        [6,1800,22600],
        [7,3500,26100],
        [8,4200,30300],
        [9,2800,33100],
        [10,5500,38600],
        [11,900,39500],
        [12,3800,43300]
      ], ordered: true },
    ["SUM(amount) OVER (ORDER BY sale_date, sale_id)."],
    "SELECT sale_id, amount, SUM(amount) OVER (ORDER BY sale_date, sale_id) AS running_total FROM sales ORDER BY sale_id"
  );

  add("window","hard","Month over Month Change",
    "Total the sales `amount` per month (`YYYY-MM`, column `month`, column `total`). Add a column `change` = this month's total minus the previous month's total (NULL for the first month). Sort by month.",
    [salesTable],
    { cols: ["month", "total", "change"], rows: [
        ["2024-01",12700,null],
        ["2024-02",9900,-2800],
        ["2024-03",7700,-2200],
        ["2024-04",8300,600],
        ["2024-05",4700,-3600]
      ], ordered: true },
    ["Make the monthly totals in a CTE with substr(sale_date, 1, 7), then use LAG(total) OVER (ORDER BY month)."],
    "WITH m AS (SELECT substr(sale_date, 1, 7) AS month, SUM(amount) AS total FROM sales GROUP BY substr(sale_date, 1, 7)) SELECT month, total, total - LAG(total) OVER (ORDER BY month) AS change FROM m ORDER BY month"
  );

  add("string","easy","Email Domain",
    "Return the customer `name` and the part of the `email` after the `@` as `domain`. Sort by `customer_id`.",
    [customerTable],
    { cols: ["name", "domain"], rows: [
        ["Alice Smith","example.com"],
        ["Bob Jones","example.com"],
        ["Carol White","example.com"],
        ["Dave Brown","example.com"],
        ["Eve Davis","example.com"],
        ["Frank Miller","example.com"]
      ], ordered: true },
    ["instr(email, '@') finds the position; substr(email, position + 1) gives the rest."],
    "SELECT name, substr(email, instr(email, '@') + 1) AS domain FROM customers ORDER BY customer_id"
  );

  add("string","medium","Customer Initials",
    "Return `name` and the upper-case initials `initials` (first letter of the first name + first letter of the last name, e.g. `AS`). All names have exactly two words. Sort by `customer_id`.",
    [customerTable],
    { cols: ["name", "initials"], rows: [
        ["Alice Smith","AS"],
        ["Bob Jones","BJ"],
        ["Carol White","CW"],
        ["Dave Brown","DB"],
        ["Eve Davis","ED"],
        ["Frank Miller","FM"]
      ], ordered: true },
    ["substr(name, 1, 1) is the first initial; the second one starts right after instr(name, ' '). Join with ||."],
    "SELECT name, upper(substr(name, 1, 1)) || upper(substr(name, instr(name, ' ') + 1, 1)) AS initials FROM customers ORDER BY customer_id"
  );

  add("date","easy","Orders in March 2024",
    "Return `order_id` and `order_date` of every order placed in March 2024. Sort by `order_id`.",
    [orderTable],
    { cols: ["order_id", "order_date"], rows: [
        [5,"2024-03-01"],
        [6,"2024-03-10"],
        [7,"2024-03-20"]
      ], ordered: true },
    ["BETWEEN '2024-03-01' AND '2024-03-31' works on ISO date text."],
    "SELECT order_id, order_date FROM orders WHERE order_date BETWEEN '2024-03-01' AND '2024-03-31' ORDER BY order_id"
  );

  add("date","medium","Years of Service",
    "Return each employee `name` and the whole number of years `years` between `hire_date` and 2024-12-31 (use days / 365.25 and drop the decimals). Sort by name.",
    [empTable],
    { cols: ["name", "years"], rows: [
        ["Alice",5],
        ["Bob",4],
        ["Carol",6],
        ["Dave",3],
        ["Eve",7],
        ["Frank",2],
        ["Grace",2],
        ["Heidi",4],
        ["Ivan",5],
        ["Judy",3]
      ], ordered: true },
    ["julianday(a) - julianday(b) gives days; divide by 365.25 and CAST(... AS INTEGER)."],
    "SELECT name, CAST((julianday('2024-12-31') - julianday(hire_date)) / 365.25 AS INTEGER) AS years FROM employees ORDER BY name"
  );

  add("adv","medium","Salary Bands",
    "Return `name` and a column `band`: `High` for salary 90000 or more, `Mid` for 70000 or more, otherwise `Low`. Sort by `emp_id`.",
    [empTable],
    { cols: ["name", "band"], rows: [
        ["Alice","High"],
        ["Bob","Mid"],
        ["Carol","Mid"],
        ["Dave","Low"],
        ["Eve","High"],
        ["Frank","Low"],
        ["Grace","Low"],
        ["Heidi","Mid"],
        ["Ivan","High"],
        ["Judy","Low"]
      ], ordered: true },
    ["A CASE WHEN ... THEN ... ELSE ... END expression; check the highest limit first."],
    "SELECT name, CASE WHEN salary >= 90000 THEN 'High' WHEN salary >= 70000 THEN 'Mid' ELSE 'Low' END AS band FROM employees ORDER BY emp_id"
  );

  add("adv","hard","Management Depth",
    "`manager_id` links an employee to their manager. People without a manager have depth 0, their direct reports depth 1, and so on. Return `name` and `depth` using a recursive CTE. Sort by depth, then name.",
    [empTable],
    { cols: ["name", "depth"], rows: [
        ["Alice",0],
        ["Carol",0],
        ["Frank",0],
        ["Bob",1],
        ["Dave",1],
        ["Eve",1],
        ["Grace",1],
        ["Heidi",1],
        ["Ivan",1],
        ["Judy",1]
      ], ordered: true },
    ["Start with the rows where manager_id IS NULL, then UNION ALL a join of employees with the CTE (manager_id = cte.emp_id) and depth + 1."],
    "WITH RECURSIVE chain(emp_id, name, depth) AS (SELECT emp_id, name, 0 FROM employees WHERE manager_id IS NULL UNION ALL SELECT e.emp_id, e.name, c.depth + 1 FROM employees e JOIN chain c ON e.manager_id = c.emp_id) SELECT name, depth FROM chain ORDER BY depth, name"
  );

  /* ══════════════════════════════════════════════════════════════════════ */
  (window.QUADRA_DATA = window.QUADRA_DATA || {}).sql = {
    categories: CATEGORIES,
    questions: QUESTIONS
  };
})();
