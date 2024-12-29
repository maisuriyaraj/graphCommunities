import React, { useEffect, useRef, useState } from 'react';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from "rehype-sanitize";

import MDEditor, { commands } from '@uiw/react-md-editor';
import botImg from '../../../assets/bot-img.png';
import man from '../../../assets/man.png';
import robot from '../../../assets/robot.png';
import io from 'socket.io-client';
import { getAccessTokens } from '../../../utils/CookiesService';
import { useSocket } from '../../../Contexts/SocketContext';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { getAIChatConfigs } from '../../../redux/AISlice/Ai';



export default function GraphAI() {

  const [chatsConversations, setChatsRooms] = useState([]);
  const [aiConversations, setAiConversations] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState();
  const [selectedChat, setSelectedChat] = useState(null);
  const [userPrompt, setPrompt] = useState("");
  const [loader, setLoader] = useState(false);
  const [userId, setUserID] = useState(null);
  const [room_id, setRoomId] = useState(null);
  const socketClient = useSocket();
  const isInitialMount = useRef(true);
  const dispatch = useDispatch();


  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      getAIChats();
    }
  }, []);

  function getAIChats() {
    dispatch(getAIChatConfigs({
      onSuccess: (response) => {
        setChatsRooms(response.data);
        setSelectedChat(response.data[0]);
      }
    }));
  }

  const createNewRoom = () => {
    const newRoomId = uuidv4();
    const chatTitle = 'AI Chat';
    setRoomId(newRoomId);

    const payload = {
      roomId: newRoomId,
      token: getAccessTokens(),
      chatTitle,
    }

    socketClient.emit('createRoom', payload);

    socketClient.on('roomCreated', (data) => {
      console.log(data);
      setChatsRooms(data);
    });
  };


  const chatboardDivRef = useRef(null);

  useEffect(() => {
    scrollAuto();
  }, [ selectedChat]); // Re-run the effect whenever messages change

  function scrollAuto() {
    if (chatboardDivRef.current) {
      chatboardDivRef.current.scrollTop = chatboardDivRef.current.scrollHeight;
    }
  }

  const handleSelectChat = (item, index) => {
    setSelectedIndex(index);
    setSelectedChat(item);
    console.log(item)
  }

  const sendMessage = async () => {
    console.log("USER PROMPT : ", userPrompt);
    console.log("SELECTED CHAT : ", selectedChat);
    socketClient.emit('message', { token: getAccessTokens(), prompt: userPrompt, roomId: selectedChat.uuid });
    // Remove the previous listener for 'response' to avoid duplicates
    socketClient.off('response');
    socketClient.on('response', (data) => {
      console.log('AI RESPONSE : ', data);
      setSelectedChat(data);
      setPrompt('');
    });
  };

  const handleInputChange = (value) => {
    // Detect Markdown patterns and format
    const formattedValue = applyMarkdownFormatting(value || "");
    setPrompt(formattedValue);
  };

  const applyMarkdownFormatting = (text) => {
    // Replace Markdown patterns with HTML-like equivalents
    return text
      .replace(/(\*\*)(.*?)\1/g, "**$2**") // Bold (**TEXT**)
      .replace(/(\*)(.*?)\1/g, "*$2*") // Italics (*TEXT*)
      .replace(/(_)(.*?)\1/g, "_$2_"); // Underline (_TEXT_)
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default behavior of adding a new line
      console.log("SUBMIT", userPrompt);
      if (userPrompt) {
        sendMessage();
      }
    }
  };

  const openToolBar = () => {
    const toolbar = document.querySelector('.w-md-editor-toolbar');
    if (toolbar) {
      console.log(toolbar)
      if (toolbar.style.display == 'none') {
        toolbar.style.display = 'block';
      } else {
        toolbar.style.display = 'none';
      }
    }
  }



  return (
    // <div className='h-[100vh] w-full px-5 overflow-hidden' id='graphAi'>
    <div className="flex antialiased text-gray-800 overflow-x-hidden overflow-y-hidden">

      <div className="flex flex-row h-full w-full">
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
          <div className="flex flex-row items-center justify-center h-12 w-full">
            <div className="flex items-center justify-center rounded-2xl text-green-700 bg-green-100 h-10 w-10">
              <i className="bi bi-robot text-2xl"></i>
            </div>
            <div className="ml-2 font-bold text-2xl">GraphAI</div>
          </div>
          <div className="flex flex-col mt-8">
            <div className="flex flex-row items-center rounded-xl  cursor-pointer justify-between">
              <button onClick={() => createNewRoom()} className="flex flex-row w-full items-center border  justify-between text-[16px] hover:bg-gray-100 rounded-xl p-4">
                <div className="font-bold">New Conversation</div>
                <div className="flex items-center justify-center text-black text-[16px] h-4 w-4">
                  <i className="bi bi-plus-circle"></i>
                </div>
              </button>
            </div>
            <div className="flex flex-col space-y-1 mt-4 h-[50vh] scroll-smooth overflow-y-auto">
              {
                chatsConversations.map((x, i) => (
                  <>
                    <button className={`flex flex-row w-full items-center border  justify-between text-[16px] hover:bg-gray-100 rounded-xl p-4 ${selectedChat.uuid == x.uuid ? 'bg-gray-100' : 'bg-white'}`} key={i} onClick={() => handleSelectChat(x, i)}>
                      <div className="ml-2 text-sm font-semibold text-left w-40 overflow-hidden" style={{ textWrap: 'nowrap', textOverflow: 'ellipsis' }}>{x?.chatTitle}</div>
                    </button>
                  </>
                ))
              }
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-auto h-[85vh] overflow-auto p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4" id='chatboard' >
            {selectedChat && selectedChat.chatHistory.length > 0 && <div ref={chatboardDivRef} className="flex flex-col h-full overflow-x-auto mb-4 scroll-smooth" >
              {selectedChat.chatHistory.map((chat, i) => (
                <>
                  <div className="flex flex-col h-full" id='chatBoard' key={i}>
                    <div className="grid grid-cols-12 gap-y-2">
                      {chat.sender == "user" && <div className="col-start-6 user-chat col-end-13 p-3 rounded-lg">
                        <div className="flex items-center justify-start flex-row-reverse">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 flex-shrink-0">
                            <img src={man} alt='U' />
                          </div>
                          <div className="relative mr-3 text-sm bg-green-100 py-2 px-4 shadow rounded-xl">
                            <div><ReactMarkdown>{chat.message}</ReactMarkdown></div>
                          </div>
                        </div>
                      </div>}
                      {chat.sender == "AI" && <div className="col-start-1 bot-chat col-end-8 p-3 rounded-lg">
                        <div className="flex flex-row items-center">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white flex-shrink-0">
                            <img src={botImg} alt="B" />
                          </div>
                          <div className="relative ml-3 text-sm bg-white py-3 px-5 shadow rounded-xl">
                            <div><ReactMarkdown>{chat.message}</ReactMarkdown></div>
                            {/* {!chat.bot && <SyncLoader size={8} /> } */}
                          </div>
                        </div>
                      </div>}

                    </div>
                  </div>
                </>
              ))}
            </div>}
            <div className='relative w-full'>
              <div className='absolute z-50 top-9 left-2'>
                <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>
              </div>
              <MDEditor
                value={userPrompt}
                onChange={handleInputChange}
                preview="edit"
                textareaProps={{
                  placeholder: "Enter Message ...",
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
                  commands.link,
                ]}
                extraCommands={[]}
              />
              <div className="absolute right-4 flex top-9">
                <button className="flex items-center justify-center rounded-xl flex-shrink-0 mx-2" onClick={() => openToolBar()}>
                  <i className="bi bi-code-square"></i>
                </button>
                {userPrompt && <button className="flex items-center justify-center rounded-xl flex-shrink-0 mx-2" onClick={() => sendMessage()}>
                  <i className="bi bi-send"></i>
                </button>}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
