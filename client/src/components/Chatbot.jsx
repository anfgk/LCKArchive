import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FaRobot, FaTimes, FaPaperPlane, FaComments } from "react-icons/fa";
import { generateResponse } from "../assets/chatbotResponses";

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;

`;

const ChatButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background: ${(props) => props.theme.colors.secondary};
  }
`;

const ChatWindow = styled.div`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 350px;
  height: 500px;
  background: rgba(0, 0, 0, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);

  @media (max-width: 480px) {
    width: 300px;
    height: 400px;
    right: -50px;
  }
`;

const ChatHeader = styled.div`
  background: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 15px 20px;
  border-radius: 15px 15px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChatTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 18px;
  padding: 5px;

  &:hover {
    opacity: 0.8;
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
`;

const Message = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  max-width: 80%;
  ${(props) => props.isUser ? 'align-self: flex-end; flex-direction: row-reverse;' : 'align-self: flex-start;'}
`;

const MessageAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(props) => props.isUser ? props.theme.colors.secondary : props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
`;

const MessageContent = styled.div`
  background: ${(props) => props.isUser ? props.theme.colors.primary : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  padding: 12px 16px;
  border-radius: 18px;
  word-wrap: break-word;
  line-height: 1.4;
  max-width: 100%;
`;

const ChatInput = styled.div`
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SendButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => props.theme.colors.secondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "안녕하세요! LCK.GG AI 어시스턴트입니다. LCK 관련 질문이 있으시면 언제든 물어보세요! 😊",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // AI 응답 시뮬레이션 (타이핑 효과)
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: generateResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <ChatbotContainer>
      {isOpen && (
        <ChatWindow>
          <ChatHeader>
            <ChatTitle>
              <FaRobot />
              문의하기
            </ChatTitle>
            <CloseButton onClick={() => setIsOpen(false)}>
              <FaTimes />
            </CloseButton>
          </ChatHeader>
          
          <ChatMessages>
            {messages.map((message) => (
              <Message key={message.id} isUser={message.isUser}>
                <MessageAvatar isUser={message.isUser}>
                  {message.isUser ? 'U' : <FaRobot />}
                </MessageAvatar>
                <MessageContent isUser={message.isUser}>
                  {message.text}
                </MessageContent>
              </Message>
            ))}
            {isTyping && (
              <Message isUser={false}>
                <MessageAvatar isUser={false}>
                  <FaRobot />
                </MessageAvatar>
                <MessageContent isUser={false}>
                  타이핑 중...
                </MessageContent>
              </Message>
            )}
            <div ref={messagesEndRef} />
          </ChatMessages>
          
          <ChatInput>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="메시지를 입력하세요..."
              disabled={isTyping}
            />
            <SendButton onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
              <FaPaperPlane />
            </SendButton>
          </ChatInput>
        </ChatWindow>
      )}
      
      <ChatButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaComments />}
      </ChatButton>
    </ChatbotContainer>
  );
};

export default Chatbot; 