import { useState, useRef, useCallback } from 'react';
import { 
  BarChart3, Users, Clock, AlertTriangle, CheckCircle, 
  MessageSquare, Lightbulb, Menu,
  TrendingUp, Smartphone, Gauge
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import './App.css';

const navItems = [
  { id: 'summary', label: '執行摘要', icon: TrendingUp },
  { id: 'basic', label: '基本資訊', icon: Users },
  { id: 'satisfaction', label: '滿意度分析', icon: BarChart3 },
  { id: 'behavior', label: '行為與認知', icon: Smartphone },
  { id: 'problems', label: '系統問題', icon: AlertTriangle },
  { id: 'feedback', label: '用戶意見', icon: MessageSquare },
  { id: 'suggestions', label: '改進建議', icon: Lightbulb },
];

const satisfactionData = [
  { dimension: '介面美觀', score: 4.23, std: 0.64, color: '#4A90A4' },
  { dimension: 'APP易用程度', score: 4.18, std: 0.66, color: '#5BA3B8' },
  { dimension: '運行速度與穩定性', score: 4.13, std: 0.67, color: '#6CB6CC' },
  { dimension: '推送通知及時性', score: 4.15, std: 0.68, color: '#7DC9E0' },
];



const problemsData = [
  { problem: '資訊更新延遲', pct: 21.8, count: 135, severity: 'high' },
  { problem: '定位不準確', pct: 13.9, count: 86, severity: 'medium' },
  { problem: '字體太小或難以閱讀', pct: 12.6, count: 78, severity: 'medium' },
  { problem: '找不到想要的功能', pct: 11.5, count: 71, severity: 'medium' },
];

const infoTypesData = [
  { type: '實時天氣狀況', pct: 84.6, count: 523 },
  { type: '天氣預報', pct: 73.1, count: 452 },
  { type: '惡劣天氣資訊', pct: 65.5, count: 405 },
  { type: '特別天氣提示', pct: 49.4, count: 305 },
  { type: '空氣質量指數', pct: 17.5, count: 108 },
  { type: '天氣雷達/衛星', pct: 17.0, count: 105 },
];

const advantagesData = [
  { advantage: '介面美觀，操作簡單', pct: 69.6, count: 430 },
  { advantage: '警告通知發送迅速', pct: 43.2, count: 267 },
  { advantage: '定位功能', pct: 19.9, count: 123 },
  { advantage: '桌面小工具', pct: 16.3, count: 101 },
  { advantage: '地圖互動功能', pct: 15.7, count: 97 },
];

const crossAnalysisData = {
  age: [
    { group: '18歲以下', score: 4.33 },
    { group: '18-30歲', score: 4.31 },
    { group: '31-50歲', score: 4.14 },
    { group: '51歲以上', score: 4.10 },
  ],
  frequency: [
    { group: '每天多次', score: 4.31, count: 210 },
    { group: '每天一次', score: 4.23, count: 173 },
    { group: '第一次使用', score: 4.08, count: 45 },
    { group: '每週幾次', score: 3.98, count: 66 },
    { group: '偶爾使用', score: 3.98, count: 124 },
  ],
};

const suggestionsData = [
  {
    priority: 'P1',
    title: '優化數據更新機制',
    problem: '21.8%用戶反映資訊更新延遲',
    outcome: '顯著提升數據時效性',
    difficulty: '中',
    color: 'bg-red-100 text-red-800 border-red-300',
  },
  {
    priority: 'P2',
    title: '增加字體大小調整選項',
    problem: '12.6%用戶反映字體難以閱讀',
    outcome: '改善中老年用戶體驗',
    difficulty: '低',
    color: 'bg-orange-100 text-orange-800 border-orange-300',
  },
  {
    priority: 'P3',
    title: '允許用戶自定義默認監測站',
    problem: '13.9%用戶反映定位不準確',
    outcome: '提升本地資訊精準度',
    difficulty: '低',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  },
  {
    priority: 'P4',
    title: '首頁增加未來數小時預報',
    problem: '資訊獲取路徑過長',
    outcome: '縮短操作路徑',
    difficulty: '中',
    color: 'bg-green-100 text-green-800 border-green-300',
  },
];

const ZoomableImage = ({ src, alt }: { src: string; alt: string }) => {
  const [scale, setScale] = useState(1);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setScale(prev => {
      const delta = e.deltaY > 0 ? -0.15 : 0.15;
      return Math.max(0.3, Math.min(6, prev + delta));
    });
  }, []);
  
  const resetZoom = () => setScale(1);
  
  return (
    <div 
      className="overflow-auto flex items-center justify-center" 
      style={{ maxHeight: '75vh' }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="transition-transform duration-150 cursor-zoom-in"
        style={{ 
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          maxWidth: '100%',
          height: 'auto'
        }}
        onWheel={handleWheel}
        onClick={resetZoom}
        title="滾輪縮放｜點擊重置"
      />
    </div>
  );
};

