const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const CodegenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [],
});

export const GenAiCode = model.startChat({
  generationConfig: CodegenerationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "create todo app:Generate a Project in React. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, \nwithout any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from \"lucide-react\" and use it in JSX as <Heart className=\"\" />.\nalso you can use date-fns for date format and react-chartjs-2 chart, graph library\n\nReturn the response in JSON format with the following schema:\n{\n  \"projectTitle\": \"\",\n  \"explanation\": \"\",\n  \"files\": {\n    \"/App.js\": {\n      \"code\": \"\"\n    },\n    ...\n  },\n  \"generatedFiles\": []\n}\n\nHere’s the reformatted and improved version of your prompt:\n\nGenerate a programming code structure for a React project using Vite. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from \"lucide-react\" and use it in JSX as <Heart className=\"\" />.\n\nReturn the response in JSON format with the following schema:\n\njson\nCopy code\n{\n  \"projectTitle\": \"\",\n  \"explanation\": \"\",\n  \"files\": {\n    \"/App.js\": {\n      \"code\": \"\"\n    },\n    ...\n  },\n  \"generatedFiles\": []\n}\nEnsure the files field contains all created files, and the generatedFiles field lists all the filenames. Each file's code should be included in the code field, following this example:\nfiles:{\n  \"/App.js\": {\n    \"code\": \"import React from 'react';\\nimport './styles.css';\\nexport default function App() {\\n  return (\\n    <div className='p-4 bg-gray-100 text-center'>\\n      <h1 className='text-2xl font-bold text-blue-500'>Hello, Tailwind CSS with Sandpack!</h1>\\n      <p className='mt-2 text-gray-700'>This is a live code editor.</p>\\n    </div>\\n  );\\n}\"\n  }\n}\n  Additionally, include an explanation of the project's structure, purpose, and functionality in the explanation field. Make the response concise and clear in one paragraph.\n  - When asked then only use this package to import, here are some packages available to import and use (date-fns,react-chartjs-2,\"firebase\",\"@google/generative-ai\" ) only when it required\n  \n  - For placeholder images, please use a https://archive.org/download/placeholder-image/placeholder-image.jpg\n  -Add Emoji icons whenever needed to give good user experinence\n  - all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\n- By default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\n- Use icons from lucide-react for logos.\n\n- Use stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.\n  "},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"projectTitle\": \"Todo App with Tailwind CSS\",\n  \"explanation\": \"This project implements a simple yet functional Todo application using React and Tailwind CSS. It allows users to add, delete, and mark tasks as complete. The app is structured with separate components for better organization and maintainability, utilizing date-fns for date formatting and lucide-react icons for visual elements. It provides a clean and user-friendly interface for managing daily tasks.\",\n  \"files\": {\n    \"/App.js\": {\n      \"code\": \"import React from 'react';\\nimport TaskList from './components/TaskList';\\nimport AddTask from './components/AddTask';\\nimport { useState } from 'react';\\nimport { format } from 'date-fns';\\nimport { Home, Clock } from 'lucide-react';\\n\\nfunction App() {\\n  const [tasks, setTasks] = useState([\\n    { id: 1, text: 'Grocery Shopping 🛒', completed: false, date: new Date()},\\n    { id: 2, text: 'Pay Bills 🧾', completed: true, date: new Date()},\\n    { id: 3, text: 'Walk the Dog 🐕', completed: false, date: new Date()},\\n  ]);\\n\\n  const handleAddTask = (text) => {\\n    const newTask = { id: Date.now(), text, completed: false, date: new Date() };\\n    setTasks([...tasks, newTask]);\\n  };\\n\\n  const handleToggleComplete = (id) => {\\n    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));\\n  };\\n\\n  const handleDeleteTask = (id) => {\\n      setTasks(tasks.filter(task => task.id !== id));\\n  };\\n\\n\\n  return (\\n    <div className=\\\"bg-gray-100 min-h-screen font-sans\\\">\\n      <header className=\\\"bg-blue-500 text-white p-4 flex justify-between items-center\\\">\\n        <div className=\\\"flex items-center\\\">\\n        <Home className='mr-2'/> <span className='font-bold'>My ToDo App</span> \\n        </div>\\n        <div className='flex items-center'>\\n         <Clock className='mr-1'/> {format(new Date(), 'MMMM dd, yyyy')}</div>\\n      </header>\\n      <div className=\\\"container mx-auto p-4\\\">\\n        <AddTask onAddTask={handleAddTask} />\\n        <TaskList tasks={tasks} onToggleComplete={handleToggleComplete} onDeleteTask={handleDeleteTask}/>\\n      </div>\\n     <footer className='text-center p-3 mt-4 bg-gray-200'>&copy; 2024 ToDo App</footer>\\n    </div>\\n  );\\n}\\n\\nexport default App;\\n\"\n    },\n    \"/components/AddTask.js\": {\n      \"code\": \"import React, { useState } from 'react';\\nimport { Plus } from 'lucide-react';\\n\\nfunction AddTask({ onAddTask }) {\\n  const [text, setText] = useState('');\\n\\n  const handleSubmit = (e) => {\\n    e.preventDefault();\\n    if (text.trim() !== '') {\\n      onAddTask(text);\\n      setText('');\\n    }\\n  };\\n\\n  return (\\n    <form onSubmit={handleSubmit} className='flex mb-4 shadow rounded'>\\n      <input\\n        type=\\\"text\\\"\\n        placeholder=\\\"Add a new task...\\\"\\n        value={text}\\n        onChange={(e) => setText(e.target.value)}\\n        className='p-2 border-r focus:outline-none w-full rounded-l'\\n      />\\n      <button type=\\\"submit\\\" className='bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 focus:outline-none '>\\n         <Plus className='w-5 h-5' />\\n      </button>\\n    </form>\\n  );\\n}\\n\\nexport default AddTask;\\n\"\n    },\n    \"/components/TaskList.js\": {\n      \"code\": \"import React from 'react';\\nimport { Trash, Check, X } from 'lucide-react';\\n\\nfunction TaskList({ tasks, onToggleComplete, onDeleteTask }) {\\n  return (\\n    <ul className=\\\"space-y-2\\\">\\n      {tasks.map((task) => (\\n        <li key={task.id} className='bg-white p-3 shadow rounded flex justify-between items-center'>\\n          <div className='flex items-center'>\\n          <input \\n            type=\\\"checkbox\\\" \\n            checked={task.completed} \\n            onChange={() => onToggleComplete(task.id)} \\n            className='mr-2 w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer'\\n          />\\n          <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>\\n            {task.text}\\n          </span>\\n          </div>\\n          <div className='flex gap-2'>\\n          <button onClick={() => onDeleteTask(task.id)} className='text-red-500 hover:text-red-700 focus:outline-none' >\\n            <Trash className='w-4 h-4'/>\\n          </button>\\n          {task.completed ? ( <Check className='w-4 h-4 text-green-500'/>) : (<X className='w-4 h-4 text-red-500'/>)}\\n          </div>\\n        </li>\\n      ))}\\n    </ul>\\n  );\\n}\\n\\nexport default TaskList;\\n\"\n    }\n  },\n  \"generatedFiles\": [\n    \"/App.js\",\n    \"/components/AddTask.js\",\n    \"/components/TaskList.js\"\n  ]\n}\n```\n"},
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
