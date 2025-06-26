// Global variables
let currentMCQs = [];
let userAnswers = {};
let currentLanguage = 'vi';

// Debug: Check if elements exist
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded');
  const generator = document.getElementById('generator');
  const generatorWrapper = document.querySelector('.generator-wrapper');
  const configPanel = document.querySelector('.config-form');
  const resultsPanel = document.querySelector('.results-area');

  console.log('Generator section:', generator);
  console.log('Generator wrapper:', generatorWrapper);
  console.log('Config panel:', configPanel);
  console.log('Results panel:', resultsPanel);
});

// Language translations
const translations = {
  vi: {
    // Brand and Navigation
    brandName: "QuizGenius",

    // Hero Section
    heroBadge: "Được hỗ trợ bởi Gemini AI",
    heroTitle1: "Tạo câu hỏi trắc nghiệm",
    heroTitle2: "thông minh với AI",
    heroDescription: "Tự động tạo câu hỏi trắc nghiệm chất lượng cao cho bất kỳ chủ đề nào. Tiết kiệm thời gian, nâng cao chất lượng giảng dạy và học tập.",
    getStarted: "Bắt đầu ngay",
    learnMore: "Tìm hiểu thêm",
    questionsGenerated: "Câu hỏi đã tạo",
    happyUsers: "Người dùng hài lòng",
    subjects: "Chủ đề hỗ trợ",

    // Sample cards
    sampleQuestion: "Câu hỏi mẫu",
    sampleQuestionText: "Thủ đô của Pháp là gì?",
    smartAnswer: "Đáp án thông minh",
    smartAnswerText: "AI tự động tạo giải thích",
    multiFormat: "Đa định dạng",
    multiFormatText: "JSON, HTML, CSV, TXT",

    // Features Section
    featuresTitle: "Tính năng nổi bật",
    featuresSubtitle: "Khám phá những tính năng mạnh mẽ giúp bạn tạo câu hỏi một cách dễ dàng",
    aiPowered: "Trí tuệ nhân tạo",
    aiPoweredDesc: "Sử dụng Google Gemini AI để tạo câu hỏi chất lượng cao và phù hợp",
    multiLanguage: "Đa ngôn ngữ",
    multiLanguageDesc: "Hỗ trợ tiếng Việt và tiếng Anh, dễ dàng chuyển đổi",
    customizable: "Tùy chỉnh linh hoạt",
    customizableDesc: "Điều chỉnh số lượng câu hỏi, độ khó và chủ đề theo nhu cầu",
    exportFormats: "Xuất đa định dạng",
    exportFormatsDesc: "Tải xuống dưới dạng JSON, HTML, CSV hoặc TXT",
    darkMode: "Chế độ tối",
    darkModeDesc: "Giao diện thân thiện với mắt, làm việc thoải mái cả ngày lẫn đêm",
    responsive: "Responsive",
    responsiveDesc: "Hoạt động mượt mà trên mọi thiết bị và màn hình",

    // Configuration
    configuration: "Cấu hình",
    apiKeyLabel: "Khóa API Gemini",
    apiKeyPlaceholder: "Nhập khóa API Gemini của bạn",
    getKeyAt: "Lấy khóa tại",
    topicLabel: "Chủ đề",
    topicPlaceholder: "VD: Lập trình Python, Lịch sử Thế giới...",
    numQuestionsLabel: "Số câu hỏi",
    difficultyLabel: "Độ khó",
    easy: "Dễ",
    medium: "Trung bình",
    hard: "Khó",
    generateBtn: "Tạo câu hỏi",

    // Results
    generatedQuestions: "Câu hỏi đã tạo",
    regenerateBtn: "Tạo lại",
    loading: "Đang tạo câu hỏi...",
    calculateScore: "Tính điểm",
    downloadTitle: "Tải xuống",
    downloadJson: "JSON",
    downloadHtml: "HTML",
    downloadTxt: "TXT",
    downloadCsv: "CSV",

    // Question UI
    questionTitle: "Câu hỏi",
    showAnswer: "Xem đáp án và giải thích",
    correctAnswer: "Đáp án đúng:",
    explanation: "Giải thích:",
    scoreResult: "Bạn đã trả lời đúng {score}/{total} câu hỏi!",

    // Footer
    footerDescription: "Tạo câu hỏi trắc nghiệm thông minh với sức mạnh của AI",
    product: "Sản phẩm",
    generator: "Tạo câu hỏi",
    features: "Tính năng",
    support: "Hỗ trợ",
    documentation: "Tài liệu",
    contact: "Liên hệ", allRightsReserved: "Tất cả quyền được bảo lưu.",

    // Generator Section
    generatorTitle: "Tạo câu hỏi ngay bây giờ",
    generatorSubtitle: "Nhập thông tin và để AI tạo ra những câu hỏi chất lượng cao cho bạn",
    resultsTitle: "Kết quả",

    // Messages
    noApiKey: "⚠️ Không có khóa API được cung cấp. Hiển thị câu hỏi mẫu.",
    apiError: "⚠️ Đã xảy ra lỗi khi tạo câu hỏi với API. Hiển thị câu hỏi mẫu thay thế.",
    questionsGeneratedSuccess: "✅ Câu hỏi đã được tạo thành công!",
    enterTopic: "Vui lòng nhập chủ đề để tạo câu hỏi",
    noQuestions: "Không có câu hỏi nào để tính điểm",
    noQuestionsDownload: "Không có câu hỏi nào để tải xuống",
    downloadSuccess: "Đã tải xuống {filename} thành công!",
    unsupportedFormat: "Định dạng không được hỗ trợ",
    errorGenerating: "Đã xảy ra lỗi khi tạo câu hỏi. Vui lòng thử lại.",
    multipleChoiceQuestions: "CÂU HỎI TRẮC NGHIỆM:",
    languageChanged: "Ngôn ngữ đã được thay đổi. Vui lòng tạo câu hỏi mới.",
    noQuestionsGenerated: "Không có câu hỏi nào được tạo ra. Vui lòng thử lại."
  },
  en: {
    // Brand and Navigation
    brandName: "QuizGenius",

    // Hero Section
    heroBadge: "Powered by Gemini AI",
    heroTitle1: "Generate multiple choice questions",
    heroTitle2: "intelligently with AI",
    heroDescription: "Automatically create high-quality multiple choice questions for any topic. Save time, improve teaching and learning quality.",
    getStarted: "Get Started",
    learnMore: "Learn More",
    questionsGenerated: "Questions Generated",
    happyUsers: "Happy Users",
    subjects: "Supported Topics",

    // Sample cards
    sampleQuestion: "Sample Question",
    sampleQuestionText: "What is the capital of France?",
    smartAnswer: "Smart Answer",
    smartAnswerText: "AI auto-generates explanations",
    multiFormat: "Multi-format",
    multiFormatText: "JSON, HTML, CSV, TXT",

    // Features Section
    featuresTitle: "Key Features",
    featuresSubtitle: "Discover powerful features that help you create questions easily",
    aiPowered: "AI Powered",
    aiPoweredDesc: "Uses Google Gemini AI to generate high-quality and relevant questions",
    multiLanguage: "Multi-language",
    multiLanguageDesc: "Support Vietnamese and English, easy to switch",
    customizable: "Highly Customizable",
    customizableDesc: "Adjust number of questions, difficulty and topics according to needs",
    exportFormats: "Multiple Export Formats",
    exportFormatsDesc: "Download as JSON, HTML, CSV or TXT formats",
    darkMode: "Dark Mode",
    darkModeDesc: "Eye-friendly interface, work comfortably day and night",
    responsive: "Responsive",
    responsiveDesc: "Works smoothly on all devices and screens",

    // Configuration
    configuration: "Configuration",
    apiKeyLabel: "Gemini API Key",
    apiKeyPlaceholder: "Enter your Gemini API key",
    getKeyAt: "Get key at",
    topicLabel: "Topic",
    topicPlaceholder: "E.g.: Python Programming, World History...",
    numQuestionsLabel: "Number of Questions",
    difficultyLabel: "Difficulty Level",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    generateBtn: "Generate Questions",

    // Results
    generatedQuestions: "Generated Questions",
    regenerateBtn: "Regenerate",
    loading: "Generating questions...",
    calculateScore: "Calculate Score",
    downloadTitle: "Download",
    downloadJson: "JSON",
    downloadHtml: "HTML",
    downloadTxt: "TXT",
    downloadCsv: "CSV",

    // Question UI
    questionTitle: "Question",
    showAnswer: "View Answer and Explanation",
    correctAnswer: "Correct Answer:",
    explanation: "Explanation:",
    scoreResult: "You answered {score}/{total} questions correctly!",

    // Footer
    footerDescription: "Generate intelligent multiple choice questions with the power of AI",
    product: "Product",
    generator: "Generator",
    features: "Features",
    support: "Support",
    documentation: "Documentation",
    contact: "Contact", allRightsReserved: "All rights reserved.",

    // Generator Section  
    generatorTitle: "Create Questions Now",
    generatorSubtitle: "Enter information and let AI generate high-quality questions for you",
    resultsTitle: "Results",

    // Messages
    noApiKey: "⚠️ No API key provided. Showing sample questions.",
    apiError: "⚠️ Error generating questions with API. Showing sample questions instead.",
    questionsGeneratedSuccess: "✅ Questions generated successfully!",
    enterTopic: "Please enter a topic to generate questions",
    noQuestions: "No questions available to calculate score",
    noQuestionsDownload: "No questions available to download",
    downloadSuccess: "Successfully downloaded {filename}!",
    unsupportedFormat: "Unsupported format",
    errorGenerating: "Error generating questions. Please try again.",
    multipleChoiceQuestions: "MULTIPLE CHOICE QUESTIONS:",
    languageChanged: "Language changed. Please generate new questions.",
    noQuestionsGenerated: "No questions were generated. Please try again."
  }
};

