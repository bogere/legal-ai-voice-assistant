from langchain.memory import ConversationBufferMemory
from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationChain

memory = ConversationBufferMemory(memory_key="chat_history")

def get_conversation_chain():
    llm = ChatOpenAI()
    return ConversationChain(llm=llm, memory=memory)
