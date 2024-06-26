import { useState, useRef, useEffect } from "react";
import "./ChatBot.css";
import { Message, InputData, KeyResponse } from "../../types/ChatBot";

const ChatBot = (): JSX.Element => {
  const [messages, setMessages] = useState<Message[] | []>([{
          text: "Добрый день! Чем я могу вам помочь?",
          isBot: true,
        }]);
  const [input, setInput] = useState<InputData>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const MAX_MESSAGES = 20; // Максимальное количество сообщений

  const responses: KeyResponse = [
    {
      keywords: ["массив"],
      response:
        "Если вы хотите придать древесине цвет, вам необходимо выбрать 3 компонента: морилка, грунт и лак. Если такой необходимости нет, то неохлдим грунт и лак.",
    },
    {
      keywords: ["мдф"],
      response:
        "Если вы хотите придать поверхности эффект старения или изменения оттенка, вам необходимо будет выбрать 6 компонентов: грунт-изолятор, заполняющий грунт, краску, акриловый грунт, патину и лак. Если такой необходимости нет, то необходимо выбрать 3 компонента: грунт-изолятор, заполняющий грунт и краску.",
    },
    {
      keywords: ["морилка"],
      response:
        "Морилка – это специальное средство для окрашивания древесины, которое придает ей желаемый оттенок.",
    },
    {
      keywords: ["растворитель"],
      response:
        "Растворитель – это химическое вещество, используемое для разбавления красок и лаков.",
    },
    {
      keywords: ["грунт"],
      response:
        "Грунт – это основное покрытие, наносимое на поверхность перед окончательной отделкой, чтобы обеспечить адгезию и защиту.",
    },
    {
      keywords: ["лак"],
      response:
        "Лак – это прозрачное или окрашенное покрытие, наносимое на поверхность для защиты и придания блеска.",
    },
    {
      keywords: ["грунтовка-изолятор"],
      response:
        "Грунтовка-изолятор – это специальная грунтовка, предназначенная для изоляции поверхностей от влаги или других веществ.",
    },
    {
      keywords: ["краска"],
      response:
        "Краска – это материал, используемый для окрашивания поверхностей.",
    },
    {
      keywords: ["высокопробная"],
      response:
        "Высокопробная краска – это краска, обладающая высокой степенью качества и устойчивости к внешним воздействиям.",
    },
    {
      keywords: ["акриловый"],
      response:
        "Акриловый – это материал или покрытие на основе акрила, обычно обладающее хорошей стойкостью и эластичностью.",
    },
    {
      keywords: ["патина"],
      response:
        "Патина – это специальное средство для придания поверхности эффекта старения или изменения оттенка.",
    },
    {
      keywords: ["технология"],
      response:
        "Технология покраски – это процесс применения краски, включающий подготовку поверхности, выбор материалов и способов нанесения.",
    },
    {
      keywords: ["выбор", "выбрать"],
      response:
        "Какой материал вы хотите использовать в качестве покраски? МДФ или Массив?",
    },
    {
      keywords: ["режим", "работы"],
      response:
        "все наши филиалы работают с 10.00-20.00 по местному времени без перерыва на обед.",
    },
    { keywords: ["адрес", "адреса"], response: "Уеажите ваш город." },
    {
      keywords: ["адрес", "адреса"],
      response: "Вот список адрессов филиала, находящихся в вашем городе:",
    },
  ];

  //? отправка
  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { text: input, isBot: false };
      //? Поиск ответа
      const foundResponse = responses.find(({ keywords }) =>
        keywords.some((keyword) =>
          input.toLowerCase().includes(keyword.toLowerCase())
        )
      );

      let botMessage: Message
      if (foundResponse) {
        botMessage = { text: `${foundResponse.response}`, isBot: true };
      } else {
        botMessage = {
          text: "Не понимаю вашего вопроса, напишите еще раз подробнее",
          isBot: true,
        };
      }

      //? сообщение пользователя
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, userMessage];
        return newMessages.length > MAX_MESSAGES
          ? newMessages.slice(-MAX_MESSAGES)
          : newMessages;
      });

      //? сообщение бота
      setTimeout(() => {
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages, botMessage];
          return newMessages.length > MAX_MESSAGES
            ? newMessages.slice(-MAX_MESSAGES)
            : newMessages;
        });
      }, 500);

      setInput("");
      scrollToBottom();
    }
  };

  //? прокрутка
  const scrollToBottom: () => void = () => {
    if (messagesEndRef.current instanceof HTMLDivElement) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="borderChat">
        {messages.map((msg: Message, index: number) => (
          <div key={index} className={`message ${msg.isBot ? "bot" : "user"}`}>
            <span>{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        className="input"
      />
      <button onClick={handleSend} className="button">
        Send
      </button>
    </div>
  );
};

export default ChatBot;
