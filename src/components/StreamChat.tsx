'use client';

import { useState, useRef, useEffect } from 'react';

// Chat message type definition
type ChatMessage = {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  isSubscriber: boolean;
  isModerator: boolean;
};

// Sample avatar colors
const avatarColors = [
  'bg-purple-500',
  'bg-pink-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-red-500',
  'bg-indigo-500',
];

// Sample usernames
const sampleUsernames = [
  '星迷42',
  '宇宙玩家',
  '太空探索者',
  '银河任务',
  '火箭骑士',
  '月球漫步者',
  '星际旅行者',
  '恒星观察家',
  '轨道观测员',
  '宇宙航行者',
  '星云新星',
  '土星环',
  '木星欢乐',
  '火星漫游者',
  '金星观测者',
];

// Sample chat messages
const sampleMessages = [
  '今天的直播太棒了！内容真的很精彩 🚀',
  '你打算什么时候开始问答环节？',
  '请大家记得遵守聊天规则！',
  '刚刚订阅！迫不及待想看更多这样的内容！',
  '有人注意到开头的公告吗？',
  '来自德国的问候！🇩🇪',
  '喜欢新的设置！',
  '能再解释一下最后那部分吗？',
  '这太有帮助了，感谢你的直播！',
  '有其他人是从澳大利亚观看的吗？🇦🇺',
  '哪里可以找到关于这个主题的更多信息？',
  '第一次赶上现场直播！',
  '今天的音质好多了 🎧',
  '期待下一集！',
  '能给我们一个特写镜头吗？',
  '你计划也涵盖高级主题吗？',
  '哈哈，太搞笑了 😂',
  '今天学到了很多，谢谢！',
  '社区有Discord服务器吗？',
  '你用的是什么软件？',
];

// Sample demo messages
const demoMessages: ChatMessage[] = [
  {
    id: '1',
    username: '星迷42',
    message: '今天的直播太棒了！内容真的很精彩 🚀',
    timestamp: new Date(),
    isSubscriber: true,
    isModerator: false,
  },
  {
    id: '2',
    username: '宇宙玩家',
    message: '你打算什么时候开始问答环节？',
    timestamp: new Date(),
    isSubscriber: false,
    isModerator: false,
  },
  {
    id: '3',
    username: '管理员小王',
    message: '请大家记得遵守聊天规则！',
    timestamp: new Date(),
    isSubscriber: true,
    isModerator: true,
  },
  {
    id: '4',
    username: '太空探索者',
    message: '刚刚订阅！迫不及待想看更多这样的内容！',
    timestamp: new Date(),
    isSubscriber: true,
    isModerator: false,
  },
  {
    id: '5',
    username: '银河任务',
    message: '有人注意到开头的公告吗？',
    timestamp: new Date(),
    isSubscriber: false,
    isModerator: false,
  },
];

interface StreamChatProps {
  autoAddMessages?: boolean;
  lightMode?: boolean;
}

