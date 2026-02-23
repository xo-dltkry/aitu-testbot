import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Library, 
  FileUp, 
  Loader2, 
  CheckCircle, 
  X, 
  Search, 
  Bell, 
  User,
  ShieldAlert,
  Clock,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';

// --- Исходные данные ---

const INITIAL_TASKS = [
  { id: 1, name: "Закуп турбинного оборудования", start: 1, duration: 3, status: "Done", progress: 100 },
  { id: 2, name: "Проектирование систем охлаждения", start: 2, duration: 4, status: "Done", progress: 100 },
  { id: 3, name: "Экскавация котлована реактора", start: 5, duration: 4, status: "In Progress", progress: 65 },
  { id: 4, name: "Заливка фундамента Блока 1", start: 8, duration: 3, status: "Pending", progress: 0 },
  { id: 5, name: "Монтаж защитной оболочки", start: 10, duration: 3, status: "Pending", progress: 0 },
];

const INITIAL_DOCS = [
  { id: 1, name: "Tech_Spec_Block1.pdf", version: "1.2", date: "12.08.2025", status: "Утвержден" },
  { id: 2, name: "Reactor_Safety_Guidelines.pdf", version: "3.0", date: "05.09.2025", status: "Утвержден" },
  { id: 3, name: "Contract_Turbine_Supplier_Draft.pdf", version: "0.9", date: "21.10.2025", status: "На ревью" },
];

// --- Вспомогательные компоненты ---

