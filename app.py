from flask import Flask, render_template, request ,jsonify, session
from youtube_transcript_api import YouTubeTranscriptApi
from transformers import pipeline
from googletrans import Translator
from googletrans import LANGUAGES

app = Flask(__name__)
app.secret_key = '20021934'



@app.route("/", methods=['GET', 'POST'])
def main():
    return render_template("index.html")

summarized_text = ''

@app.route("/summary", methods=['GET', 'POST'])
def summary_api():
    url = request.args.get('url', '')
    print(url)
    video_id = url.split('=')[1]
    print(video_id)
    summary = get_summary(get_transcript(video_id))
    session['summarized_text'] = summary
    return summary, 200


def get_transcript(video_id):
    transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
    transcript = ' '.join([d['text'] for d in transcript_list])
    return transcript



def get_summary(transcript):
    summariser = pipeline('summarization')
    summary = ''
    for i in range(0, (len(transcript)//1000)+1):
        summary_text = summariser(
            transcript[i*1000:(i+1)*1000])[0]['summary_text']
        summary = summary + summary_text + ' '
    return summary



@app.route("/translate",methods=['GET', 'POST'])
def get_translate():
    paragraph = session.get('summarized_text', '')
    target_language = request.args.get('language')
    print(target_language)
# Convert the paragraph to the target language
    translator = Translator()
    language_code = get_language_code(target_language)
    translation = translator.translate(paragraph, dest=language_code)
    translated_paragraph = (f"Translation ({target_language}): {translation.text}")
    return translated_paragraph

   

def get_language_code(language):
    for code, name in LANGUAGES.items():
        if language.lower() == name.lower():
            return code
    
    return None



if __name__ == '__main__':

    app.run(debug='True')