const StreamChat = ({ autoAddMessages = false, lightMode = false }: StreamChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>(demoMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Auto-add random messages at random intervals
  useEffect(() => {
    if (!autoAddMessages) return;

    const addRandomMessage = () => {
      const username = sampleUsernames[Math.floor(Math.random() * sampleUsernames.length)];
      const message = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
      const isSubscriber = Math.random() > 0.6;
      const isModerator = Math.random() > 0.9;

      const newChatMessage: ChatMessage = {
        id: Date.now().toString(),
        username,
        message,
        timestamp: new Date(),
        isSubscriber,
        isModerator,
      };

      setMessages(prev => [...prev, newChatMessage]);
    };

    // Add a message immediately
    addRandomMessage();

    // Set up interval for adding messages (random interval between 2-5 seconds)
    const getRandomInterval = () => Math.floor(Math.random() * 3000) + 2000;
    let timeoutId: NodeJS.Timeout;

    const scheduleNextMessage = () => {
      timeoutId = setTimeout(() => {
        addRandomMessage();
        scheduleNextMessage();
      }, getRandomInterval());
    };

    scheduleNextMessage();

    // Clean up on unmount
    return () => {
      clearTimeout(timeoutId);
    };
  }, [autoAddMessages]);

  // Get avatar color based on username
  const getAvatarColor = (username: string) => {
    const index = username.charCodeAt(0) % avatarColors.length;
    return avatarColors[index];
  };

  // Format timestamp to display only the time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Send a message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const newChatMessage: ChatMessage = {
      id: Date.now().toString(),
      username: 'You',
      message: newMessage,
      timestamp: new Date(),
      isSubscriber: true,
      isModerator: false,
    };

    setMessages([...messages, newChatMessage]);
    setNewMessage('');
  };

  // Theme configuration
  const themeConfig = {
    container: lightMode ? "bg-white" : "bg-gray-800",
    header: lightMode ? "bg-gray-100 text-gray-800 border-gray-200" : "bg-gray-900 text-white border-gray-700",
    messageArea: lightMode ? "bg-white light-scrollbar" : "bg-gray-800",
    messageText: lightMode ? "text-gray-700" : "text-gray-300",
    username: {
      normal: lightMode ? "text-gray-800" : "text-white",
      subscriber: lightMode ? "text-purple-600" : "text-purple-400",
      moderator: lightMode ? "text-green-600" : "text-green-400",
    },
    badges: {
      subscriber: lightMode ? "bg-purple-500" : "bg-purple-600",
      moderator: lightMode ? "bg-green-500" : "bg-green-600",
    },
    input: {
      bg: lightMode ? "bg-gray-100" : "bg-gray-700",
      text: lightMode ? "text-gray-800" : "text-white",
      placeholder: lightMode ? "placeholder-gray-500" : "placeholder-gray-400",
    },
    button: lightMode ? "bg-purple-500 hover:bg-purple-600" : "bg-purple-600 hover:bg-purple-700",
    timestamp: lightMode ? "text-gray-500" : "text-gray-500",
  };

  return (
    <div className={`flex flex-col h-full ${themeConfig.container} rounded-md overflow-hidden shadow-sm`}>
      {/* Chat header */}
      <div className={`${themeConfig.header} p-3 border-b flex items-center justify-between`}>
        <h3 className="font-semibold text-lg">互动聊天</h3>
        <div className="flex items-center text-xs">
          <span className="mr-2">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
            {messages.length} 观看人数
          </span>
        </div>
      </div>

      {/* Chat messages */}
      <div className={`flex-1 overflow-y-auto p-3 space-y-3 ${themeConfig.messageArea}`}>
        {messages.map((msg) => (
          <div key={msg.id} className="flex items-start text-sm animate-fadeIn">
            <div className={`flex-shrink-0 w-8 h-8 ${getAvatarColor(msg.username)} rounded-full flex items-center justify-center text-white font-bold text-xs`}>
              {msg.username.charAt(0).toUpperCase()}
            </div>
            <div className="ml-2 flex-1">
              <div className="flex items-baseline flex-wrap">
                <span className={`font-medium ${msg.isModerator ? themeConfig.username.moderator : msg.isSubscriber ? themeConfig.username.subscriber : themeConfig.username.normal} mr-1`}>
                  {msg.username}
                </span>
                {msg.isSubscriber && !msg.isModerator && (
                  <span className={`${themeConfig.badges.subscriber} text-xs px-1 rounded text-white mr-1`}>sub</span>
                )}
                {msg.isModerator && (
                  <span className={`${themeConfig.badges.moderator} text-xs px-1 rounded text-white mr-1`}>mod</span>
                )}
                <span className={`${themeConfig.timestamp} text-xs`}>{formatTime(msg.timestamp)}</span>
              </div>
              <p className={`${themeConfig.messageText} mt-1 break-words`}>{msg.message}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat input */}
      <form onSubmit={handleSendMessage} className={`p-3 ${themeConfig.header} border-t`}>
        <div className="flex rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="说点什么..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={`flex-1 px-4 py-2 ${themeConfig.input.bg} ${themeConfig.input.text} ${themeConfig.input.placeholder} focus:outline-none`}
          />
          <button
            type="submit"
            className={`${themeConfig.button} text-white px-4 py-2 font-medium transition-colors`}
          >
            发送
          </button>
        </div>
      </form>
    </div>
  );
};

export default StreamChat; 