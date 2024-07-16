"use client"
import { useState } from "react";
import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import styles from './page.module.css';

export default function TravelAI() {
  const [theInput, setTheInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    return storedMessages ? JSON.parse(storedMessages) : [
      {
        role: "assistant",
        content: "Hello! I'm Travel AI. How can I assist you with your travel plans today?",
      },
    ];
  });

  const callGetResponse = async (input:string) => {
    setIsLoading(true);
    setMessages([...messages, { role: "user", content: input }]);
    setTheInput("");
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...messages, { role: "user", content: input }] }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch response from ChatGPT API");
      }
      const data = await response.json();
      const { output } = data;
      setMessages((prevMessages:any) => [...prevMessages, output]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Travel AI</h1>
      <div className={styles.chatContainer}>
        <div className={styles.chatMessages}>
          {messages?.map((msg:any, index:number) => (
            <div
              key={index}
              className={`${styles.chatMessage} ${msg.role === "assistant" ? styles.assistant : styles.user}`}
            >
              {msg.content}
            </div>
          ))}
          {isLoading && (
            <div className={styles.chatBubble}>
              <div className={styles.typing}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
              </div>
            </div>
          )}
        </div>
        <div className={styles.inputContainer}>
          <Input
            value={theInput}
            onChange={(e) => setTheInput(e.target.value)}
            className={styles.textarea}
            placeholder="Type your message here..."
            prefix={<SendOutlined />}
            suffix={
              <Button
                type="primary"
                className={styles.sendButton}
                onClick={() => callGetResponse(theInput)}
              >
                Send
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}
