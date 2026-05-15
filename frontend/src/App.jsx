import { useState } from "react";
import axios from "axios";

export default function PhishGuardDashboard() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanHistory, setScanHistory] = useState([]);

  const scanURL = async () => {

  if (!url) {
    alert("Please enter a URL");
    return;
  }

  try {

    setLoading(true);

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/predict-url`,
      {
        url: url
      }
    );

    const data = response.data;

    setResult(data);

    const newScan = {
      url: data.url,
      status:
        data.prediction === 1
          ? "Phishing"
          : "Safe",
      confidence:
        `${(data.confidence * 100).toFixed(1)}%`,
      time:
        new Date().toLocaleTimeString()
    };

    setScanHistory((prev) => [
      newScan,
      ...prev
    ]);

  } catch (error) {

    console.error(error);

    alert("Backend connection failed");

  } finally {

    setLoading(false);

  }
};

 return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      {/* Sidebar */}
      <aside className="w-72 bg-[#081226] border-r border-cyan-900/40 p-6 flex flex-col justify-between">
        <div>
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-wide text-cyan-400">
              PhishGuard AI
            </h1>
            <p className="text-slate-400 text-sm mt-2">
              Cyber Threat Intelligence Platform
            </p>
          </div>

          <nav className="space-y-3">
            {[
              "Dashboard",
              "Threat Analysis",
              "Live Scans",
              "Analytics",
              "History",
              "Settings",
            ].map((item) => (
              <div
                key={item}
                className="bg-slate-900/60 hover:bg-cyan-500/10 transition-all border border-slate-800 hover:border-cyan-500 rounded-xl px-4 py-3 cursor-pointer"
              >
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </nav>
        </div>

        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-700 rounded-2xl p-4">
          <h3 className="font-bold text-cyan-300 mb-2">System Status</h3>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-300">
              Threat Engine Active
            </span>
          </div>
        </div>
      </aside>

      {/* Main Dashboard */}
      <main className="flex-1 overflow-y-auto p-8 bg-[radial-gradient(circle_at_top,#0f172a,#020617)]">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl border border-cyan-900/40 bg-gradient-to-r from-cyan-500/10 via-slate-900 to-blue-500/10 p-8 mb-8">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

          <div className="relative z-10 flex items-center justify-between gap-10">
            <div>
              <h2 className="text-5xl font-black leading-tight mb-4">
                AI-Powered
                <br />
                Phishing Detection
              </h2>

              <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
                Advanced machine learning based cybersecurity dashboard for
                identifying malicious URLs, phishing campaigns, and suspicious
                web infrastructure in real-time.
              </p>
            </div>

            <div className="hidden lg:flex items-center justify-center w-72 h-72 rounded-full bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_80px_rgba(34,211,238,0.15)]">
              <div className="w-40 h-40 rounded-full border-4 border-cyan-400 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Threats Detected",
              value: "1,284",
              color: "text-red-400",
            },
            {
              title: "Safe URLs",
              value: "5,921",
              color: "text-green-400",
            },
            {
              title: "Live Scans",
              value: "43",
              color: "text-cyan-400",
            },
            {
              title: "Detection Accuracy",
              value: "97.8%",
              color: "text-yellow-400",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all shadow-xl"
            >
              <p className="text-slate-400 mb-3">{card.title}</p>
              <h3 className={`text-4xl font-black ${card.color}`}>
                {card.value}
              </h3>
            </div>
          ))}
        </div>

        {/* Scanner + Results */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* Scanner */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-3xl font-bold mb-6 text-cyan-400">
              Threat Scanner
            </h3>

            <div className="space-y-5">
              <input
                type="text"
                placeholder="https://suspicious-domain.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full p-5 rounded-2xl bg-[#0f172a] border border-slate-700 outline-none focus:border-cyan-400 text-lg"
              />

              <button
                onClick={scanURL}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-[1.01] transition-all rounded-2xl p-5 font-bold text-lg shadow-lg shadow-cyan-500/20"
              >
                {loading ? "Scanning..." : "Scan URL"}
              </button>
            </div>

            <div className="mt-8 border-t border-slate-800 pt-6">
              <div className="flex justify-between mb-3">
                <span className="text-slate-400">Threat Confidence</span>
                <span className="font-bold text-red-400">
                  {result
                    ? `${(result.confidence * 100).toFixed(1)}%`
                    : "0%"}
                </span>    
              </div>

              <div className="w-full bg-slate-800 h-5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    result?.prediction === 1
                      ? "bg-gradient-to-r from-red-500 to-orange-400"
                      : "bg-gradient-to-r from-green-500 to-emerald-400"
                  }`}
                  style={{
                    width: result
                      ? `${result.confidence * 100}%`
                      : "0%"
                  }}
                ></div>

              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold">Threat Analysis</h3>

              <span className="bg-red-500/20 text-red-400 px-4 py-2 rounded-full font-bold border border-red-500/30">
                {result?.prediction === 1
                  ? "HIGH RISK"
                  : "SAFE"}
              </span>
            </div>

            <div className="space-y-5">
              {
                [
                  
                  [
                    "Suspicious Keywords",
                    result?.features?.sensitive_words_count > 0
                      ? "Detected"
                      : "None"
                  ],

                  [
                    "HTTPS Security",
                    result?.features?.isHttps === 1
                      ? "Enabled"
                      : "Missing"
                  ],

                  [
                    "Domain Reputation",
                    result?.prediction === 1
                      ? "Suspicious"
                      : "Trusted"
                  ],

                  [
                    "URL Complexity",
                    result?.features?.url_length > 50
                      ? "High"
                      : "Normal"
                  ],

                  [
                    "Phishing Score",
                    result
                      ? `${(result.confidence * 100).toFixed(1)}%`
                      : "0%"
                  ]
                ].map(([key,value], index) => (
                
                <div
                  key={key}
                  className="flex justify-between items-center bg-[#0f172a] rounded-2xl p-4 border border-slate-800"
                >
                  <span className="text-slate-300">{key}</span>
                  <span className="font-bold text-cyan-400">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Threats */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-bold">Recent Scan History</h3>
            <button className="bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-xl text-cyan-400 hover:bg-cyan-500/20 transition-all">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-4">URL</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Confidence</th>
                  <th className="pb-4">Timestamp</th>
                </tr>
              </thead>

              <tbody>
                {scanHistory.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-800 hover:bg-slate-800/40 transition-all"
                  >
                    <td className="py-5 text-slate-300">{row.url}</td>
                    <td className="py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${
                          row.status === "Phishing"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-5 font-bold">{row.confidence}</td>
                    <td className="py-5 text-slate-400">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
