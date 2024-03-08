"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

interface ChatBoxProps {
  messages: string;
  setMessages: (value: string) => void;
}

const PHONE_NUMBER = "5511913674909";

export const ChatBoxCar = ({ messages, setMessages }: ChatBoxProps) => {
  const [show, setShow] = useState(false);
  const toggleChatBox = () => {
    setShow(!show);
  };

  const sendMessage = () => {
    const encodedMessage = encodeURIComponent(messages);
    const whatsappURL = `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <>
      <button
        className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full  h-[50px] w-[50px] shadow z-50 flex items-center justify-center"
        onClick={toggleChatBox}
      >
        <MessageCircle className="w-10 h-10" />
      </button>

      {show && (
        <div className="fixed w-[400px]  bottom-32 right-8 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
          <p>Aqui está a caixa de chat</p>

          {/* <button onClick={toggleChatBox} className="text-red-500 mt-2">
            Fechar
          </button> */}

          <div className="mb-auto space-y-4 flex flex-col">
            <Textarea
              value={messages}
              className="w-full h-32"
              onChange={(e) => setMessages(e.target.value)}
            />
            <Button onClick={sendMessage}>Enviar</Button>
          </div>
        </div>
      )}
    </>
  );
};