const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    danger: "bg-rose-50 text-rose-700 border-rose-200",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]}`}>
      {children}
    </span>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('roadmap');
  const [documents, setDocuments] = useState(INITIAL_DOCS);
  const [isUploading, setIsUploading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Логика загрузки документа
  const handleUpload = () => {
    setIsUploading(true);
    
    // Имитация задержки обработки и анализа ИИ (2 секунды)
    setTimeout(() => {
      setIsUploading(false);
      
      const newDoc = {
        id: Date.now(),
        name: "План заливки фундамента v2.pdf",
        version: "2.0",
        date: new Date().toLocaleDateString('ru-RU'),
        status: "Требует согласования"
      };
      
      setDocuments([newDoc, ...documents]);
      setShowToast(true);
      
      // Автоматически скрываем уведомление через 6 секунд
      setTimeout(() => setShowToast(false), 6000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* Боковая панель (Sidebar) */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-20">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-inner">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-sm tracking-wide leading-tight text-slate-100">
            Агентство РК по<br/>атомной энергии
          </span>
        </div>

        <div className="px-4 py-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">
            Модули ИСУП
          </p>
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                activeTab === 'roadmap' 
                  ? 'bg-blue-600/20 text-blue-400' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Дорожная Карта
            </button>
            <button
              onClick={() => setActiveTab('knowledge')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                activeTab === 'knowledge' 
                  ? 'bg-blue-600/20 text-blue-400' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Library className="w-5 h-5" />
              База Знаний
            </button>
          </nav>
        </div>
      </aside>

      {/* Основной контент */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Шапка (Header) */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 sticky top-0">
          <div className="flex items-center gap-4 w-96">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Поиск по проектам и документам..." 
                className="w-full pl-9 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md text-sm transition-all outline-none"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative text-slate-500 hover:text-slate-700 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-md transition-colors -m-1.5">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-900 leading-none">CEO</p>
                <p className="text-xs text-slate-500 mt-1">Генеральный директор</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center border border-slate-300 overflow-hidden">
                <User className="w-5 h-5 text-slate-500" />
              </div>
            </div>
          </div>
        </header>

        {/* Рабочая область */}
        <div className="flex-1 overflow-auto p-8">
          
          {/* Представление 1: Дорожная Карта */}
          {activeTab === 'roadmap' && (
            <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Дорожная Карта Проекта</h1>
                  <p className="text-slate-500 mt-1">Строительство АЭС (Блок 1) - План-график выполнения работ</p>
                </div>
                
                {/* KPI Карточка */}
                <div className="bg-white px-5 py-3 rounded-xl border border-emerald-200 shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Predictive KPI</p>
                    <p className="text-lg font-bold text-emerald-600">Отклонение от графика: 0%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                {/* Заголовок Ганта (Месяцы) */}
                <div className="grid grid-cols-12 gap-px bg-slate-100 border-b border-slate-200 pl-64">
                  {['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'].map((month, i) => (
                    <div key={i} className="py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider bg-white">
                      {month}
                    </div>
                  ))}
                </div>

                {/* Строки задач */}
                <div className="divide-y divide-slate-100">
                  {INITIAL_TASKS.map((task) => {
                    const statusColors = {
                      'Done': 'bg-emerald-500',
                      'In Progress': 'bg-blue-500',
                      'Pending': 'bg-slate-300'
                    };
                    const StatusIcon = {
                      'Done': CheckCircle2,
                      'In Progress': Loader2,
                      'Pending': Clock
                    }[task.status];

                    return (
                      <div key={task.id} className="flex group hover:bg-slate-50 transition-colors">
                        {/* Информация о задаче (Левая колонка) */}
                        <div className="w-64 flex-shrink-0 p-4 bg-white border-r border-slate-100 flex flex-col justify-center">
                          <h3 className="text-sm font-semibold text-slate-800 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                            {task.name}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <StatusIcon className={`w-3.5 h-3.5 ${task.status === 'In Progress' ? 'animate-spin text-blue-500' : ''}`} />
                            <span>{task.progress}% завершено</span>
                          </div>
                        </div>

                        {/* Временная шкала (Правая колонка) */}
                        <div className="flex-1 grid grid-cols-12 gap-px bg-slate-50 relative p-2">
                          {/* Линии сетки */}
                          <div className="absolute inset-0 grid grid-cols-12 gap-px pointer-events-none opacity-20">
                            {Array.from({length: 12}).map((_, i) => (
                              <div key={i} className="border-r border-slate-300 h-full"></div>
                            ))}
                          </div>
                          
                          {/* Бар задачи */}
                          <div 
                            style={{ 
                              gridColumn: `${task.start} / span ${task.duration}` 
                            }} 
                            className={`h-8 rounded-md shadow-sm flex items-center px-3 relative z-10 transition-transform hover:-translate-y-0.5 ${statusColors[task.status]}`}
                          >
                            <span className="text-xs font-medium text-white/90 truncate drop-shadow-sm">
                              {task.duration} мес.
                            </span>
                            {task.status === 'In Progress' && (
                              <div className="absolute top-0 left-0 h-full bg-white/20 rounded-l-md" style={{ width: `${task.progress}%` }}></div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Представление 2: База Знаний */}
          {activeTab === 'knowledge' && (
            <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">База Знаний</h1>
                  <p className="text-slate-500 mt-1">Реестр проектной документации и чертежей</p>
                </div>
                
                {/* Кнопка Загрузки с состоянием */}
                <button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-sm
                    ${isUploading 
                      ? 'bg-slate-100 text-slate-500 border border-slate-200 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md border border-transparent active:scale-[0.98]'
                    }
                  `}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-blue-600" /> 
                      Анализ влияния на график...
                    </>
                  ) : (
                    <>
                      <FileUp className="w-4 h-4" /> 
                      Загрузить документ
                    </>
                  )}
                </button>
              </div>

              {/* Таблица Документов */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="px-6 py-4">Название документа</th>
                      <th className="px-6 py-4 w-32">Версия</th>
                      <th className="px-6 py-4 w-40">Дата загрузки</th>
                      <th className="px-6 py-4 w-48 text-right">Статус</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {documents.map((doc, idx) => (
                      <tr 
                        key={doc.id} 
                        className={`hover:bg-slate-50 transition-colors ${idx === 0 && documents.length > 3 ? 'bg-blue-50/50 animate-in fade-in bg-blend-multiply duration-1000' : ''}`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
                              <span className="text-[10px] font-bold">PDF</span>
                            </div>
                            <span className="text-sm font-medium text-slate-900">{doc.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 font-mono">v{doc.version}</td>
                        <td className="px-6 py-4 text-sm text-slate-500">{doc.date}</td>
                        <td className="px-6 py-4 text-right">
                          <Badge 
                            variant={
                              doc.status === 'Утвержден' ? 'success' : 
                              doc.status === 'Требует согласования' ? 'danger' : 'warning'
                            }
                          >
                            {doc.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Уведомление (Toast) */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-8 fade-in duration-300">
          <div className="bg-white border border-slate-200 shadow-xl rounded-xl p-4 w-[380px] flex items-start gap-3 relative overflow-hidden">
            {/* Декоративная полоса */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
            
            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-bold text-slate-900">Успешно</h4>
              <p className="text-sm text-slate-600 mt-1 leading-snug">
                Документ загружен. API Aitu вызван для оповещения руководства.
              </p>
            </div>
            <button 
              onClick={() => setShowToast(false)}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}