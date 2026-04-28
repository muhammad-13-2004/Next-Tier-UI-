export const ROADMAPS = [
  {
    id: "python-ds",
    iconName: "python",
    iconBg: "#EEF2FF",
    accentColor: "#7AE84A",
    title: "Python for Data Science",
    subtitle: "Master core libraries and analytical workflows for modern data science.",
    status: "in-progress",
    progress: 64,
    modules: [
      {
        id: "m1",
        title: "Module 1: Python Basics",
        subtitle: "Syntax, variables, and primitive data types.",
        xp: 150,
        time: "2h 30m",
        status: "completed",
        lessons: [
          {
  id: "l1",
  position: 1,
  title: "Variables & Data Types",
  status: "completed",
  xp_reward: 40,
  content: "## Variables & Data Types\n\n### 1. What is a Variable?\nThink of a variable as a **labeled box** where you store data. You give the box a name (label) and put a value inside it.\n\n### 2. Dynamic Typing\nPython is **dynamically typed**. You do not need to declare the type (e.g., `int`, `string`) explicitly. Python figures it out based on the value you assign.\n\npython\n# No need to say 'int x = 5'\nx = 5          # Python knows this is an integer\nx = \"Hello\"    # Now Python knows this is a string\n\n\n### 3. Naming Conventions (PEP 8)\n- Use **snake_case** (lowercase with underscores).\n- Cannot start with a number.\n- Case-sensitive (`age` is different from `Age`).\n\npython\nuser_name = \"Alice\"  # ✅ Good\nuserName = \"Alice\"   # ❌ Avoid (Java style)\n1st_user = \"Bob\"     # ❌ Error (Cannot start with number)\n\n\n### 4. Core Data Types\n| Type | Description | Example |\n| :--- | :--- | :--- |\n| `int` | Whole numbers | `age = 25` |\n| `float` | Decimal numbers | `price = 19.99` |\n| `str` | Text data | `name = \"Alice\"` |\n| `bool` | True/False logic | `is_active = True` |\n\n### 5. Realistic Data Science Example\nImagine you are loading a row of customer data. Each column corresponds to a specific data type.\n\npython\n# Customer Record\ncustomer_id = 101                  # int (Unique Identifier)\nsubscription_cost = 29.99          # float (Currency)\nemail = \"user@example.com\"         # str (Text)\nis_premium = True                  # bool (Status Flag)\n\n# Check types dynamically\nprint(type(subscription_cost))     # Output: <class 'float'>\n\n\n### 6. Common Pitfall: Input is String\nWhen getting user input, Python treats it as a string by default. You must convert it for math.\n\npython\nage = input(\"Enter age: \")  # User types 25\n# print(age + 1)            # ❌ Error: Can't add int to str\n\nage = int(age)              # ✅ Convert to integer\nprint(age + 1)              # Output: 26\n```",
  quiz: [
    {
      "question": "Which data type is used for whole numbers?",
      "options": ["float", "int", "str", "bool"],
      "correctIndex": 1
    },
    {
      "question": "What is the recommended naming convention for Python variables?",
      "options": ["camelCase", "PascalCase", "snake_case", "kebab-case"],
      "correctIndex": 2
    },
    {
      "question": "What does type('3.14') return?",
      "options": ["<class 'int'>", "<class 'str'>", "<class 'float'>", "<class 'double'>"],
      "correctIndex": 2
    }
  ],
  challenge: null,
},
          {
            id: "l2",
            position: 2,
            title: "Control Flow & Loops",
            status: "completed",
            xp_reward: 50,
            content: "## Control Flow\n\nUse `if`, `elif`, and `else` for conditions.\n\n### Loops\n- `for`: Iterate over sequences.\n- `while`: Run while condition is true.\n\n### Example\npython\nfor i in range(5):\n    if i % 2 == 0:\n        print(f\"{i} is even\")\n",
            quiz: [
              {
                "question": "Which keyword is used to start a conditional block?",
                "options": ["when", "if", "check", "loop"],
                "correctIndex": 1
              }
            ],
            challenge: null,
          },
          {
            id: "l3",
            position: 3,
            title: "Functions Intro",
            status: "completed",
            xp_reward: 60,
            content: "## Functions\n\nFunctions organize code into reusable blocks using `def`.\n\n### Syntax\npython\ndef greet(name):\n    return f\"Hello, {name}\"\n\nprint(greet(\"Bob\"))\n",
            quiz: [
              {
                "question": "What keyword defines a function?",
                "options": ["func", "def", "define", "function"],
                "correctIndex": 1
              }
            ],
            challenge: null,
          },
        ],
      },
      {
        id: "m2",
        title: "Module 2: Functions & Modules",
        subtitle: "Building reusable logic and managing project structure.",
        xp: 250,
        time: "4h 15m",
        status: "in-progress",
        lessons: [
          {
            id: "l4",
            position: 1,
            title: "Defining Custom Functions",
            status: "in-progress",
            resumeLabel: "Resume",
            xp_reward: 60,
            content: "## Custom Functions\n\nDefine parameters and return values to create flexible logic.\n\n### Best Practices\n- Use descriptive names.\n- Keep functions small (Single Responsibility).\n\npython\ndef add(a, b):\n    return a + b\n",
            quiz: [
              {
                "question": "What happens if a function has no return statement?",
                "options": ["Error", "Returns 0", "Returns None", "Returns True"],
                "correctIndex": 2
              }
            ],
            challenge: null,
          },
          {
            id: "l5",
            position: 2,
            title: "Arguments & Return Values",
            status: "locked",
            xp_reward: 60,
            content: "## Arguments\n\n- **Positional**: Order matters.\n- **Keyword**: Name matters (`func(a=1)`).\n- **Default**: `def func(a=1)`.\n\n### Returning Multiple Values\npython\ndef get_coords():\n    return 10, 20\n",
            quiz: [
              {
                "question": "Can Python functions return multiple values?",
                "options": ["No", "Yes, as a tuple", "Yes, as a list", "Only one"],
                "correctIndex": 1
              }
            ],
            challenge: null,
          },
          {
            id: "l6",
            position: 3,
            title: "Importing Standard Modules",
            status: "locked",
            xp_reward: 70,
            content: "## Modules\n\nUse `import` to access external code.\n\n### Example\npython\nimport math\nprint(math.sqrt(16))\n\nfrom datetime import datetime\n",
            quiz: [
              {
                "question": "How do you import the math module?",
                "options": ["include math", "import math", "require math", "using math"],
                "correctIndex": 1
              }
            ],
            challenge: null,
          },
        ],
        nextConcept: {
          title: "Scope and Lambda Expressions",
          desc: "Understand global vs local namespace and how to write concise anonymous functions.",
        },
      },
      {
        id: "m3",
        title: "Module 3: NumPy & Data Arrays",
        subtitle: "Foundations of numerical computing in Python.",
        xp: 400,
        time: "5h 45m",
        status: "locked",
        lessons: [
          {
            id: "l7",
            position: 1,
            title: "Introduction to NumPy",
            status: "locked",
            xp_reward: 80,
            content: "## NumPy\n\nNumerical Python library. Faster than lists for math.\n\n### Installation\n`pip install numpy`\n\n### Import\npython\nimport numpy as np\n",
            quiz: [
              {
                "question": "What is the standard alias for NumPy?",
                "options": ["num", "np", "npy", "numpy"],
                "correctIndex": 1
              }
            ],
            challenge: null,
          },
          {
            id: "l8",
            position: 2,
            title: "Arrays & Indexing",
            status: "locked",
            xp_reward: 80,
            content: "## N-Dimensional Arrays\n\npython\narr = np.array([1, 2, 3])\nprint(arr[0]) # 1\n\n# 2D Array\nmatrix = np.array([[1, 2], [3, 4]])\n",
            quiz: [
              {
                "question": "What is the main data structure in NumPy?",
                "options": ["List", "DataFrame", "ndarray", "Dict"],
                "correctIndex": 2
              }
            ],
            challenge: null,
          },
          {
            id: "l9",
            position: 3,
            title: "Array Operations",
            status: "locked",
            xp_reward: 90,
            content: "## Vectorized Operations\n\nPerform math on entire arrays without loops.\n\npython\na = np.array([1, 2, 3])\nprint(a + 10) # [11, 12, 13]\n",
            quiz: [
              {
                "question": "What happens when you add 10 to a NumPy array?",
                "options": ["Error", "Adds 10 to first element", "Adds 10 to all elements", "Appends 10"],
                "correctIndex": 2
              }
            ],
            challenge: null,
          },
          {
            id: "l10",
            position: 4,
            title: "Broadcasting & Reshaping",
            status: "locked",
            xp_reward: 100,
            content: "## Reshaping\n\npython\narr = np.arange(6)\narr.reshape(2, 3)\n\n# Broadcasting\n# Automatically expands smaller arrays to match larger ones.\n",
            quiz: [
              {
                "question": "Which method changes the shape of an array?",
                "options": ["change()", "shape()", "reshape()", "fit()"],
                "correctIndex": 2
              }
            ],
            challenge: null,
          },
        ],
      },
      {
        id: "m4",
        title: "Module 4: Pandas for Data Wrangling",
        subtitle: "DataFrames, Series, and complex data manipulation.",
        xp: 500,
        time: "8h 20m",
        status: "locked",
        lessons: [
          {
            id: "l11",
            position: 1,
            title: "DataFrames & Series",
            status: "locked",
            xp_reward: 100,
            content: "## Pandas Structures\n\n- **Series**: 1D labeled array.\n- **DataFrame**: 2D labeled table.\n\npython\nimport pandas as pd\ndf = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})\n",
            quiz: [
              {
                "question": "What is a 2D Pandas structure called?",
                "options": ["Series", "Table", "DataFrame", "Matrix"],
                "correctIndex": 2
              }
            ],
            challenge: null,
          },
          {
            id: "l12",
            position: 2,
            title: "Loading & Inspecting Data",
            status: "locked",
            xp_reward: 100,
            content: "## IO Functions\n\npython\ndf = pd.read_csv('data.csv')\ndf.head() # First 5 rows\ndf.info() # Data types\n",
            quiz: [
              {
                "question": "Which function reads a CSV file?",
                "options": ["read_csv()", "load_csv()", "open_csv()", "get_csv()"],
                "correctIndex": 0
              }
            ],
            challenge: null,
          },
          {
            id: "l13",
            position: 3,
            title: "Filtering & Sorting",
            status: "locked",
            xp_reward: 110,
            content: "## Selection\n\npython\n# Filter\ndf[df['A'] > 1]\n\n# Sort\ndf.sort_values('A', ascending=False)\n",
            quiz: [
              {
                "question": "How do you sort values in a DataFrame?",
                "options": ["order_by()", "sort_values()", " arrange()", "sort()"],
                "correctIndex": 1
              }
            ],
            challenge: null,
          },
          {
            id: "l14",
            position: 4,
            title: "GroupBy & Aggregation",
            status: "locked",
            xp_reward: 110,
            content: "## GroupBy\n\nSplit-Apply-Combine strategy.\n\npython\ndf.groupby('Category')['Price'].mean()\n",
            quiz: [
              {
                "question": "What method is used for grouping data?",
                "options": ["group()", "cluster()", "groupby()", "split()"],
                "correctIndex": 2
              }
            ],
            challenge: null,
          },
          {
            id: "l15",
            position: 5,
            title: "Handling Missing Data",
            status: "locked",
            xp_reward: 80,
            content: "## Null Values\n\npython\ndf.isnull().sum()\ndf.dropna() # Remove\ndf.fillna(0) # Replace\n",
            quiz: [
              {
                "question": "Which method removes missing values?",
                "options": ["remove_na()", "dropna()", "clean()", "delete()"],
                "correctIndex": 1
              }
            ],
            challenge: null,
          },
        ],
      },
      {
        id: "m5",
        title: "Module 5: Data Visualisation",
        subtitle: "Matplotlib, Seaborn, and storytelling with charts.",
        xp: 350,
        time: "4h 00m",
        status: "locked",
        lessons: [
          {
            id: "l16",
            position: 1,
            title: "Matplotlib Basics",
            status: "locked",
            xp_reward: 80,
            content: "## Matplotlib\n\nLow-level plotting library.\n\npython\nimport matplotlib.pyplot as plt\nplt.plot([1, 2, 3], [4, 5, 6])\nplt.show()\n",
            quiz: [
              {
                "question": "Which function displays the plot?",
                "options": ["display()", "render()", "show()", "view()"],
                "correctIndex": 2
              }
            ],
            challenge: null,
          },
          {
            id: "l17",
            position: 2,
            title: "Seaborn for Statistical Plots",
            status: "locked",
            xp_reward: 90,
            content: "## Seaborn\n\nBuilt on Matplotlib, nicer defaults.\n\npython\nimport seaborn as sns\nsns.scatterplot(data=df, x='A', y='B')\n",
            quiz: [
              {
                "question": "Seaborn is built on top of which library?",
                "options": ["Pandas", "NumPy", "Matplotlib", "Plotly"],
                "correctIndex": 2
              }
            ],
            challenge: null,
          },
          {
            id: "l18",
            position: 3,
            title: "Chart Selection & Storytelling",
            status: "locked",
            xp_reward: 100,
            content: "## Choosing Charts\n\n- **Trend**: Line Chart\n- **Comparison**: Bar Chart\n- **Distribution**: Histogram\n\nFocus on clarity and removing clutter.",
            quiz: [
              {
                "question": "Which chart is best for showing trends over time?",
                "options": ["Pie Chart", "Line Chart", "Scatter Plot", "Heatmap"],
                "correctIndex": 1
              }
            ],
            challenge: null,
          },
        ],
      },
    ],
  },
  {
    id: "ux-figma",
    iconName: "design",
    iconBg: "#FDF4FF",
    accentColor: "#a78bfa",
    title: "UI/UX Design with Figma",
    subtitle: "Go from wireframes to polished prototypes with modern design thinking.",
    status: "in-progress",
    progress: 35,
    modules: [
      {
        id: "u1",
        title: "Module 1: Design Fundamentals",
        subtitle: "Colour theory, typography, and layout principles.",
        xp: 120,
        time: "2h 00m",
        status: "completed",
        lessons: [
          {
            id: "ul1",
            position: 1,
            title: "Colour & Contrast",
            status: "completed",
            xp_reward: 40,
            content: "## Colour Theory\n\n- **Primary**: Brand color.\n- **Secondary**: Supportive colors.\n- **Contrast**: Ensure text is readable (WCAG standards).",
            quiz: [
              {
                "question": "Why is contrast important?",
                "options": ["Aesthetics", "Readability", "Speed", "Cost"],
                "correctIndex": 1
              }
            ],
            challenge: null,
          },
          {
            id: "ul2",
            position: 2,
            title: "Typography Basics",
            status: "completed",
            xp_reward: 40,
            content: "## Typography\n\n- **Hierarchy**: H1, H2, Body.\n- **Font Pairing**: Max 2-3 fonts.\n- **Line Height**: Usually 1.5x font size.",
            quiz: [
              {
                "question": "What defines visual hierarchy in text?",
                "options": ["Color only", "Size & Weight", "Alignment", "Spacing"],
                "correctIndex": 1
              }
            ],
            challenge: null,
          },
          {
            id: "ul3",
            position: 3,
            title: "Grid & Spacing",
            status: "completed",
            xp_reward: 40,
            content: "## Grids\n\nUse 8pt grid system for consistency.\n\n- **Margins**: Outer space.\n- **Gutters**: Space between columns.",
            quiz: [
              {
                "question": "What is a common spacing unit in UI design?",
                "options": ["5px", "8px", "10px", "12px"],
                "correctIndex": 1
              }
            ],
            challenge: null,
          },
        ],
      },
      {
        id: "u2",
        title: "Module 2: Figma Essentials",
        subtitle: "Frames, components, auto-layout, and variants.",
        xp: 200,
        time: "3h 30m",
        status: "in-progress",
        lessons: [
          {
            id: "ul4",
            position: 1,
            title: "Frames & Groups",
            status: "in-progress",
            resumeLabel: "Resume",
            xp_reward: 50,
            content: "## Frames\n\nFrames are containers with clipping properties (unlike Groups).\n\n- Press `F` to create.\n- Use for screens and components.",
            quiz: [
              {
                "question": "What is the shortcut to create a Frame?",
                "options": ["G", "F", "A", "C"],
                "correctIndex": 1
              }
            ],
            challenge: null,
          },
          {
            id: "ul5",
            position: 2,
            title: "Components & Variants",
            status: "locked",
            xp_reward: 60,
            content: "## Components\n\nReusable elements (Master & Instance).\n\n- **Variants**: Different states (Hover, Pressed) in one component.",
            quiz: [
              {
                "question": "What is a reusable element called in Figma?",
                "options": ["Symbol", "Component", "Module", "Block"],
                "correctIndex": 1
              }
            ],
            challenge: null,
          },
          {
            id: "ul6",
            position: 3,
            title: "Auto-layout Deep Dive",
            status: "locked",
            xp_reward: 70,
            content: "## Auto-layout\n\nMakes designs responsive.\n\n- Adds padding automatically.\n- Adjusts spacing between items.\n- Shortcut: `Shift + A`.",
            quiz: [
              {
                "question": "What does Auto-layout primarily handle?",
                "options": ["Colors", "Spacing & Padding", "Fonts", "Images"],
                "correctIndex": 1
              }
            ],
            challenge: null,
          },
        ],
        nextConcept: {
          title: "Components & Variants",
          desc: "Build a scalable design system using reusable components and variant states.",
        },
      },
      {
        id: "u3",
        title: "Module 3: Prototyping & Interactions",
        subtitle: "Clickable prototypes and micro-interaction design.",
        xp: 280,
        time: "4h 00m",
        status: "locked",
        lessons: [
          {
            id: "ul7",
            position: 1,
            title: "Prototype Basics in Figma",
            status: "locked",
            xp_reward: 70,
            content: "## Prototyping\n\nConnect frames using the Prototype tab.\n\n- **Interaction**: On Click, On Hover.\n- **Animation**: Instant, Dissolve, Smart Animate.",
            quiz: [
              {
                "question": "Where do you set up interactions?",
                "options": ["Design Tab", "Prototype Tab", "Inspect Tab", "Layer Tab"],
                "correctIndex": 1
              }
            ],
            challenge: null,
          },
          {
            id: "ul8",
            position: 2,
            title: "Transitions & Animations",
            status: "locked",
            xp_reward: 70,
            content: "## Smart Animate\n\nMatches layers between frames to create smooth motion.\n\n- Use for sliders, toggles, and page transitions.",
            quiz: [
              {
                "question": "Which animation type matches layer names?",
                "options": ["Dissolve", "Smart Animate", "Slide", "Fade"],
                "correctIndex": 1
              }
            ],
            challenge: null,
          },
          {
            id: "ul9",
            position: 3,
            title: "Interactive Components",
            status: "locked",
            xp_reward: 80,
            content: "## Interactive Components\n\nDefine interactions inside a component itself.\n\n- Reduces prototype clutter.\n- Great for buttons and inputs.",
            quiz: [
              {
                "question": "Where are interactions defined in Interactive Components?",
                "options": ["Frame level", "Component level", "Page level", "File level"],
                "correctIndex": 1
              }
            ],
            challenge: null,
          },
          {
            id: "ul10",
            position: 4,
            title: "Micro-interaction Design",
            status: "locked",
            xp_reward: 80,
            content: "## Micro-interactions\n\nSmall animations that provide feedback.\n\n- Like button animation.\n- Loading spinners.\n- Form validation cues.",
            quiz: [
              {
                "question": "What is the main purpose of micro-interactions?",
                "options": ["Decoration", "Feedback", "Speed", "Storage"],
                "correctIndex": 1
              }
            ],
            challenge: null,
          },
        ],
      },
      {
        id: "u4",
        title: "Module 4: User Research",
        subtitle: "Interviews, usability testing, and synthesis.",
        xp: 200,
        time: "3h 00m",
        status: "locked",
        lessons: [
          {
            id: "ul11",
            position: 1,
            title: "Planning User Interviews",
            status: "locked",
            xp_reward: 60,
            content: "## Interviews\n\n- Prepare open-ended questions.\n- Avoid leading questions.\n- Record (with permission) for analysis.",
            quiz: [
              {
                "question": "What type of questions should you ask?",
                "options": ["Yes/No", "Leading", "Open-ended", "Multiple Choice"],
                "correctIndex": 2
              }
            ],
            challenge: null,
          },
          {
            id: "ul12",
            position: 2,
            title: "Usability Testing",
            status: "locked",
            xp_reward: 70,
            content: "## Testing\n\nObserve users completing tasks.\n\n- **Moderated**: You guide them.\n- **Unmoderated**: They do it alone.",
            quiz: [
              {
                "question": "What is the goal of usability testing?",
                "options": ["Sell Product", "Find Issues", "Write Code", "Design Logo"],
                "correctIndex": 1
              }
            ],
            challenge: null,
          },
          {
            id: "ul13",
            position: 3,
            title: "Synthesis & Affinity Mapping",
            status: "locked",
            xp_reward: 70,
            content: "## Synthesis\n\nGroup insights from research.\n\n- **Affinity Map**: Cluster sticky notes by theme.\n- Identify patterns and pain points.",
            quiz: [
              {
                "question": "What tool is used for clustering insights?",
                "options": ["Gantt Chart", "Affinity Map", "Pie Chart", "Wireframe"],
                "correctIndex": 1
              }
            ],
            challenge: null,
          },
        ],
      },
    ],
  },
];