// Sample MCQs for demonstration
const sampleMCQs = {
  vi: [
    {
      "question": "Thủ đô của Pháp là gì?",
      "options": ["London", "Berlin", "Paris", "Madrid"],
      "correct_answer": "Paris",
      "explanation": "Paris là thủ đô và thành phố đông dân nhất của Pháp."
    },
    {
      "question": "Hành tinh nào được biết đến là Hành tinh Đỏ?",
      "options": ["Sao Kim", "Sao Hỏa", "Sao Mộc", "Sao Thổ"],
      "correct_answer": "Sao Hỏa",
      "explanation": "Sao Hỏa có vẻ ngoài đỏ do sắt oxit (rỉ sét) trên bề mặt."
    },
    {
      "question": "Ai là tác giả của 'Romeo và Juliet'?",
      "options": ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
      "correct_answer": "William Shakespeare",
      "explanation": "William Shakespeare đã viết 'Romeo và Juliet' vào những năm 1590."
    },
    {
      "question": "Ký hiệu hóa học của vàng là gì?",
      "options": ["Go", "Gd", "Au", "Ag"],
      "correct_answer": "Au",
      "explanation": "Ký hiệu hóa học Au có nguồn gốc từ từ tiếng Latin cho vàng, 'aurum'."
    },
    {
      "question": "Cái nào trong số này không phải là ngôn ngữ lập trình?",
      "options": ["Python", "Java", "Cobra", "Dolphin"],
      "correct_answer": "Dolphin",
      "explanation": "Dolphin không phải là ngôn ngữ lập trình. Python, Java và Cobra đều là ngôn ngữ lập trình."
    },
    {
      "question": "Đại dương lớn nhất trên Trái Đất là gì?",
      "options": ["Đại Tây Dương", "Ấn Độ Dương", "Bắc Băng Dương", "Thái Bình Dương"],
      "correct_answer": "Thái Bình Dương",
      "explanation": "Thái Bình Dương là đại dương lớn nhất và sâu nhất trên Trái Đất."
    },
    {
      "question": "Nguyên tố nào có ký hiệu hóa học 'O'?",
      "options": ["Vàng", "Oxy", "Osmium", "Oganesson"],
      "correct_answer": "Oxy",
      "explanation": "Oxy được biểu thị bằng ký hiệu 'O' trong bảng tuần hoàn."
    }
  ],
  en: [
    {
      "question": "What is the capital of France?",
      "options": ["London", "Berlin", "Paris", "Madrid"],
      "correct_answer": "Paris",
      "explanation": "Paris is the capital and most populous city of France."
    },
    {
      "question": "Which planet is known as the Red Planet?",
      "options": ["Venus", "Mars", "Jupiter", "Saturn"],
      "correct_answer": "Mars",
      "explanation": "Mars appears red due to iron oxide (rust) on its surface."
    },
    {
      "question": "Who wrote 'Romeo and Juliet'?",
      "options": ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
      "correct_answer": "William Shakespeare",
      "explanation": "William Shakespeare wrote 'Romeo and Juliet' in the 1590s."
    },
    {
      "question": "What is the chemical symbol for gold?",
      "options": ["Go", "Gd", "Au", "Ag"],
      "correct_answer": "Au",
      "explanation": "The chemical symbol Au comes from the Latin word for gold, 'aurum'."
    },
    {
      "question": "Which of these is NOT a programming language?",
      "options": ["Python", "Java", "Cobra", "Dolphin"],
      "correct_answer": "Dolphin",
      "explanation": "Dolphin is not a programming language. Python, Java, and Cobra are all programming languages."
    },
    {
      "question": "What is the largest ocean on Earth?",
      "options": ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      "correct_answer": "Pacific Ocean",
      "explanation": "The Pacific Ocean is the largest and deepest ocean on Earth."
    },
    {
      "question": "Which element has the chemical symbol 'O'?",
      "options": ["Gold", "Oxygen", "Osmium", "Oganesson"],
      "correct_answer": "Oxygen",
      "explanation": "Oxygen is represented by the symbol 'O' in the periodic table."
    }
  ]
};

