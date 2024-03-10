"use client"
import React, { useState, useEffect, useRef } from "react";
import styles from './page.module.css';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default function TravelAI() {
  const [theInput, setTheInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [
      {
        role: "assistant",
        content: "Hello! I'm Travel AI. How can I assist you with your travel plans today?",
      },
    ];
  });

  const chatContainerRef = useRef(null);

  const callGetResponse = async () => {
    setIsLoading(true);
    let temp = [...messages];
    temp.push({ role: "user", content: theInput });
    setMessages(temp);
    setTheInput("");
    console.log("Calling OpenAI...");

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from ChatGPT API");
      }

      const data = await response.json();
      const { output } = data;
      console.log("OpenAI replied...", output.content);

      setMessages((prevMessages: string[]) => [...prevMessages, output]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    callGetResponse();
  };

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  return (
    <main>
      <h1 className={styles.heading}>Travel AI</h1>
      <div className={styles.chatContainer} ref={chatContainerRef}>
        <div className={styles.chatMessages}>
          {messages.map((e:any, index: number) => (
            <div key={index} className={`${styles.chatMessage} ${e.role === "assistant" ? styles.assistant : styles.user}`}>
              {e.role === "assistant" ? (
                <div className={styles.typingChat}>{e.content}</div>
              ) : (
                e.content
              )}
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
        <form className={styles.inputContainer} onSubmit={handleSubmit}>
          <Input
            value={theInput}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTheInput(event.target.value)}
            className={styles.textarea}
            placeholder="Type your message here..."
            prefix={<SearchOutlined />}
            suffix={<Button type='primary' className={styles.sendButton} onClick={callGetResponse}>
              Send
            </Button>}
          />
        </form>
      </div>
    </main>
  );
}