function App() {
  const [activeSection, setActiveSection] = useState('summary');
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
      setMobileOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4A90A4] to-[#6CB6CC] flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800 leading-tight">「澳門天氣」APP</h1>
                <p className="text-xs text-slate-500">用戶意見調查分析報告</p>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? 'bg-[#4A90A4]/10 text-[#4A90A4]'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col gap-2 mt-6">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                        activeSection === item.id
                          ? 'bg-[#4A90A4]/10 text-[#4A90A4] font-medium'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Executive Summary */}
        <section id="summary" className="mb-16">
          <div className="bg-gradient-to-r from-[#4A90A4] to-[#6CB6CC] rounded-2xl p-8 text-white shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6" />
              <h2 className="text-2xl font-bold">執行摘要</h2>
            </div>
            <p className="text-lg leading-relaxed text-white/95 mb-6">
              本次調查共收集 <span className="font-bold text-white">628份</span> 用戶問卷，經篩查後確認 
              <span className="font-bold text-white"> 10份為無效樣本</span>（前後矛盾作答），最終納入分析的有效樣本為 
              <span className="font-bold text-white"> 618份</span>，有效率達 <span className="font-bold text-white">98.4%</span>。
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center">
                <div className="text-3xl font-bold">4.17</div>
                <div className="text-sm text-white/80">總體滿意度 /5</div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center">
                <div className="text-3xl font-bold">62.0%</div>
                <div className="text-sm text-white/80">每日使用用戶</div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center">
                <div className="text-3xl font-bold">52.6%</div>
                <div className="text-sm text-white/80">未遇到問題</div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center">
                <div className="text-3xl font-bold">21.8%</div>
                <div className="text-sm text-white/80">資訊更新延遲</div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  核心優勢
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                    <span><strong>介面美觀易用</strong>（4.22分）：88.9%用戶給予4分或以上</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                    <span><strong>預警及時有效</strong>（4.14分）：43.7%用戶認同此優點</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                    <span><strong>高用戶黏性</strong>：62.0%用戶每日使用APP</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  待改進問題
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                    <span><strong>資訊更新延遲</strong>：21.8%用戶反映，為最突出痛點</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                    <span><strong>定位不準確</strong>：14.7%用戶受影響</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                    <span><strong>字體可讀性</strong>：12.7%用戶反映字體太小</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Basic Info */}
        <section id="basic" className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#4A90A4]/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#4A90A4]" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">基本資訊與數據質量</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">調查概況</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-slate-600">調查期間</span>
                    <span className="font-medium">2026/04/28 - 2026/05/16</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-slate-600">總樣本數</span>
                    <span className="font-medium text-lg">628 份</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-slate-600">無效樣本</span>
                    <span className="font-medium text-red-600">10 份 (1.6%)</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-600 font-medium">有效樣本</span>
                    <span className="font-bold text-lg text-[#4A90A4]">618 份 (98.4%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">無效問卷篩選標準</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-amber-800">
                    <strong>判定標準：</strong>在「是否遇到過以下問題？」複選題中，同時勾選了具體系統問題（如定位不準確、資訊更新延遲等）以及「沒有遇到問題」。
                  </p>
                </div>
                <p className="text-sm text-slate-600 mb-3">
                  此類前後矛盾的作答會干擾系統痛點的量化統計，故判定為無效樣本。共篩除 <strong>10份</strong> 無效問卷，篩除率僅 <strong>1.6%</strong>。社團協助收集的67份問卷全部有效。
                </p>
                <div className="text-xs text-slate-500 space-y-1 border-t pt-2">
                  <div className="flex justify-between"><span>線上公開表單</span><span>561份 → 有效551份 (1.78%無效)</span></div>
                  <div className="flex justify-between"><span>婦聯</span><span>19份 → 有效19份 (0%無效)</span></div>
                  <div className="flex justify-between"><span>民眾建澳聯盟</span><span>19份 → 有效19份 (0%無效)</span></div>
                  <div className="flex justify-between"><span>街總</span><span>16份 → 有效16份 (0%無效)</span></div>
                  <div className="flex justify-between"><span>澳門中華學生聯合總會</span><span>13份 → 有效13份 (0%無效)</span></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5" />
                填寫速度審視
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-800">47分鐘</div>
                  <div className="text-xs text-slate-500">平均間隔</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-800">4分鐘</div>
                  <div className="text-xs text-slate-500">中位數間隔</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">1秒</div>
                  <div className="text-xs text-slate-500">最短間隔</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">24筆</div>
                  <div className="text-xs text-slate-500">間隔 &lt; 10秒</div>
                </div>
                <div className="text-center p-3 bg-amber-50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">63筆</div>
                  <div className="text-xs text-slate-500">間隔 &lt; 30秒</div>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                共 <strong>24筆</strong>（3.9%）提交間隔少於10秒，其中2026年5月6日上午出現密集短間隔提交（7筆），可能反映同一用戶批量填寫或未經細閱題目即快速勾選。這些問卷內容上未達無效標準，但其填寫質量可能較低，分析時應予以留意。
              </p>
            </CardContent>
          </Card>

          {/* User Profile Chart */}
          <Dialog>
            <DialogTrigger asChild>
              <div className="cursor-pointer group">
                <Card className="overflow-hidden transition-shadow group-hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">用戶輪廓分析圖</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <img 
                      src={import.meta.env.BASE_URL + "charts/chart2_user_profile.png"} 
                      alt="用戶輪廓分析" 
                      className="w-full h-auto"
                    />
                    <div className="p-4 text-center text-sm text-slate-500">
                      點擊查看大圖
                    </div>
                  </CardContent>
                </Card>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>用戶輪廓分析</DialogTitle>
              </DialogHeader>
              <ZoomableImage src={import.meta.env.BASE_URL + "charts/chart2_user_profile.png"} alt="用戶輪廓分析" />
            </DialogContent>
          </Dialog>
        </section>

        {/* Satisfaction Analysis */}
        <section id="satisfaction" className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#4A90A4]/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-[#4A90A4]" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">滿意度量化分析</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {satisfactionData.map((item) => (
              <Card key={item.dimension} className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: item.color }} />
                <CardContent className="pt-6">
                  <div className="text-sm text-slate-500 mb-1">{item.dimension}</div>
                  <div className="text-3xl font-bold" style={{ color: item.color }}>{item.score.toFixed(2)}</div>
                  <div className="text-xs text-slate-400 mt-1">±{item.std.toFixed(2)} / 5.00</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer group">
                  <Card className="overflow-hidden transition-shadow group-hover:shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">滿意度平均分數</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <img src={import.meta.env.BASE_URL + "charts/chart1_satisfaction_scores.png"} alt="滿意度分數" className="w-full h-auto" />
                      <div className="p-4 text-center text-sm text-slate-500">點擊查看大圖</div>
                    </CardContent>
                  </Card>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader><DialogTitle>滿意度平均分數</DialogTitle></DialogHeader>
                <ZoomableImage src={import.meta.env.BASE_URL + "charts/chart1_satisfaction_scores.png"} alt="滿意度分數" />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer group">
                  <Card className="overflow-hidden transition-shadow group-hover:shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">交叉分析熱力圖</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <img src={import.meta.env.BASE_URL + "charts/chart5_cross_analysis.png"} alt="交叉分析" className="w-full h-auto" />
                      <div className="p-4 text-center text-sm text-slate-500">點擊查看大圖</div>
                    </CardContent>
                  </Card>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader><DialogTitle>交叉分析熱力圖</DialogTitle></DialogHeader>
                <ZoomableImage src={import.meta.env.BASE_URL + "charts/chart5_cross_analysis.png"} alt="交叉分析" />
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">交叉分析摘要</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-slate-700 mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#4A90A4]" />
                    年齡層 x 滿意度
                  </h4>
                  <div className="space-y-2">
                    {crossAnalysisData.age.map((item) => (
                      <div key={item.group} className="flex items-center gap-3">
                        <span className="text-sm w-20">{item.group}</span>
                        <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#4A90A4] to-[#6CB6CC] rounded-full transition-all"
                            style={{ width: `${(item.score / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold w-12 text-right">{item.score.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-3">
                    年輕用戶滿意度顯著高於中老年用戶，差距達0.21分
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-700 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#4A90A4]" />
                    使用頻率 x 滿意度
                  </h4>
                  <div className="space-y-2">
                    {crossAnalysisData.frequency.map((item) => (
                      <div key={item.group} className="flex items-center gap-3">
                        <span className="text-sm w-24 truncate">{item.group}</span>
                        <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#5BA3B8] to-[#7DC9E0] rounded-full transition-all"
                            style={{ width: `${(item.score / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold w-12 text-right">{item.score.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-3">
                    使用頻率與滿意度呈正相關，高頻用戶滿意度顯著更高
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Behavior & Recognition */}
        <section id="behavior" className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#4A90A4]/10 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-[#4A90A4]" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">用戶行為與認知分析</h2>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <div className="cursor-pointer group mb-6">
                <Card className="overflow-hidden transition-shadow group-hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">最常查看資訊與APP優點</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <img src={import.meta.env.BASE_URL + "charts/chart3_behavior_advantages.png"} alt="行為與認知" className="w-full h-auto" />
                    <div className="p-4 text-center text-sm text-slate-500">點擊查看大圖</div>
                  </CardContent>
                </Card>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-5xl">
              <DialogHeader><DialogTitle>用戶行為與認知分析</DialogTitle></DialogHeader>
              <ZoomableImage src={import.meta.env.BASE_URL + "charts/chart3_behavior_advantages.png"} alt="行為與認知" />
            </DialogContent>
          </Dialog>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-[#4A90A4]" />
                  資訊查看偏好
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {infoTypesData.map((item) => (
                    <div key={item.type} className="flex items-center gap-3">
                      <span className="text-sm w-32 truncate">{item.type}</span>
                      <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#4A90A4] to-[#6CB6CC] rounded-full"
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-16 text-right">{item.pct}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  APP認知優點
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {advantagesData.map((item) => (
                    <div key={item.advantage} className="flex items-center gap-3">
                      <span className="text-sm w-32 truncate">{item.advantage}</span>
                      <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-16 text-right">{item.pct}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Problems */}
        <section id="problems" className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">系統問題識別</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer group">
                  <Card className="overflow-hidden transition-shadow group-hover:shadow-lg">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">問題回報與資訊渠道</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <img src={import.meta.env.BASE_URL + "charts/chart4_problems_channels.png"} alt="問題與渠道" className="w-full h-auto" />
                      <div className="p-4 text-center text-sm text-slate-500">點擊查看大圖</div>
                    </CardContent>
                  </Card>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-5xl">
                <DialogHeader><DialogTitle>問題回報與資訊渠道</DialogTitle></DialogHeader>
                <ZoomableImage src={import.meta.env.BASE_URL + "charts/chart4_problems_channels.png"} alt="問題與渠道" />
              </DialogContent>
            </Dialog>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">問題嚴重程度評估</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {problemsData.map((item) => (
                    <div key={item.problem} className="relative">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{item.problem}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant={item.severity === 'high' ? 'destructive' : 'secondary'}>
                            {item.severity === 'high' ? '高' : '中'}
                          </Badge>
                          <span className="text-sm font-bold">{item.pct}%</span>
                        </div>
                      </div>
                      <div className="h-6 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            item.severity === 'high' 
                              ? 'bg-gradient-to-r from-red-500 to-red-400' 
                              : 'bg-gradient-to-r from-amber-500 to-amber-400'
                          }`}
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                      <div className="text-xs text-slate-400 mt-1">{item.count} 人回報</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">表現優秀的領域</span>
                  </div>
                  <p className="text-sm text-green-700">
                    「閃退或卡頓」及「推送通知不及時或過多」兩項問題回報率為 <strong>0%</strong>，
                    顯示APP在核心穩定性及推送機制方面表現優秀。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* User Feedback */}
        <section id="feedback" className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">用戶意見整合</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">意見主題分類</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { theme: '預報資訊強化', count: 15, desc: '增加更精細、更長時效的預報內容', color: 'bg-blue-50 border-blue-200' },
                    { theme: '界面與可讀性', count: 14, desc: '改善字體大小、排版及無障礙設計', color: 'bg-green-50 border-green-200' },
                    { theme: '定位與站點', count: 12, desc: '提升定位精準度，增加監測站點', color: 'bg-amber-50 border-amber-200' },
                    { theme: '桌面小工具', count: 10, desc: '擴展小工具功能及適配性', color: 'bg-purple-50 border-purple-200' },
                    { theme: '氣象教育科普', count: 8, desc: '增加氣象知識傳播與教育功能', color: 'bg-pink-50 border-pink-200' },
                    { theme: '地圖與互動', count: 7, desc: '增強地圖功能與互動體驗', color: 'bg-cyan-50 border-cyan-200' },
                  ].map((item) => (
                    <div key={item.theme} className={`p-4 rounded-lg border ${item.color}`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-sm">{item.theme}</span>
                        <Badge variant="outline">{item.count} 條</Badge>
                      </div>
                      <p className="text-xs text-slate-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>


          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">值得關注的具體建議</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    id: 's1',
                    title: '熱帶氣旋資訊一體化展示',
                    content: '用戶建議在熱帶氣旋圖標中整合交互式彈出視窗（Popup），直接顯示氣旋名稱、強度、位置及移動路徑等關鍵資訊，實現「資訊與地圖一體化」。此建議針對性強，可顯著提升惡劣天氣期間的資訊獲取效率。',
                  },
                  {
                    id: 's2',
                    title: '自定義監測站功能',
                    content: '針對定位不準的問題，用戶建議加入「讓使用者選擇固定顯示哪個數據監測站的數據」的功能，既可解決定位偏差問題，又能滿足用戶的個性化需求。',
                  },
                  {
                    id: 's3',
                    title: '未來數小時天氣預報首頁化',
                    content: '多位用戶反映目前查看未來數小時天氣預報的操作路徑不便（需點入預報→再點入自動每小時天氣預報），建議將此資訊直接展示於首頁，縮短資訊獲取路徑。',
                  },
                  {
                    id: 's4',
                    title: '氣象教育功能拓展',
                    content: '用戶建議增加互動小遊戲、翌日天氣預測短片、長者版或無障礙版本（含手語天氣預測短片）等功能，這不僅能擴大APP的服務對象（如兒童、長者、聽障人士），亦能提升市民的氣象科學素養。',
                  },
                  {
                    id: 's5',
                    title: '桌面小工具優化',
                    content: '用戶反映桌面小工具存在字體過小、未充分利用空間、未能適配小屏幕等問題，建議進行針對性優化，並擴展顯示內容（如增加時間顯示）。',
                  },
                ].map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger className="text-left text-sm font-medium">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-slate-600">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Suggestions */}
        <section id="suggestions" className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">改進建議</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {suggestionsData.map((item) => (
              <Card key={item.priority} className={`border-l-4 ${item.color.split(' ')[2]}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge className={item.color}>{item.priority}</Badge>
                    <span className="text-xs text-slate-400">難度: {item.difficulty}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-slate-600">{item.problem}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-slate-600">{item.outcome}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-br from-[#4A90A4] to-[#6CB6CC] text-white max-w-2xl mx-auto">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-white">報告摘要</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/90 leading-relaxed">
                全新「澳門天氣」APP整體表現良好，總體滿意度 <strong>4.17/5</strong>。
                建議優先處理 <strong>資訊更新延遲</strong>、<strong>定位精準度</strong> 及 
                <strong>字體可讀性</strong> 三大問題，同時積極考慮用戶提出的未來功能建議，
                持續提升服務質素。
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="border-t pt-8 pb-12 text-center">
          <p className="text-sm text-slate-500">
            「澳門天氣」流動應用程式用戶意見調查分析報告
          </p>
          <p className="text-xs text-slate-400 mt-1">
            數據收集期間：2026年4月28日至5月16日 | 有效樣本：618份
          </p>
          <p className="text-xs text-slate-400 mt-1">
            澳門地球物理氣象局 | 內部工作會議用
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
