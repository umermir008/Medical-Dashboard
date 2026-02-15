import React, { useState, useEffect } from "react";
import {
  Heart,
  Activity,
  Zap,
  Menu,
  Bell,
  Search,
  User,
  Settings,
  Home,
  Calendar,
  FileText,
  ChevronRight,
  Droplet,
  Thermometer,
  Play,
  Pause,
  LogOut,
  UserCircle,
  Clock,
  CheckCircle2,
  LineChart as LineChartIcon
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

// --- Mock Data Generators ---
const generateHRVData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      time: `${i}:00`,
      value: 60 + Math.random() * 40,
    });
  }
  return data;
};

// --- Sub-Components ---

const Sidebar = ({ isOpen, toggleSidebar, activeTab, setActiveTab }) => {
  const menuItems = [
    { icon: Home, label: "Overview" },
    { icon: Calendar, label: "Appointments" },
    { icon: User, label: "Patients" },
    { icon: Activity, label: "Analytics" },
    { icon: FileText, label: "Reports" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <motion.aside
      initial={{ width: 80 }}
      animate={{ width: isOpen ? 240 : 80 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 h-full bg-white/80 backdrop-blur-xl border-r border-slate-200 z-50 flex flex-col items-center py-8 shadow-2xl hidden md:flex"
    >
      <div className="mb-12">
        <motion.div
          whileHover={{ rotate: 180, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30 cursor-pointer"
        >
          <Activity className="text-white w-6 h-6" />
        </motion.div>
      </div>

      <nav className="flex-1 w-full px-4 space-y-4">
        {menuItems.map((item) => {
          const isActive = activeTab === item.label;
          return (
            <motion.button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center p-3 rounded-2xl transition-all duration-300 relative overflow-hidden group ${isActive ? "bg-red-50 text-red-500 shadow-sm" : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                }`}
            >
              {isActive && <motion.div layoutId="activeTabBg" className="absolute inset-0 bg-red-50 z-0 rounded-2xl" />}
              <div className="relative z-10 flex items-center w-full">
                <item.icon className={`w-6 h-6 transition-all duration-300 ${!isOpen && "mx-auto"} ${isActive ? "stroke-[2.5px] fill-red-500/10" : "stroke-[2px]"}`} />
                {isOpen && <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="ml-4 font-medium whitespace-nowrap">{item.label}</motion.span>}
              </div>
            </motion.button>
          );
        })}
      </nav>
      <button onClick={toggleSidebar} className="mt-auto p-2 text-slate-400 hover:text-slate-600 transition-colors"><Menu className="w-6 h-6" /></button>
    </motion.aside>
  );
};

// --- Page Views ---

const OverviewPage = ({ bpm, ecgData, isRecording, setIsRecording, hrvData }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6 pb-12">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-8 flex flex-col justify-between min-h-[400px]">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 leading-tight mb-2">Hi, Emma!<br /><span className="text-slate-400 font-medium text-2xl">Let's check your heart.</span></h1>
        </div>
        <div className="flex-1 flex items-center justify-center py-4">
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="relative">
            <Heart size={120} className="text-red-500 fill-red-500 drop-shadow-2xl" />
            <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute -top-4 -right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-slate-100">Live Pulse</motion.div>
          </motion.div>
        </div>
        <button className="w-full bg-slate-900 text-white py-4 px-6 rounded-2xl font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
          <Zap size={18} fill="currentColor" /> Run Diagnostics
        </button>
      </div>

      <div className="lg:col-span-7 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-8">
        <div className="flex justify-between items-start mb-8">
          <h3 className="text-lg font-bold text-slate-800">Heart Rate Variability</h3>
          <div className="text-2xl font-bold">82 <span className="text-sm font-normal text-slate-400">ms</span></div>
        </div>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hrvData}>
              <Bar dataKey="value" fill="#F97316" radius={[6, 6, 6, 6]} barSize={14} />
              <XAxis dataKey="time" hide />
              <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 bg-white rounded-[3rem] shadow-xl p-8 border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-800">ECG Recording</h3>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-slate-400">LEAD I • 25mm/s</span>
            <button onClick={() => setIsRecording(!isRecording)} className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
              {isRecording ? <Pause size={20} /> : <Play size={20} />}
            </button>
          </div>
        </div>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ecgData}>
              <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={3} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- ENHANCED VITALS GRID AREA --- */}
      <div className="lg:col-span-5 grid grid-cols-2 gap-5">
        {[
          { label: "ECG", value: `${bpm}`, unit: "bmp", status: "Normal", icon: Heart, color: "text-red-500", bg: "bg-red-50" },
          { label: "Blood Pressure", value: "118/76", unit: "mmHg", status: "Healthy", icon: Droplet, color: "text-orange-500", bg: "bg-orange-50" },
          { label: "Blood Oxygen", value: "98", unit: "%", status: "SpO2 Saturation", icon: Thermometer, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "HRV", value: "86", unit: "ms", status: "Stable", icon: Activity, color: "text-purple-500", bg: "bg-purple-50" }
        ].map((v, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col justify-between group transition-all"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold text-slate-500">{v.label}</span>
              <div className={`p-2 rounded-xl ${v.bg} ${v.color}`}>
                <v.icon size={18} strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-3xl font-black text-slate-800 tracking-tight">{v.value}</span>
                <span className="text-sm font-bold text-slate-400">{v.unit}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${v.color} animate-pulse`}></div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{v.status}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

const GenericPage = ({ title }) => (
  <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[3rem] p-12 min-h-[500px] flex flex-col items-center justify-center text-center border border-slate-100 shadow-xl">
    <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-8 rotate-3"><Activity className="text-slate-300 w-12 h-12" /></div>
    <h2 className="text-4xl font-black text-slate-800 mb-4">{title}</h2>
    <p className="text-slate-400 max-w-sm text-lg">Synchronizing secure health data from your connected medical devices...</p>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [bpm, setBpm] = useState(95);
  const [ecgData, setEcgData] = useState([]);
  const [isRecording, setIsRecording] = useState(true);
  const [hrvData] = useState(generateHRVData());
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    let interval;
    let time = 0;
    if (isRecording) {
      interval = setInterval(() => {
        time += 0.1;
        let amp = Math.sin(time * 3) * 0.1;
        if (time % 8 > 1.8 && time % 8 < 2.2) amp += 1.5 * Math.sin((time % 8 - 1.8) * Math.PI / 0.4);
        setEcgData(p => [...p.slice(-80), { time: Date.now(), value: amp + (Math.random() * 0.1) }]);
        if (time % 8 > 2.0 && time % 8 < 2.1) setBpm(p => 92 + Math.floor(Math.random() * 6));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-800 font-sans selection:bg-red-200 overflow-x-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className={`transition-all duration-300 ${sidebarOpen ? "md:ml-[240px]" : "md:ml-[80px]"} min-h-screen flex flex-col scroll-smooth`}>

        {/* Header */}
        <header className="sticky top-0 z-[60] bg-[#F8FAFC]/80 backdrop-blur-md px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-600"><Menu size={20} /></button>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">{activeTab}</h2>
          </div>

          <div className="flex items-center gap-6 relative">
            <div className="hidden lg:flex items-center bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100 w-80 focus-within:ring-2 focus-within:ring-red-100 transition-all">
              <Search className="w-4 h-4 text-slate-400 mr-3" />
              <input placeholder="Search medical history..." className="bg-transparent outline-none text-sm w-full font-medium" />
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowNotifications(!showNotifications)}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg border transition-all ${showNotifications ? 'bg-red-500 text-white border-red-400 shadow-red-200' : 'bg-white text-slate-600 border-slate-100 shadow-slate-200'}`}
              >
                <Bell size={22} />
                <span className="absolute top-2.5 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </motion.button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div initial={{ opacity: 0, y: 15, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.95 }} className="absolute right-0 mt-4 w-80 bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden z-[70]">
                    <div className="p-5 border-b border-slate-50 flex justify-between items-center"><span className="font-black text-slate-800">Alerts</span><button className="text-xs font-bold text-red-500">Mute all</button></div>
                    <div className="p-2">
                      <div className="p-4 bg-red-50 rounded-2xl flex gap-3 border border-red-100">
                        <Activity className="text-red-500 shrink-0" size={18} />
                        <div><p className="text-sm font-bold text-slate-800">High BPM Detected</p><p className="text-xs text-slate-500">Occurred at 10:45 AM during rest.</p></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* --- ENHANCED INTERACTIVE PROFILE --- */}
            <div className="relative">
              <motion.button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 p-1.5 pr-4 bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 group transition-all"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-inner">E</div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white ring-2 ring-emerald-50"></span>
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-black text-slate-800 uppercase tracking-tighter">Emma J.</p>
                  <p className="text-[10px] font-bold text-slate-400">PATIENT ID: 4022</p>
                </div>
              </motion.button>

              <AnimatePresence>
                {showProfileMenu && (
                  <>
                    <div className="fixed inset-0 z-[-1]" onClick={() => setShowProfileMenu(false)} />
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-4 w-56 bg-white rounded-3xl shadow-2xl border border-slate-100 p-2 z-[70]">
                      <button className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 text-slate-600 transition-colors"><UserCircle size={18} /> <span className="text-sm font-bold">Profile Settings</span></button>
                      <button className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 text-slate-600 transition-colors"><Settings size={18} /> <span className="text-sm font-bold">Preferences</span></button>
                      <div className="h-px bg-slate-50 my-2 mx-3" />
                      <button className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-red-50 text-red-500 transition-colors"><LogOut size={18} /> <span className="text-sm font-bold">Sign Out</span></button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-8 max-w-[1600px] mx-auto w-full">
          <AnimatePresence mode="wait">
            {activeTab === "Overview" ? <OverviewPage bpm={bpm} ecgData={ecgData} isRecording={isRecording} setIsRecording={setIsRecording} hrvData={hrvData} /> : <GenericPage title={activeTab} />}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
