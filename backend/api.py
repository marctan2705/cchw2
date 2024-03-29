from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import os
from langchain.chains.conversation.memory import ConversationBufferMemory
from langchain.chat_models import ChatOpenAI
from langchain import hub
from langchain.agents import AgentExecutor, create_openai_tools_agent
from langchain_openai import ChatOpenAI
from langchain.chains import ConversationChain
import ast
import json
load_dotenv()
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
chat = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0.3, openai_api_key=os.getenv("OPENAI_API_KEY"))
memory = ConversationBufferMemory(return_messages=True)
prompt = hub.pull("hwchase17/openai-tools-agent")
conversation = ConversationChain(
    llm = chat,
    verbose=True
)

@app.route("/")
def home():
    return "Home"



@app.route("/get_response", methods = ['POST'])
@cross_origin()
def get_response():
    messages =  request.get_json()["chatters"]
    difficulty = messages["difficulty"]
    res = []
    for i in messages["topics"]:
        number = int(messages["topics"][i])
        if number <= 0:
            continue
        file_path = f"./topic_{i}.txt"  # Update this path if the file is in a different location
        with open(file_path, 'r') as file:
            file_contents = file.read()
        a = conversation(f"given {file_contents}, generate a {difficulty} quiz consisting {number} questions. return only a list of dictionaries for the {number} questions, with questions, options, and the answer.")["response"]
        a.replace("\n", "")
        a.replace("\'", "")
        a = ast.literal_eval(a)
        print("a is:", a)
        for j in a:
            res += a[j]
    response = jsonify({
        "quiz": res
    })
    return response, 200

if __name__ == "__main__":
    app.run(debug=True)