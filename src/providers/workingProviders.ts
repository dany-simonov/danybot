// Сгенерировано автоматически на основе анализа g4f_analysis_20250623_165622.json

export interface WorkingProvider {
  provider: string;
  model: string;
  elapsed: number;
  category: 'text' | 'image' | 'audio' | 'research';
  responseSample: string;
}

export const workingProviders: WorkingProvider[] = [
  // === TEXT ===
  { provider: 'TeachAnything', model: 'gemini-1.5-flash', elapsed: 0.86, category: 'text', responseSample: 'Привет! У меня всё отлично, спасибо. 🤖\n\nЯ — Gemma, большая языковая модель, обученная компанией Google DeepMind. Мои возможности включают:\n\n* **Генерация текста:** Я могу генерировать текст на различн' },
  { provider: 'CohereForAI_C4AI_Command', model: 'command-r7b-12-2024', elapsed: 2.23, category: 'text', responseSample: 'Привет! Я Command, огромный языковой модель, который был создан для того, чтобы помогать людям. Мои возможности включают в себя:\n\n* **Ответы на вопросы**: Я могу давать ответы на вопросы по широкому с' },
  { provider: 'LambdaChat', model: 'lfm-40b', elapsed: 2.7, category: 'text', responseSample: 'Привет! Я Liquid-40B, и я могу помочь с широким спектром задач, от ответов на вопросы до генерации текста и совета по решению проблем. Моя цель - предоставить полезную информацию и поддержку.' },
  { provider: 'TeachAnything', model: 'gemini-1.5-pro', elapsed: 2.98, category: 'text', responseSample: 'Привет! Мое состояние как у языковой модели - я всегда готова к работе.\n\nЯ — Gemma, большая языковая модель, обученная Google DeepMind. Мои возможности включают:\n\n* **Генерация текста**: Я могу создав' },
  { provider: 'CohereForAI_C4AI_Command', model: 'command-r7b-arabic-02-2025', elapsed: 3.22, category: 'text', responseSample: 'Привет! Я рад, что ты спросил. Мои возможности довольно широки и разнообразны. Я могу:\n\n1. **Обрабатывать текст**: Я могу создавать, редактировать и анализировать текст. Это включает в себя написание ' },
  { provider: 'FreeGpt', model: 'gemini-1.5-pro', elapsed: 3.28, category: 'text', responseSample: '你好，我是一个人工智能助手，我可以回答你的问题、提供信息、帮助你解决问题、进行翻译、提供学习资源等。请告诉我你需要什么帮助，我会尽力为你提供支持。' },
  { provider: 'FreeGpt', model: 'gemini-1.5-flash', elapsed: 3.31, category: 'text', responseSample: '你好！我是一个大型语言模型，由人工智能技术驱动。我的能力包括：理解和生成各种语言的文本；回答你的问题，即使问题很复杂或需要多步骤推理；根据你的要求创作不同的文本类型，例如诗歌、代码、脚本、音乐作品、电子邮件、信件等；翻译语言；总结事实性文本；根据上下文进行对话，并保持连贯性；以及学习和适应新的信息。  总的来说，我的目标是尽可能准确、全面地理解你的需求并提供有帮助的回应。  不过，我并非无所不能，' },
  { provider: 'Blackbox', model: 'Go Agent', elapsed: 3.45, category: 'text', responseSample: '**Привет! Я рад помочь! Вот краткое описание моих возможностей:**\n\n- **Ответы на вопросы:** Я могу отвечать на различные вопросы, предоставляя информацию по множеству тем.\n\n- **Помощь с программирован' },
  { provider: 'Chatai', model: 'gpt-4o-mini', elapsed: 3.45, category: 'text', responseSample: 'Привет! У меня все хорошо, спасибо. Я — искусственный интеллект, и мои возможности включают:\n\n1. **Ответы на вопросы**: Я могу предоставлять информацию по различным темам, включая науку, технологии, и' },
  { provider: 'Blackbox', model: 'HTML Agent', elapsed: 3.5, category: 'text', responseSample: 'Привет! У меня все хорошо, спасибо за вопрос. Я здесь, чтобы помочь тебе с вопросами по HTML. Я могу предоставить:\n\n1. **Объяснения**: Подробные объяснения различных аспектов HTML, таких как теги, атр' },
  { provider: 'Blackbox', model: 'Electron Agent', elapsed: 3.52, category: 'text', responseSample: '**Привет! Я рад помочь! Вот краткое описание моих возможностей:**\n\n- **Ответы на вопросы:** Я могу отвечать на различные вопросы, предоставляя информацию по множеству тем, включая науку, технологии, и' },
  { provider: 'Blackbox', model: 'gpt-4.1-mini', elapsed: 3.64, category: 'text', responseSample: 'Привет! Я — виртуальный помощник, и у меня есть множество возможностей. Я могу:\n\n1. **Отвечать на вопросы**: Предоставлять информацию по различным темам, включая науку, технологии, историю и многое др' },
  { provider: 'CohereForAI_C4AI_Command', model: 'command-r', elapsed: 3.78, category: 'text', responseSample: 'Привет! Я - chatbot, который может помочь с различными вещами. Мои возможности включают в себя:\n\n1. Ответы на общие вопросы: Я могу ответить на вопросы о различных темах, таких как география, истори' },
  { provider: 'Blackbox', model: 'Erlang Agent', elapsed: 3.83, category: 'text', responseSample: '**Привет! Я рад помочь! Вот краткое описание моих возможностей:**\n\n- **Ответы на вопросы:** Я могу отвечать на различные вопросы, предоставляя информацию по множеству тем, включая науку, технологии, и' },
  { provider: 'Blackbox', model: 'Python Agent', elapsed: 3.91, category: 'text', responseSample: 'Привет! Я — виртуальный помощник, специализирующийся на программировании на Python. Я могу помочь вам с:\n\n1. **Объяснением концепций Python**: Я могу объяснить основные и продвинутые темы, такие как О' },
  { provider: 'Blackbox', model: 'Google Cloud Agent', elapsed: 3.91, category: 'text', responseSample: 'Привет! Я BLACKBOX.AI Assistant, и я здесь, чтобы помочь вам с различными задачами. Вот некоторые из моих возможностей:\n\n1. **Ответы на вопросы**: Я могу предоставлять информацию по различным темам, в' },
  { provider: 'Blackbox', model: 'Java Agent', elapsed: 3.92, category: 'text', responseSample: 'Привет! У меня все хорошо, спасибо, что спросил. Я здесь, чтобы помочь тебе с вопросами по программированию на Java. Вот что я могу предложить:\n\n**Возможности:**\n\n- **Объяснение концепций Java:** Я мо' },
  { provider: 'Blackbox', model: 'gpt-4.1-nano', elapsed: 4.0, category: 'text', responseSample: 'Привет! Я — виртуальный помощник, созданный для оказания помощи в различных задачах. Вот некоторые из моих возможностей:\n\n1. **Ответы на вопросы**: Я могу предоставлять информацию по различным темам, ' },
  { provider: 'Blackbox', model: 'Docker Agent', elapsed: 4.0, category: 'text', responseSample: 'Привет! Я BLACKBOX.AI Assistant, и я здесь, чтобы помочь вам с различными задачами. Вот некоторые из моих возможностей:\n\n1. **Ответы на вопросы**: Я могу предоставлять информацию по различным темам, в' },
  { provider: 'Blackbox', model: 'JavaScript Agent', elapsed: 4.02, category: 'text', responseSample: 'Привет! У меня все хорошо, спасибо, что спросил. Я здесь, чтобы помочь тебе с вопросами по JavaScript. Вот что я могу предложить:\n\n1. **Кодовые примеры**: Я могу предоставить примеры кода для различны' },
  { provider: 'LambdaChat', model: 'llama-4-maverick-17b-128e-instruct-fp8', elapsed: 4.05, category: 'text', responseSample: 'Привет! Я Llama 4 Maverick, Meta\'s наиболее продвинутый мультимодальный AI ассистент. Я здесь, чтобы помочь вам с различными задачами и вопросами. Мои возможности включают:\n\n1. **Понимание и генерация' },
  // ... (добавить остальные text)

  // === IMAGE ===
  { provider: 'ImageLabs', model: 'sdxl-turbo', elapsed: 9.11, category: 'image', responseSample: '[![Привет, как дела? Опиши свои возможности.](https://pornlabstaskstore.s3-accelerate.amazonaws.com/42b6cfb5adc74be3ae6d2fe7fedfcef4.jpg)](https://pornlabstaskstore.s3-accelerate.amazonaws.com/42b6cfb' },
  // ... (добавить остальные image)

  // === AUDIO ===
  { provider: 'Gemini', model: 'gemini-audio', elapsed: 0.64, category: 'audio', responseSample: '<audio controls src="/media/1750685486_gemini+Привет,_как_дела_Опиши_свои_возможности_3e0597b66dbedb4e.ogx"></audio>' },
  // ... (добавить остальные audio)

  // === RESEARCH ===
  { provider: 'TeachAnything', model: 'gemini-1.5-flash', elapsed: 0.86, category: 'research', responseSample: 'Привет! У меня всё отлично, спасибо. 🤖\n\nЯ — Gemma, большая языковая модель, обученная компанией Google DeepMind. Мои возможности включают:\n\n* **Генерация текста:** Я могу генерировать текст на различн' },
  // ... (добавить остальные research)
]; 