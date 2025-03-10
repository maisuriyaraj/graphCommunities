import React, { useEffect, useRef, useState } from 'react';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from "rehype-sanitize";
import EmojiPicker from "emoji-picker-react";
import MDEditor, { commands } from '@uiw/react-md-editor';


import botImg from '../../../assets/bot-img.png';
import man from '../../../assets/man.png';
import robot from '../../../assets/robot.png';
import { getAccessTokens } from '../../../utils/CookiesService';
import { useSocket } from '../../../Contexts/SocketContext';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { getAIChatConfigs } from '../../../redux/AISlice/Ai';
import { SyncLoaderComponent } from '../../../components/loader';



export default function GraphAI() {

  const [chatsConversations, setChatsRooms] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [userPrompt, setPrompt] = useState("");
  const socketClient = useSocket();
  const isInitialMount = useRef(true);
  const [isLoading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const dispatch = useDispatch();

  const getAIChats = () => {
    dispatch(getAIChatConfigs({
      onSuccess: (response) => {
        setChatsRooms(response.data);
        setSelectedChat(response.data[0]);
      }
    }));
  }

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      getAIChats();
    }
  }, []);

  useEffect(() => {
    if (socketClient) {
      socketClient.on('response', (data) => {
        setSelectedChat(data);
      });

      socketClient.on('generating', (data) => {
        if (data.isGenerating) {
          setLoading(true);
        } else {
          setLoading(false);
        }
      });
      socketClient.on('roomCreated', (data) => {
        setChatsRooms(data);
      });
    }

    return () => {
      socketClient.off('response');
      socketClient.off('roomCreated');
    }
  }, [socketClient.socket]);

  const createNewRoom = () => {
    const newRoomId = uuidv4();
    const chatTitle = 'AI Chat';

    const payload = {
      roomId: newRoomId,
      token: getAccessTokens(),
      chatTitle,
    }
    let rooms = chatsConversations || [];
    rooms.push(payload);
    setChatsRooms(rooms);
    socketClient.emit('createRoom', payload);
  };


  const chatboardDivRef = useRef(null);

  useEffect(() => {
    scrollAuto();
  }, [selectedChat]);

  const scrollAuto = () => {
    if (chatboardDivRef.current) {
      chatboardDivRef.current.scrollTop = chatboardDivRef.current.scrollHeight;
    }
  }

  const handleSelectChat = (item, index) => {
    setSelectedChat(item);
  }

  const sendMessage = async () => {
    selectedChat.chatHistory.push({ sender: 'user', message: userPrompt });
    socketClient.emit('message', { token: getAccessTokens(), prompt: userPrompt, roomId: selectedChat?.uuid });
    setPrompt('');
  };

  const handleInputChange = (value) => {
    setPrompt(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (userPrompt) {
        sendMessage();
      }
    }
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);

  };

  const handleEmojiClick = (emojiObject) => {
    const textarea = document.querySelector("textarea");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const newText = text.slice(0, start) + emojiObject.emoji + text.slice(end);
    handleInputChange(newText);
    setShowEmojiPicker(false);
  };

  return (
    <div className="flex antialiased text-gray-800 overflow-x-hidden overflow-y-hidden h-screen">
      <div className="flex flex-row w-full h-full">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
          <div className="flex flex-row items-center justify-center h-12 w-full">
            <div className="flex items-center justify-center rounded-2xl text-green-700 bg-green-100 h-10 w-10">
              <i className="bi bi-robot text-2xl"></i>
            </div>
            <div className="ml-2 font-bold text-2xl">GraphAI</div>
          </div>
          <div className="flex flex-col mt-8">
            <div className="flex flex-row items-center rounded-xl cursor-pointer justify-between">
              <button
                onClick={() => createNewRoom()}
                className="flex flex-row w-full items-center border justify-between text-[16px] hover:bg-gray-100 rounded-xl p-4"
              >
                <div className="font-bold">New Conversation</div>
                <div className="flex items-center justify-center text-black text-[16px] h-4 w-4">
                  <i className="bi bi-plus-circle"></i>
                </div>
              </button>
            </div>
            <div className="flex flex-col space-y-1 mt-4 h-[50vh] scroll-smooth overflow-y-auto">
              {chatsConversations.map((x, i) => (
                <button
                  key={i}
                  className={`flex flex-row w-full items-center border justify-between text-[16px] hover:bg-gray-100 rounded-xl p-4 ${selectedChat?.uuid === x?.uuid ? 'bg-gray-100' : 'bg-white'
                    }`}
                  onClick={() => handleSelectChat(x, i)}
                >
                  <div
                    className="ml-2 text-sm font-semibold text-left w-40 overflow-hidden"
                    style={{ textWrap: 'nowrap', textOverflow: 'ellipsis' }}
                  >
                    {x?.chatTitle}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex flex-col flex-auto h-full md:h-[85vh] overflow-auto p-4">
          <div
            className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
            id="chatboard"
          >
            {selectedChat && selectedChat.chatHistory.length > 0 && (
              <div
                ref={chatboardDivRef}
                className="flex flex-col h-full overflow-x-auto mb-4 scroll-smooth"
              >
                {selectedChat.chatHistory.map((chat, i) => (
                  <div className="flex flex-col h-full" id="chatBoard" key={i}>
                    <div className="grid grid-cols-12 gap-y-2">
                      {chat.sender === 'user' && (
                        <div className="col-start-6 col-end-13 p-3 rounded-lg">
                          <div className="flex items-center justify-start flex-row-reverse">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 flex-shrink-0">
                              <img src={man} alt="U" />
                            </div>
                            <div className="relative mr-3 text-sm bg-green-100 py-2 px-4 shadow rounded-xl">
                              <div>
                                <ReactMarkdown>{chat.message}</ReactMarkdown>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {chat.sender === 'AI' && (
                        <div className="col-start-1 col-end-8 p-3 rounded-lg">
                          <div className="flex flex-row items-center">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white flex-shrink-0">
                              <img src={botImg} alt="B" />
                            </div>
                            <div className="relative ml-3 text-sm bg-white py-3 px-5 shadow rounded-xl">
                              <div>
                                <ReactMarkdown>{chat.message}</ReactMarkdown>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {selectedChat && (
              <div className="relative w-full">
                {isLoading && <div className="absolute z-50 top-4">
                  <SyncLoaderComponent />
                </div>}
                <MDEditor
                  value={userPrompt}
                  onChange={handleInputChange}
                  preview="edit"
                  textareaProps={{
                    disabled: isLoading,
                    placeholder: 'Enter prompt...',
                    onKeyDown: handleKeyDown,
                  }}
                  height={70}
                  previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                  }}
                  commands={[
                    commands.bold,
                    commands.italic,
                    commands.strikethrough,
                    {
                      name: "emoji",
                      keyCommand: "emoji",
                      buttonProps: { "aria-label": "Insert emoji" },
                      icon: <span><i className="bi bi-emoji-smile"></i></span>,
                      execute: () => toggleEmojiPicker(),
                    },
                  ]}
                  extraCommands={[]}
                />
                {showEmojiPicker && (
                  <div style={{ position: "absolute", top: "-450px", zIndex: 1000 }}>
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                )}
                <div className="absolute right-4 flex top-9">
                  {userPrompt && (
                    <button
                      className="flex items-center justify-center rounded-xl flex-shrink-0 mx-2"
                      onClick={() => sendMessage()}
                    >
                      <i className="bi bi-send"></i>
                    </button>
                  )}
                </div>
              </div>
            )}
            {!selectedChat && (
              <div className="flex flex-col items-center justify-center h-full">
                <img src={robot} alt="" width={250} className="w-3/4 sm:w-1/2" />
                <h2 className="text-lg font-bold">Start Conversation</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  )
}