// DOM elements
const elements = {
  // Core form elements
  apiKey: () => document.getElementById('apiKey'),
  topic: () => document.getElementById('topic'),
  numQuestions: () => document.getElementById('numQuestions'),
  numQuestionsValue: () => document.getElementById('numQuestionsValue'),
  difficulty: () => document.getElementById('difficulty'),
  generateBtn: () => document.getElementById('generateBtn'),
  regenerateBtn: () => document.getElementById('regenerateBtn'),

  // Display elements
  loading: () => document.getElementById('loading'),
  alertContainer: () => document.getElementById('alertContainer'),
  questionsContainer: () => document.getElementById('questionsContainer'),
  questionsList: () => document.getElementById('questionsList'),

  // Score elements
  calculateScore: () => document.getElementById('calculateScore'),
  scoreResult: () => document.getElementById('scoreResult'),

  // Download elements
  downloadJson: () => document.getElementById('downloadJson'),
  downloadHtml: () => document.getElementById('downloadHtml'),
  downloadTxt: () => document.getElementById('downloadTxt'),
  downloadCsv: () => document.getElementById('downloadCsv'),

  // UI controls
  themeToggle: () => document.getElementById('themeToggle'),
  languageToggle: () => document.getElementById('languageToggle'),
  currentLang: () => document.getElementById('currentLang')
};

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
  initializeApp();
});

