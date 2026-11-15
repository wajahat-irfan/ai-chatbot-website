// AI Chatbot Website — simple rule-based chatbot (keyword matching, no AI model).
(function () {
  "use strict";

  var LINKEDIN = "https://www.linkedin.com/in/wajahat-irfan/";
  var GITHUB = "https://github.com/footballwaju72626-ctrl";

  var chatWindow = document.getElementById("chatWindow");
  var form = document.getElementById("chatForm");
  var input = document.getElementById("chatInput");

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Rules: each has keywords and a reply (plain text or HTML for links).
  var rules = [
    {
      keywords: ["skill", "skills", "what can you do", "good at", "technolog"],
      reply:
        "Wajahat's skills are: Python, Cybersecurity, Computer Networking, Linux, Problem Solving, Web Development, and AI. " +
        "He is a BS Computer Science student (7th semester) at GPGC No. 1 Abbottabad."
    },
    {
      keywords: ["cyber", "security", "phishing", "password", "hack", "safe", "tip"],
      reply:
        "Here is a quick cybersecurity tip: use a long, unique password for every important account, turn on two-factor authentication, " +
        "and never click links in unexpected emails or texts — open the app or website yourself instead. Want more tips? Check out his Cyber News Dashboard project."
    },
    {
      keywords: ["ai automation", "automation", "agent", "automate", "ai"],
      reply:
        "AI automation means using software agents to handle repetitive work automatically — for example drafting email replies, " +
        "summarising documents, or organising meeting notes. Wajahat is learning to build small AI automation agents in Python, " +
        "and he is interested in AI Automation Agents as a career direction."
    },
    {
      keywords: ["linkedin", "github", "contact", "find", "online", "profile", "link"],
      reply:
        'You can find Wajahat here: <a href="' + LINKEDIN + '" target="_blank" rel="noopener">LinkedIn</a> ' +
        'and <a href="' + GITHUB + '" target="_blank" rel="noopener">GitHub</a>.'
    },
    {
      keywords: ["who are you", "your name", "about wajahat", "wajahat", "study", "university", "college", "education"],
      reply:
        "Wajahat Irfan is a BS Computer Science student in his 7th semester at GPGC No. 1 Abbottabad, Pakistan. " +
        "He is interested in Cybersecurity and AI Automation Agents and is open to internships in those areas."
    },
    {
      keywords: ["hello", "hi", "hey", "salam", "aoa"],
      reply:
        "Hello! Ask me about Wajahat's skills, cybersecurity tips, AI automation, or where to find him online."
    },
    {
      keywords: ["project", "portfolio"],
      reply:
        "Wajahat is building student projects in cybersecurity, web development, and AI automation — including a port scanner, " +
        "a password strength checker, a job tracker dashboard, and this chatbot. You can see them on his GitHub profile."
    }
  ];

  var fallback =
    "I'm a simple rule-based bot, so I only understand a few topics. Try asking about Wajahat's " +
    "skills, cybersecurity tips, AI automation, or his LinkedIn and GitHub links.";

  function getReply(text) {
    var lower = text.toLowerCase();
    for (var i = 0; i < rules.length; i++) {
      for (var j = 0; j < rules[i].keywords.length; j++) {
        if (lower.indexOf(rules[i].keywords[j]) !== -1) {
          return rules[i].reply;
        }
      }
    }
    return fallback;
  }

  function addMessage(html, isUser) {
    var div = document.createElement("div");
    div.className = "message " + (isUser ? "user" : "bot");
    var p = document.createElement("p");
    if (isUser) {
      p.textContent = html; // user text is never inserted as HTML
    } else {
      p.innerHTML = html; // bot replies are fixed strings written in this file
    }
    div.appendChild(p);
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function handleQuestion(text) {
    var trimmed = text.trim();
    if (!trimmed) {
      return;
    }
    addMessage(trimmed, true);
    // Small delay so it feels like a reply, not instant text.
    setTimeout(function () {
      addMessage(getReply(trimmed), false);
    }, 400);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var text = input.value;
    input.value = "";
    handleQuestion(text);
    input.focus();
  });

  document.querySelectorAll(".chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      handleQuestion(chip.getAttribute("data-question"));
      input.focus();
    });
  });
})();
