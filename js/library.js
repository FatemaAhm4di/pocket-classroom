// library.js
import { generateId, saveCapsule, saveCapsuleIndex, getCapsuleIndex, getCapsule, deleteCapsule } from './storage.js'; 

function timeAgo(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now - date; 
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : '4'} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return '';
}

let sampleDataCreated = false;

function initSampleData() {
  if (sampleDataCreated) return;
  const index = getCapsuleIndex();
  if (index.length > 0) {
    sampleDataCreated = true;
    return;
  }

  const now = new Date();
  const samples = [
    {
      title: "Programming",
      subject: "Computer Science",
      level: "Intermediate",
      description: "Core concepts of JavaScript, HTML, and CSS.",
      icon: "bi-code-slash",
      notes: [
        "JavaScript is a versatile scripting language for web development.",
        "HTML structures content; CSS styles it; JS adds interactivity.",
        "Use let/const instead of var for block-scoped variables.",
        "DOM manipulation allows dynamic content updates.",
        "Event listeners handle user interactions like clicks and keypresses."
      ],
      flashcards: [
        { front: "What does DOM stand for?", back: "Document Object Model" },
        { front: "Which method selects an element by ID?", back: "document.getElementById()" },
        { front: "What is the correct way to declare a constant?", back: "const myVar = value;" },
        { front: "How do you add an event listener?", back: "element.addEventListener('click', handler);" },
        { front: "What is the purpose of CSS?", back: "To style HTML content (colors, layout, fonts, etc.)" }
      ],
      quiz: [
        {
          question: "Which of the following is NOT a JavaScript data type?",
          choices: ["String", "Boolean", "Float", "Object"],
          correct: 2
        },
        {
          question: "How do you select an HTML element with id='myId'?",
          choices: ["document.getElement('myId')", "document.getElementById('myId')", "document.querySelector('#myId')", "Both B and C"],
          correct: 3
        },
        {
          question: "What does 'const' mean in JavaScript?",
          choices: ["The variable can be reassigned", "The variable is constant and cannot be changed", "It declares a function", "It is short for 'constructor'"],
          correct: 1
        },
        {
          question: "Which event is triggered when a user clicks a button?",
          choices: ["onhover", "onchange", "onclick", "onsubmit"],
          correct: 2
        },
        {
          question: "What is the main purpose of HTML?",
          choices: ["Styling web pages", "Adding interactivity", "Structuring content", "Handling server requests"],
          correct: 2
        }
      ]
    },
    {
      title: "Graphic Design",
      subject: "Design",
      level: "Advanced",
      description: "Color theory, typography, and composition principles.",
      icon: "bi-palette",
      notes: [
        "CMYK is used for print; RGB for digital screens.",
        "The rule of thirds creates balanced compositions.",
        "Typography hierarchy guides the viewer’s eye.",
        "Contrast improves readability and visual interest.",
        "White space (negative space) prevents clutter."
      ],
      flashcards: [
        { front: "What does CMYK stand for?", back: "Cyan, Magenta, Yellow, Key (Black)" },
        { front: "Define kerning.", back: "Adjusting space between individual letters" },
        { front: "What is the rule of thirds?", back: "A composition guideline that divides the image into 9 equal parts" },
        { front: "Which color model is for web?", back: "RGB (Red, Green, Blue)" },
        { front: "What is white space?", back: "Empty space around design elements that improves clarity" }
      ],
      quiz: [
        {
          question: "Which color model is used for digital screens?",
          choices: ["CMYK", "Pantone", "RGB", "LAB"],
          correct: 2
        },
        {
          question: "What is kerning?",
          choices: ["Font size", "Line spacing", "Letter spacing", "Color contrast"],
          correct: 2
        },
        {
          question: "What does the rule of thirds help with?",
          choices: ["File compression", "Color selection", "Visual balance", "Text alignment"],
          correct: 2
        },
        {
          question: "What is the purpose of white space?",
          choices: ["To save ink", "To reduce file size", "To improve readability", "To add color"],
          correct: 2
        },
        {
          question: "Which is a principle of good typography?",
          choices: ["Use as many fonts as possible", "Maintain visual hierarchy", "Always use bold", "Ignore alignment"],
          correct: 1
        }
      ]
    },
    {
      title: "Mathematics",
      subject: "Math",
      level: "Beginner",
      description: "Algebra, geometry, and basic calculus fundamentals.",
      icon: "bi-calculator",
      notes: [
        "The Pythagorean theorem: a² + b² = c²",
        "Slope = rise / run = (y₂ - y₁) / (x₂ - x₁)",
        "Quadratic formula: x = [-b ± √(b² - 4ac)] / 2a",
        "Area of a circle = πr²",
        "Sum of angles in a triangle = 180°"
      ],
      flashcards: [
        { front: "What is the area of a circle?", back: "πr²" },
        { front: "Solve: 2x + 5 = 15", back: "x = 5" },
        { front: "What is √144?", back: "12" },
        { front: "What is the sum of angles in a triangle?", back: "180 degrees" },
        { front: "What is the slope formula?", back: "(y₂ - y₁) / (x₂ - x₁)" }
      ],
      quiz: [
        {
          question: "What is √144?",
          choices: ["10", "12", "14", "16"],
          correct: 1
        },
        {
          question: "What is the area of a circle with radius 3?",
          choices: ["9", "6π", "9π", "18"],
          correct: 2
        },
        {
          question: "Solve for x: 3x - 7 = 8",
          choices: ["3", "5", "7", "9"],
          correct: 1
        },
        {
          question: "What is the sum of angles in a triangle?",
          choices: ["90°", "180°", "270°", "360°"],
          correct: 1
        },
        {
          question: "Which is the quadratic formula?",
          choices: ["x = -b ± √(b² - 4ac)", "x = [-b ± √(b² - 4ac)] / 2a", "x = b² - 4ac", "x = -b / 2a"],
          correct: 1
        }
      ]
    },
    {
      title: "English",
      subject: "Language",
      level: "Beginner",
      description: "Grammar, vocabulary, and everyday conversation skills.",
      icon: "bi-book",
      notes: [
        "Present simple: I eat, she eats (for habits/facts).",
        "Past simple: I ate, she ate (for completed actions).",
        "Articles: 'a' before consonants, 'an' before vowels.",
        "Adjectives describe nouns (e.g., beautiful, tall).",
        "Adverbs modify verbs (e.g., quickly, carefully)."
      ],
      flashcards: [
        { front: "Past tense of 'go'?", back: "went" },
        { front: "Use 'a' or 'an' before 'hour'?", back: "'an' (silent 'h')" },
        { front: "What is an adjective?", back: "A word that describes a noun (e.g., happy, blue)" },
        { front: "What is an adverb?", back: "A word that modifies a verb (e.g., slowly, well)" },
        { front: "Which sentence is correct?", back: "'She goes to school.'" }
      ],
      quiz: [
        {
          question: "Which sentence is correct?",
          choices: ["She go to school.", "She goes to school.", "She going to school.", "She gone to school."],
          correct: 1
        },
        {
          question: "What is the past tense of 'eat'?",
          choices: ["eated", "ate", "eaten", "eating"],
          correct: 1
        },
        {
          question: "Which article is used before 'university'?",
          choices: ["a", "an", "the", "no article"],
          correct: 0
        },
        {
          question: "What part of speech is 'quickly'?",
          choices: ["Noun", "Verb", "Adjective", "Adverb"],
          correct: 3
        },
        {
          question: "Which is a correct use of 'an'?",
          choices: ["an dog", "an university", "an hour", "an cat"],
          correct: 2
        }
      ]
    },
    {
      title: "Anatomy",
      subject: "Biology",
      level: "Intermediate",
      description: "Human muscular, skeletal, and nervous systems.",
      icon: "bi-heart-pulse",
      notes: [
        "The human body has 206 bones in the adult skeleton.",
        "The heart has four chambers: 2 atria, 2 ventricles.",
        "Neurons transmit electrical signals in the nervous system.",
        "The brain is protected by the skull and cerebrospinal fluid.",
        "Muscles work in pairs (e.g., biceps and triceps)."
      ],
      flashcards: [
        { front: "How many bones in the adult human body?", back: "206" },
        { front: "What pumps oxygenated blood to the body?", back: "Left ventricle" },
        { front: "What transmits nerve signals?", back: "Neurons" },
        { front: "Which organ produces insulin?", back: "Pancreas" },
        { front: "What protects the brain?", back: "Skull and cerebrospinal fluid" }
      ],
      quiz: [
        {
          question: "How many bones are in the adult human body?",
          choices: ["150", "206", "300", "100"],
          correct: 1
        },
        {
          question: "Which organ produces insulin?",
          choices: ["Liver", "Pancreas", "Kidney", "Stomach"],
          correct: 1
        },
        {
          question: "What are the functional units of the nervous system?",
          choices: ["Muscles", "Bones", "Neurons", "Cells"],
          correct: 2
        },
        {
          question: "How many chambers does the human heart have?",
          choices: ["2", "3", "4", "5"],
          correct: 2
        },
        {
          question: "Which system includes bones and joints?",
          choices: ["Muscular", "Nervous", "Skeletal", "Digestive"],
          correct: 2
        }
      ]
    },
    {
      title: "Chemistry",
      subject: "Chemistry",
      level: "Advanced",
      description: "Chemical reactions, periodic table, and equilibrium.",
      icon: "bi-flask",
      notes: [
        "The periodic table organizes elements by atomic number.",
        "Covalent bonds share electrons; ionic bonds transfer electrons.",
        "pH < 7 = acidic, pH = 7 = neutral, pH > 7 = basic.",
        "Atoms consist of protons, neutrons, and electrons.",
        "Chemical equations must be balanced (same atoms on both sides)."
      ],
      flashcards: [
        { front: "What is H₂O?", back: "Water" },
        { front: "Define molarity.", back: "Moles of solute per liter of solution" },
        { front: "What is the atomic number of Carbon?", back: "6" },
        { front: "What does pH measure?", back: "Acidity or basicity of a solution" },
        { front: "What is a covalent bond?", back: "A bond where atoms share electrons" }
      ],
      quiz: [
        {
          question: "What is the atomic number of Carbon?",
          choices: ["6", "8", "12", "14"],
          correct: 0
        },
        {
          question: "What is H₂O?",
          choices: ["Hydrogen peroxide", "Water", "Methane", "Ammonia"],
          correct: 1
        },
        {
          question: "What does pH = 7 mean?",
          choices: ["Acidic", "Basic", "Neutral", "Strongly acidic"],
          correct: 2
        },
        {
          question: "Which particles are in the nucleus of an atom?",
          choices: ["Electrons and protons", "Protons and neutrons", "Neutrons and electrons",
         "Only electrons"],
          correct: 1
        },
        {
          question: "What type of bond involves electron sharing?",
          choices: ["Ionic", "Metallic", "Covalent", "Hydrogen"],
          correct: 2
        }
      ]
    }
  ];


  const newIndex = [];
  samples.forEach(meta => {
    const id = generateId();
    const updatedAt = new Date();
    updatedAt.setDate(updatedAt.getDate() - (meta.updatedOffset || 0));

    const capsule = {
      id,
      schema: "pocket-classroom/v1",
      meta: {
        title: meta.title,
        subject: meta.subject,
        level: meta.level,
        description: meta.description,
        updatedAt: updatedAt.toISOString(),
        icon: meta.icon || 'bi-journal'
      },
      notes: meta.notes,
      flashcards: meta.flashcards,
      quiz: meta.quiz
    };
    saveCapsule(capsule);
    newIndex.push({ id, title: meta.title, subject: meta.subject, level: meta.level, updatedAt: capsule.meta.updatedAt });
  });
  saveCapsuleIndex(newIndex);
  sampleDataCreated = true;
}