function initializeApp() {
  // Load saved theme and language
  loadTheme();
  loadLanguage();

  // Setup event listeners
  setupEventListeners();

  // Update UI with current language
  updateLanguage();

  // Initialize enhanced features
  initializeEnhancedFeatures();
}

function setupEventListeners() {
  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Language toggle
  const languageToggle = document.getElementById('languageToggle');
  if (languageToggle) {
    languageToggle.addEventListener('click', toggleLanguage);
  }

  // Get started button
  const getStartedBtn = document.getElementById('getStartedBtn');
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', function () {
      scrollToGenerator();
    });
  }

  // Learn more button
  const learnMoreBtn = document.getElementById('learnMoreBtn');
  if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', function () {
      scrollToFeatures();
    });
  }

  // Generate button
  const generateBtn = document.getElementById('generateBtn');
  if (generateBtn) {
    generateBtn.addEventListener('click', generateQuestions);
  }

  // Number of questions slider
  const numQuestionsSlider = document.getElementById('numQuestions');
  if (numQuestionsSlider) {
    numQuestionsSlider.addEventListener('input', function () {
      const valueDisplay = document.getElementById('numQuestionsValue');
      if (valueDisplay) {
        valueDisplay.textContent = this.value;
      }
    });
  }

  // Download buttons
  setupDownloadListeners();

  // Score calculation
  const calculateScoreBtn = document.getElementById('calculateScore');
  if (calculateScoreBtn) {
    calculateScoreBtn.addEventListener('click', calculateScore);
  }

  // Regenerate button
  const regenerateBtn = document.getElementById('regenerateBtn');
  if (regenerateBtn) {
    regenerateBtn.addEventListener('click', generateQuestions);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

function scrollToGenerator() {
  const generator = document.getElementById('generator');
  if (generator) {
    generator.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    // Add focus to topic input
    setTimeout(() => {
      const topicInput = document.getElementById('topic');
      if (topicInput) {
        topicInput.focus();
      }
    }, 800);
  }
}

function scrollToFeatures() {
  const features = document.querySelector('.features');
  if (features) {
    features.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const themeIcon = document.querySelector('#themeToggle i');
  if (themeIcon) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

function loadLanguage() {
  const savedLanguage = localStorage.getItem('language') || 'vi';
  currentLanguage = savedLanguage;
  updateLanguageIndicator();
}

function toggleLanguage() {
  currentLanguage = currentLanguage === 'vi' ? 'en' : 'vi';
  localStorage.setItem('language', currentLanguage);
  updateLanguage();
  updateLanguageIndicator();

  // Show language change notification
  showAlert(translations[currentLanguage].languageChanged || 'Language changed. Please generate new questions.', 'info');
}

function updateLanguageIndicator() {
  const langIndicator = document.getElementById('currentLang');
  if (langIndicator) {
    langIndicator.textContent = currentLanguage.toUpperCase();
  }

  // Update document language
  document.documentElement.lang = currentLanguage;
}

function setupDownloadListeners() {
  const downloadButtons = [
    { id: 'downloadJson', format: 'json' },
    { id: 'downloadHtml', format: 'html' },
    { id: 'downloadTxt', format: 'txt' },
    { id: 'downloadCsv', format: 'csv' }
  ];

  downloadButtons.forEach(({ id, format }) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', () => downloadFile(format));
    }
  });
}

// Settings management
function loadSettings() {
  // Load theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  // Load language
  const savedLanguage = localStorage.getItem('language') || 'vi';
  currentLanguage = savedLanguage;
  updateLanguageIndicator();
}

function saveSettings() {
  localStorage.setItem('language', currentLanguage);
}

// Language functions
function toggleLanguage() {
  currentLanguage = currentLanguage === 'vi' ? 'en' : 'vi';
  localStorage.setItem('language', currentLanguage);
  updateLanguage();
  updateLanguageIndicator();

  // Show language change notification
  showAlert(translations[currentLanguage].languageChanged || 'Language changed. Please generate new questions.', 'info');

  // Clear current questions if any, since language changed
  if (currentMCQs.length > 0) {
    showAlert(getTranslation('languageChanged') || 'Language changed. Please generate new questions.', 'info');
  }
}

function getTranslation(key) {
  return translations[currentLanguage] && translations[currentLanguage][key] ? translations[currentLanguage][key] : key;
}

function updateLanguage() {
  // Update all elements with data-key attributes
  document.querySelectorAll('[data-key]').forEach(element => {
    const key = element.getAttribute('data-key');
    const translation = getTranslation(key);

    if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
      element.placeholder = translation;
    } else if (element.tagName === 'OPTION') {
      element.textContent = translation;
    } else {
      element.textContent = translation;
    }
  });

  // Update difficulty options values based on language
  updateDifficultyOptions();
}

