from fastapi import APIRouter

router = APIRouter()

MODEL_CATEGORIES = {
    "text": {
      "name": "📝 TEXT",
      "models": [
        'TeachAnything gemini-1.5-flash',
        'TeachAnything gemini-1.5-pro',
        'Cohere command-r7b-arabic-02-2025',
        'Cohere command-r7b-12-2024',
        'LambdaChat apriel-5b-instruct',
        'Cohere command-r',
        'Qwen-3-30b-a3b',
        'OIVSCode gpt-4.1-mini',
        'Qwen-3-8b',
        'LambdaChat deepseek-llama3.3-70b',
        'Cohere command-a-03-2025',
        'Cohere command-r-08-2024',
        'LambdaChat lfm-40b',
        'Cohere command-r-plus',
        'OIVSCode gpt-4o-mini',
        'LambdaChat llama3.3-70b-instr-fp8',
        'LambdaChat qwen25-coder-32b-instr',
        'Qwen-3-0.6b',
        'Perplexity sonar',
        'Perplexity sonar-pro',
        'WeWordle gpt-4',
        'Cohere command-r-plus-08-2024',
        'Qwen-2.5',
        'Yqcloud gpt-4',
        'Free2GPT gemini-1.5-pro',
        'Qwen-3-1.7b',
        'Free2GPT gemini-1.5-flash',
        'Qwen-2.5-max',
        'Qwen-3-4b',
        'Qwen-2-72b',
        'LambdaChat qwen3-32b-fp8',
        'Qwen-3-235b',
        'Perplexity r1-1776',
        'LambdaChat deepseek-r1',
        'Qwen-3-14b',
        'Qwen-3-32b',
        'Perplexity sonar-reasoning',
        'Perplexity sonar-reasoning-pro',
        'LambdaChat hermes-3-llama-3.1-405b-fp8',
        'LambdaChat llama3.1-nemotron-70b-instr'
      ]
    },
    "code": {
      "name": "💻 CODE",
      "models": [
        'gpt-4',
        'FastAPI Agent',
        'gpt-4o',
        'Builder Agent',
        'Firebase Agent',
        'Flask Agent',
        'gpt-4.1-nano',
        'AngularJS Agent',
        'gpt-4o-mini',
        'Flutter Agent',
        'Erlang Agent',
        'DigitalOcean Agent',
        'Swift Agent',
        'MongoDB Agent',
        'JavaScript Agent',
        'Xcode Agent',
        'Go Agent',
        'Git Agent',
        'HTML Agent',
        'PyTorch Agent',
        'Android Agent',
        'gpt-4.1-mini',
        'Java Agent',
        'Gitlab Agent',
        'Next.js Agent',
        'Python Agent',
        'blackboxai',
        'Electron Agent',
        'Bitbucket Agent',
        'Azure Agent',
        'Docker Agent',
        'Godot Agent',
        'React Agent',
        'Google Cloud Agent',
        'Heroku Agent'
      ]
    },
    "image": {
      "name": "🖼️ IMAGE",
      "models": [
        'ImageLabs sdxl-turbo',
        'ARTA katayama-mix-xl',
        'ARTA new-school',
        'ARTA anima-pencil-xl',
        'ARTA flame-design',
        'BlackForest flux-dev',
        'ARTA anything-xl',
        'ARTA f-dev',
        'ARTA flux-dev',
        'ARTA trash-polka',
        'ARTA pony-xl',
        'ARTA yamers-realistic-xl',
        'ARTA Watercolor',
        'ARTA embroidery-tattoo',
        'ARTA realistic-tattoo',
        'ARTA playground-xl',
        'ARTA realistic-stock-xl',
        'ARTA on-limbs-black',
        'ARTA photographic',
        'ARTA death-metal',
        'ARTA neo-traditional',
        'ARTA red-and-black',
        'ARTA kawaii',
        'ARTA biomech',
        'ARTA flux-pro',
        'ARTA flux',
        'ARTA mini-tattoo',
        'ARTA f-pro'
      ]
    },
    "audio": {
      "name": "🔊 AUDIO",
      "models": [
        'Gemini audio',
        'OpenAIFM scientific_style',
        'OpenAIFM alloy',
        'OpenAIFM shimmer',
        'OpenAIFM sage',
        'OpenAIFM cowboy',
        'OpenAIFM calm',
        'OpenAIFM echo',
        'OpenAIFM verse',
        'OpenAIFM onyx',
        'OpenAIFM ballad',
        'OpenAIFM ash',
        'OpenAIFM friendly',
        'OpenAIFM nova',
        'OpenAIFM fable',
        'OpenAIFM noir_detective',
        'OpenAIFM patient_teacher',
        'OpenAIFM coral'
      ]
    },
    "research": {
      "name": "🔍 DEEP RESEARCH",
      "models": [
        'Perplexity r1-1776',
        'LambdaChat deepseek-r1',
        'Qwen-3-14b',
        'Qwen-3-32b',
        'Perplexity sonar-reasoning',
        'Perplexity sonar-reasoning-pro',
        'LambdaChat hermes-3-llama-3.1-405b-fp8',
        'LambdaChat llama3.1-nemotron-70b-instr'
      ]
    },
    "multimodal": {
      "name": "🌀 MULTIMODAL",
      "models": [
        'TeachAnything gemini-1.5-pro',
        'TeachAnything gemini-1.5-flash',
        'Free2GPT gemini-1.5-flash',
        'Free2GPT gemini-1.5-pro'
      ]
    }
}


@router.get("/")
def get_models():
    """
    Retrieve available models categorized.
    """
    # Remove duplicates before returning
    for category in MODEL_CATEGORIES.values():
        category['models'] = list(dict.fromkeys(category['models']))
    return MODEL_CATEGORIES 