// --- رندر کارت‌ها ---
function renderLibrary() {
  initSampleData();

  const grid = document.getElementById('library-grid');
  const empty = document.getElementById('library-empty');
  if (!grid) return;

  const index = getCapsuleIndex();
  grid.innerHTML = '';

  if (index.length === 0) {
    empty?.classList.remove('d-none');
    return;
  }

  empty?.classList.add('d-none');
  index.forEach(item => {
    const capsule = getCapsule(item.id);
    if (!capsule || !capsule.meta) return;

    const timeAgoText = timeAgo(capsule.meta.updatedAt || new Date().toISOString());

    const card = document.createElement('div');
    card.className = 'col-md-6 col-lg-4 mb-4';
    card.innerHTML = `
      <div class="card text-light h-100 shadow-sm" data-id="${capsule.id}">
        <div class="card-body d-flex flex-column">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h5 class="card-title mb-0">${capsule.meta.title}</h5>
            <span class="badge bg-${capsule.meta.level === 'Beginner' ? 'success' : capsule.meta.level === 'Intermediate' ? 'warning' : 'danger'}">${capsule.meta.level}</span>
          </div>
          <p class="card-text text-light small mb-2">
            <i class="${capsule.meta.icon} me-1"></i> ${capsule.meta.subject}
          </p>
          <p class="card-text text-light small"><i class="bi bi-clock me-1"></i> ${timeAgoText}</p>
          
          <div class="mt-auto d-flex gap-2 pt-3">
            <button class="btn btn-sm btn-outline-light flex-fill btn-learn" data-id="${capsule.id}">
              <i class="bi bi-mortarboard"></i> Learn
            </button>
            <button class="btn btn-sm btn-outline-warning btn-edit" data-id="${capsule.id}">
              <i class="bi bi-pencil"></i> Edit
            </button>
            <button class="btn btn-sm btn-outline-info btn-export" data-id="${capsule.id}">
              <i class="bi bi-download"></i> Export
            </button>
            <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${capsule.id}">
              <i class="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });


  setTimeout(() => {
    document.querySelectorAll('#library-grid .col-md-6').forEach(card => {
      card.classList.add('visible');
    });
  }, 100);
}


function setupGlobalButtons() {
  document.getElementById('cta-start')?.addEventListener('click', e => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('app:navigate', { detail: { to: 'library' } }));
  });

  document.getElementById('cta-create')?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('app:navigate', { detail: { to: 'author' } }));
  });

  document.getElementById('create-new-btn')?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('app:navigate', { detail: { to: 'author' } }));
  });

  document.getElementById('create-first-btn')?.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('app:navigate', { detail: { to: 'author' } }));
  });

  document.addEventListener('click', e => {
    const card = e.target.closest('[data-id]');
    const id = card?.dataset.id;
    if (!id) return;

    if (e.target.classList.contains('btn-edit')) {
      window.dispatchEvent(new CustomEvent('app:navigate', { detail: { to: 'author', id } }));
    }

    if (e.target.classList.contains('btn-learn')) {
      window.dispatchEvent(new CustomEvent('app:navigate', { detail: { to: 'learn', id } }));
    }

    if (e.target.classList.contains('btn-delete')) {
      if (confirm('Delete this capsule?')) {
        deleteCapsule(id);
        renderLibrary();
      }
    }

    if (e.target.classList.contains('btn-export')) {
      const capsule = getCapsule(id);
      if (!capsule) {
        alert('Capsule not found!');
        return;
      }
      const filename = (capsule.meta.title || 'capsule').toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
      const blob = new Blob([JSON.stringify(capsule, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  });

  // دکمه Import JSON
  document.getElementById('import-json-btn')?.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const json = JSON.parse(reader.result);
          if (json.schema !== 'pocket-classroom/v1') {
            alert('Invalid schema! Must be "pocket-classroom/v1".');
            return;
          }
          if (!json.meta?.title?.trim()) {
            alert('Title is required!');
            return;
          }
          const hasContent = (json.notes?.length || json.flashcards?.length || json.quiz?.length);
          if (!hasContent) {
            alert('At least one of Notes, Flashcards, or Quiz must exist!');
            return;
          }
          const id = generateId();
          const capsule = { ...json, id, meta: { ...json.meta, updatedAt: new Date().toISOString() } };
          saveCapsule(capsule);
          const index = getCapsuleIndex();
          index.push({ id, title: capsule.meta.title, subject: capsule.meta.subject, level: capsule.meta.level, updatedAt: capsule.meta.updatedAt });
          saveCapsuleIndex(index);
          renderLibrary();
          alert('Capsule imported successfully!');
        } catch {
          alert('Invalid JSON file!');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderLibrary();
  setupGlobalButtons();
});