function updateDifficultyOptions() {
  const difficultySelect = elements.difficulty();
  if (difficultySelect) {
    const options = difficultySelect.querySelectorAll('option');

    if (currentLanguage === 'en') {
      options[0].value = 'easy';
      options[1].value = 'medium';
      options[2].value = 'hard';
    } else {
      options[0].value = 'dễ';
      options[1].value = 'trung bình';
      options[2].value = 'khó';
    }
  }
}

// Alert functions
function showAlert(message, type = 'info') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.innerHTML = `
        <i class="fas fa-${getAlertIcon(type)}"></i>
        ${message}
    `;

  const alertContainer = elements.alertContainer();
  if (alertContainer) {
    alertContainer.appendChild(alertDiv);

    // Remove alert after 5 seconds
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.parentNode.removeChild(alertDiv);
      }
    }, 5000);
  }
}

function getAlertIcon(type) {
  const icons = {
    success: 'check-circle',
    warning: 'exclamation-triangle',
    danger: 'exclamation-circle',
    info: 'info-circle'
  };
  return icons[type] || 'info-circle';
}

function clearAlerts() {
  const alertContainer = elements.alertContainer();
  if (alertContainer) {
    alertContainer.innerHTML = '';
  }
}

// Question generation functions
async function generateQuestions() {
  const topic = elements.topic().value.trim();
  const numQuestions = parseInt(elements.numQuestions().value);
  const difficulty = elements.difficulty().value;
  const apiKey = elements.apiKey().value.trim();

  clearAlerts();

  if (!topic) {
    showAlert(getTranslation('enterTopic'), 'warning');
    return;
  }

  // Show loading
  elements.loading().classList.remove('hidden');
  elements.questionsContainer().classList.add('hidden');

  try {
    let mcqs;
    if (apiKey) {
      mcqs = await generateMCQsWithAPI(topic, numQuestions, difficulty, apiKey);
    }

    if (!mcqs) {
      // Use sample questions if API fails or no API key
      mcqs = generateSampleMCQs(topic, numQuestions);
      if (!apiKey) {
        showAlert(getTranslation('noApiKey'), 'warning');
      } else {
        showAlert(getTranslation('apiError'), 'warning');
      }
    } else {
      showAlert(getTranslation('questionsGeneratedSuccess'), 'success');
    }

    currentMCQs = mcqs;
    displayMCQs(mcqs);
  } catch (error) {
    console.error('Error generating questions:', error);
    showAlert(getTranslation('errorGenerating'), 'danger');

    // Fallback to sample questions
    currentMCQs = generateSampleMCQs(topic, numQuestions);
    displayMCQs(currentMCQs);
  } finally {
    elements.loading().classList.add('hidden');
  }
}

