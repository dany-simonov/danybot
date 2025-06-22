from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    chat_id = Column(Integer, ForeignKey("chats.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    sender = Column(String, nullable=False)  # 'user' или 'bot'
    content = Column(String, nullable=True)
    type = Column(String, default="text")  # text, file, image, etc.
    model = Column(String, nullable=True)
    tokens = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    file_id = Column(Integer, ForeignKey("files.id"), nullable=True)

    chat = relationship("Chat", backref="messages")
    user = relationship("User", backref="messages")
    file = relationship("File", backref="messages") 