async function generateMCQsWithAPI(topic, numQuestions, difficulty, apiKey) {
  try {        // Map Vietnamese/English difficulty to English for API
    const difficultyMap = {
      'dễ': 'easy',
      'trung bình': 'medium',
      'khó': 'hard',
      'easy': 'easy',
      'medium': 'medium',
      'hard': 'hard'
    };
    const difficultyEng = difficultyMap[difficulty] || 'medium';

    const prompt = `
        Generate ${numQuestions} multiple-choice questions about ${topic} with difficulty level ${difficultyEng}.
        For each question, provide 4 options with exactly one correct answer.
        ${currentLanguage === 'vi' ? 'Please respond in Vietnamese.' : 'Please respond in English.'}
        
        Format your response as a valid JSON array with the following structure:
        [
            {
                "question": "Question text here",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correct_answer": "Correct option here",
                "explanation": "Brief explanation of the correct answer"
            }
        ]
        
        Ensure all questions are factually accurate and educational.
        The output should be ONLY the JSON array with no additional text.
        `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    let responseText = data.candidates[0].content.parts[0].text;

    // Clean up the response
    responseText = responseText.trim();
    if (!responseText.startsWith('[')) {
      const startIdx = responseText.indexOf('[');
      const endIdx = responseText.lastIndexOf(']') + 1;
      if (startIdx !== -1 && endIdx !== 0) {
        responseText = responseText.substring(startIdx, endIdx);
      }
    }

    return JSON.parse(responseText);
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
}

function generateSampleMCQs(topic, numQuestions) {
  // Return a subset of sample MCQs based on current language
  const availableQuestions = [...sampleMCQs[currentLanguage]];
  const selectedQuestions = [];

  for (let i = 0; i < Math.min(numQuestions, availableQuestions.length); i++) {
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    selectedQuestions.push(availableQuestions[randomIndex]);
    availableQuestions.splice(randomIndex, 1);
  }

  return selectedQuestions;
}

function displayMCQs(mcqs) {
  if (!mcqs || mcqs.length === 0) {
    showAlert(getTranslation('noQuestionsGenerated') || 'No questions generated. Please try again.', 'warning');
    return;
  }

  userAnswers = {};
  const questionsList = elements.questionsList();
  const scoreResult = elements.scoreResult();

  if (questionsList) {
    questionsList.innerHTML = '';
  }
  if (scoreResult) {
    scoreResult.classList.add('hidden');
  }

  mcqs.forEach((mcq, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-item';
    questionDiv.innerHTML = `
            <div class="question-header">
                <div class="question-number">${index + 1}</div>
                <div class="question-text">
                    ${escapeHtml(mcq.question)}
                </div>
            </div>
            <div class="options">
                ${mcq.options.map((option, optionIndex) => `
                    <div class="option">
                        <input type="radio" 
                               id="q${index}_o${optionIndex}" 
                               name="question_${index}" 
                               value="${escapeHtml(option)}"
                               onchange="updateUserAnswer(${index}, '${escapeHtml(option)}')">
                        <label for="q${index}_o${optionIndex}">
                            ${escapeHtml(option)}
                        </label>
                    </div>
                `).join('')}
            </div>
            <div class="answer-section">
                <button class="show-answer-btn" onclick="toggleAnswer(this)">
                    <i class="fas fa-chevron-down"></i>
                    ${getTranslation('showAnswer')}
                </button>
                <div class="answer-content hidden">
                    <div class="correct-answer">
                        <strong>${getTranslation('correctAnswer')}</strong> ${escapeHtml(mcq.correct_answer)}
                    </div>
                    <div class="explanation">
                        <strong>${getTranslation('explanation')}</strong> ${escapeHtml(mcq.explanation)}
                    </div>
                </div>
            </div>
        `;

    if (questionsList) {
      questionsList.appendChild(questionDiv);
    }
  });

  const questionsContainer = elements.questionsContainer();
  if (questionsContainer) {
    questionsContainer.classList.remove('hidden');
  }
}

function updateUserAnswer(questionIndex, answer) {
  userAnswers[questionIndex] = answer.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

function toggleAnswer(button) {
  const content = button.nextElementSibling;
  const icon = button.querySelector('i');

  if (content && content.classList.contains('hidden')) {
    content.classList.remove('hidden');
    icon.classList.remove('fa-chevron-down');
    icon.classList.add('fa-chevron-up');
  } else if (content) {
    content.classList.add('hidden');
    icon.classList.remove('fa-chevron-up');
    icon.classList.add('fa-chevron-down');
  }
}

function calculateScore() {
  if (!currentMCQs || currentMCQs.length === 0) {
    showAlert(getTranslation('noQuestions'), 'warning');
    return;
  }

  let score = 0;
  currentMCQs.forEach((mcq, index) => {
    if (userAnswers[index] === mcq.correct_answer) {
      score++;
    }
  });

  const scoreText = getTranslation('scoreResult').replace('{score}', score).replace('{total}', currentMCQs.length);
  const scoreResult = elements.scoreResult();

  if (scoreResult) {
    scoreResult.innerHTML = `
        <i class="fas fa-chart-bar"></i>
        ${scoreText}
    `;
    scoreResult.classList.remove('hidden');
  }

  showAlert(scoreText, 'success');
}

function regenerateQuestions() {
  generateQuestions();
}

function downloadFile(format) {
  if (!currentMCQs || currentMCQs.length === 0) {
    showAlert(getTranslation('noQuestionsDownload'), 'warning');
    return;
  }

  const topic = elements.topic().value.trim() || 'quiz';
  let content, filename, mimeType;

  switch (format) {
    case 'json':
      content = JSON.stringify(currentMCQs, null, 2);
      filename = `${topic.toLowerCase().replace(/\s+/g, '_')}_questions.json`;
      mimeType = 'application/json';
      break;
    case 'html':
      content = generateHTMLContent(currentMCQs, topic);
      filename = `${topic.toLowerCase().replace(/\s+/g, '_')}_questions.html`;
      mimeType = 'text/html';
      break;
    case 'txt':
      content = generateTextContent(currentMCQs, topic);
      filename = `${topic.toLowerCase().replace(/\s+/g, '_')}_questions.txt`;
      mimeType = 'text/plain';
      break;
    case 'csv':
      content = generateCSVContent(currentMCQs, topic);
      filename = `${topic.toLowerCase().replace(/\s+/g, '_')}_questions.csv`;
      mimeType = 'text/csv';
      break; default:
      showAlert(getTranslation('unsupportedFormat'), 'danger');
      return;
  }

  // Create and trigger download
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url); showAlert(getTranslation('downloadSuccess').replace('{filename}', filename), 'success');
}

function generateHTMLContent(mcqs, topic) {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Câu hỏi trắc nghiệm: ${escapeHtml(topic)}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        h1 { color: #4285F4; text-align: center; }
        .question { margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 20px; }
        .question h3 { color: #333; }
        .options { margin-left: 20px; }
        .answer { color: #34A853; font-weight: bold; }
        .explanation { color: #555; font-style: italic; }
    </style>
</head>
<body>
    <h1>Câu hỏi trắc nghiệm: ${escapeHtml(topic)}</h1>
    ${mcqs.map((mcq, index) => `
        <div class="question">
            <h3>${index + 1}. ${escapeHtml(mcq.question)}</h3>
            <div class="options">
                ${mcq.options.map((option, optionIndex) => {
    const letter = String.fromCharCode(65 + optionIndex);
    const isCorrect = option === mcq.correct_answer;
    return `<p style="${isCorrect ? 'color: #34A853; font-weight: bold;' : ''}">${letter}. ${escapeHtml(option)}</p>`;
  }).join('')}
            </div>
            <p class="answer">Đáp án đúng: ${escapeHtml(mcq.correct_answer)}</p>
            <p class="explanation">Giải thích: ${escapeHtml(mcq.explanation)}</p>
        </div>
    `).join('')}
</body>
</html>`;
}

function generateTextContent(mcqs, topic) {
  let content = `${getTranslation('multipleChoiceQuestions')} ${topic}\n\n`;

  mcqs.forEach((mcq, index) => {
    content += `${index + 1}. ${mcq.question}\n\n`;

    mcq.options.forEach((option, optionIndex) => {
      const letter = String.fromCharCode(65 + optionIndex);
      content += `   ${letter}. ${option}\n`;
    });

    content += `\n${getTranslation('correctAnswer')} ${mcq.correct_answer}\n`;
    content += `${getTranslation('explanation')} ${mcq.explanation}\n\n`;
    content += '----------------------------------------\n\n';
  });

  return content;
}

function generateCSVContent(mcqs, topic) {
  const BOM = '\uFEFF'; // UTF-8 BOM for Excel compatibility
  let csv = BOM + '"STT","Câu hỏi","Lựa chọn A","Lựa chọn B","Lựa chọn C","Lựa chọn D","Đáp án đúng","Giải thích"\n';

  mcqs.forEach((mcq, index) => {
    const row = [
      index + 1,
      mcq.question,
      mcq.options[0] || '',
      mcq.options[1] || '',
      mcq.options[2] || '',
      mcq.options[3] || '',
      mcq.correct_answer,
      mcq.explanation
    ];

    // Escape quotes and wrap in quotes
    const escapedRow = row.map(field =>
      '"' + String(field).replace(/"/g, '""') + '"'
    );

    csv += escapedRow.join(',') + '\n';
  });

  return csv;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Parallax effect for hero section
function handleParallax() {
  const heroShapes = document.querySelectorAll('.hero-shapes .shape');
  const heroContent = document.querySelector('.hero-content');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;

    heroShapes.forEach((shape, index) => {
      const speed = (index + 1) * parallaxSpeed;
      shape.style.transform = `translateY(${scrolled * speed}px)`;
    });

    if (heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
  });
}

// Scroll animations
function observeElements() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe feature cards
  document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // Observe floating cards
  document.querySelectorAll('.floating-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    observer.observe(card);
  });

  // Observe sections
  document.querySelectorAll('.section-header').forEach(header => {
    observer.observe(header);
  });
}

// Enhanced navbar scroll effect
function handleNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
  });
}

// Add click effect to buttons
function addButtonEffects() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Initialize enhanced features
function initializeEnhancedFeatures() {
  handleParallax();
  observeElements();
  handleNavbarScroll();
  addButtonEffects();

  // Add loading completed class for animations
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
}
