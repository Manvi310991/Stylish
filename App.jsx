import React, { useState, useRef, useEffect } from "react";
import { Heart, User, Calendar, Sparkles, ChevronRight, Upload, ShoppingBag, ArrowLeft, Check, TrendingUp, RefreshCw } from "lucide-react";

// ─── DARK PINK THEME ──────────────────────────────────────────────────────────
const T = {
  bg: "#0A0608",
  surface: "#110910",
  card: "#160C14",
  border: "#2A1525",
  borderHi: "#3D1E38",
  text: "#F5EAF0",
  muted: "#7A5570",
  dim: "#3D2238",
  accent: "#E8417A",
  accentL: "#F5A0C0",
  accentD: "#B02D5A",
  accentSoft: "#FF6B9D",
  rose: "#FF3366",
  green: "#4ECBA0",
  glow: "rgba(232,65,122,0.15)",
  glowStrong: "rgba(232,65,122,0.25)",
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const COMMUNITY = [
  { id:1, user:"Priya S.", city:"Delhi", init:"PS", outfit:"Pastel Linen Co-ord", occasion:"Casual", likes:347, hue:"320,60%,38%" },
  { id:2, user:"Aryan K.", city:"Mumbai", init:"AK", outfit:"Navy Blazer Look", occasion:"Formal", likes:289, hue:"290,45%,35%" },
  { id:3, user:"Sneha R.", city:"Hyderabad", init:"SR", outfit:"Mirror Work Lehenga", occasion:"Ethnic", likes:521, hue:"340,65%,38%" },
  { id:4, user:"Kabir M.", city:"Jaipur", init:"KM", outfit:"Ivory Bandhgala", occasion:"Ethnic", likes:198, hue:"310,40%,40%" },
  { id:5, user:"Isha P.", city:"Ahmedabad", init:"IP", outfit:"Sequin Jumpsuit", occasion:"Party", likes:412, hue:"330,55%,38%" },
  { id:6, user:"Rohan D.", city:"Kolkata", init:"RD", outfit:"Earth Streetwear", occasion:"Casual", likes:167, hue:"300,30%,35%" },
  { id:7, user:"Meera T.", city:"Chennai", init:"MT", outfit:"Kanjeevaram Saree", occasion:"Ethnic", likes:389, hue:"350,55%,38%" },
  { id:8, user:"Vikram S.", city:"Bengaluru", init:"VS", outfit:"Smart Casual Denim", occasion:"Casual", likes:234, hue:"315,40%,36%" },
];

const TRENDING = [
  { id:1, name:"Mirror Work Lehenga", sold:"3.2k", rise:"+41%", range:"₹8,999 – ₹24,999" },
  { id:2, name:"Linen Co-ord Set", sold:"2.8k", rise:"+38%", range:"₹2,499 – ₹5,999" },
  { id:3, name:"Crop Blazer Set", sold:"2.1k", rise:"+29%", range:"₹3,499 – ₹7,999" },
  { id:4, name:"Anarkali Suit", sold:"1.9k", rise:"+25%", range:"₹1,999 – ₹8,999" },
  { id:5, name:"Oversized Kurta", sold:"1.7k", rise:"+22%", range:"₹999 – ₹3,499" },
  { id:6, name:"Sequin Mini Dress", sold:"1.5k", rise:"+19%", range:"₹2,999 – ₹9,999" },
];

const PLATFORMS = [
  { name:"Myntra", color:"#FF3E6C", base:0 },
  { name:"Ajio", color:"#F26522", base:280 },
  { name:"Nykaa Fashion", color:"#FC2779", base:490 },
  { name:"Amazon Fashion", color:"#FF9900", base:720 },
  { name:"Meesho", color:"#A855F7", base:950 },
  { name:"Flipkart Fashion", color:"#2874F0", base:1150 },
];

const OCCASIONS = [
  { id:"casual", label:"Casual", desc:"Everyday comfortable wear", icon:"☀️" },
  { id:"ethnic", label:"Ethnic / Festive", desc:"Traditional & fusion Indian wear", icon:"🪷" },
  { id:"formal", label:"Formal / Office", desc:"Professional & business attire", icon:"💼" },
  { id:"party", label:"Party / Night Out", desc:"Bold, glam event looks", icon:"✨" },
  { id:"streetwear", label:"Streetwear", desc:"Urban & trendy street style", icon:"🔥" },
];

const BODY_TYPES = ["Hourglass","Pear","Apple","Rectangle","Inverted Triangle","Athletic"];
const SKIN_TONES = ["Fair","Wheatish","Medium Brown","Dark Brown","Deep"];
const GENDERS = ["Female","Male","Non-binary"];
const DAYS_S = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const DAYS_L = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const ACTIVITIES = ["Office/Work","Casual Day Out","Party/Event","Gym/Sports","Date Night","Travel","Work From Home","College","Wedding/Festival","Rest Day"];

const FALLBACK_OUTFITS = [
  { name:"Floral Midi Dress", pieces:["Floral printed midi dress","Block heel sandals","Woven tote bag"], colors:["Coral","White"], tip:"Tuck in slightly at waist for definition", priceMin:2499, priceMax:5999, tags:["feminine","summer"] },
  { name:"Linen Co-ord Set", pieces:["Linen crop top","Wide-leg linen trousers","Leather sandals"], colors:["Sage Green","Cream"], tip:"Gold hoops elevate this instantly", priceMin:2999, priceMax:6499, tags:["minimal","breezy"] },
  { name:"Denim Kurta Fusion", pieces:["Embroidered short kurta","Straight-fit jeans","Kolhapuri chappals"], colors:["Indigo","Powder Blue"], tip:"Best for daytime outings", priceMin:1499, priceMax:3999, tags:["fusion","casual"] },
  { name:"Wrap Dress Moment", pieces:["Printed wrap dress","Block heel mules","Wicker clutch"], colors:["Rust","Terracotta"], tip:"V-neck elongates the neckline beautifully", priceMin:1999, priceMax:4999, tags:["elegant","versatile"] },
  { name:"Blazer Statement", pieces:["Oversized structured blazer","Cropped white tee","Tailored trousers"], colors:["Camel","White"], tip:"Roll sleeves for a relaxed vibe", priceMin:3499, priceMax:8999, tags:["smart","modern"] },
  { name:"Palazzo Bandhani Set", pieces:["Bandhani print top","Palazzo pants","Kolhapuri flats"], colors:["Magenta","Gold"], tip:"Add a potli bag to complete the look", priceMin:1799, priceMax:4499, tags:["ethnic","colorful"] },
];

const OUTFIT_EMOJIS = ["🌸","👗","✨","🪷","🎽","👘","💃","🌺"];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const getPrices = (baseMin) => {
  const seed = baseMin || 2000;
  return PLATFORMS.map(p => ({
    ...p,
    price: seed + p.base + Math.floor(Math.random() * 80),
    inStock: Math.random() > 0.18,
  })).sort((a, b) => a.price - b.price);
};

const callClaude = async (prompt) => {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  const txt = data.content[0].text.replace(/```json|```/g, "").trim();
  return JSON.parse(txt);
};

// ─── STYLE HELPERS ────────────────────────────────────────────────────────────
const sans = "'DM Sans', sans-serif";
const serif = "'Playfair Display', Georgia, serif";

const inp = {
  background: T.surface, border: `1px solid ${T.border}`,
  borderRadius: "12px", padding: "0.75rem 1rem",
  color: T.text, fontFamily: sans, fontSize: "0.9rem",
  outline: "none", width: "100%", boxSizing: "border-box",
  transition: "border-color 0.2s",
};
const sel = { ...inp, cursor: "pointer" };

const pinkBtn = (disabled) => ({
  background: disabled ? T.dim : `linear-gradient(135deg, ${T.accent}, ${T.accentD})`,
  color: disabled ? T.muted : "#fff",
  border: "none", borderRadius: "100px", padding: "0.85rem 2.25rem",
  fontFamily: sans, fontSize: "0.92rem", fontWeight: 600,
  cursor: disabled ? "not-allowed" : "pointer",
  display: "inline-flex", alignItems: "center", gap: "8px",
  boxShadow: disabled ? "none" : `0 4px 20px ${T.glowStrong}`,
  transition: "all 0.2s",
});

const ghostBtn = {
  background: "transparent", color: T.muted,
  border: `1px solid ${T.border}`, borderRadius: "10px",
  padding: "0.55rem 1.1rem", fontFamily: sans,
  fontSize: "0.82rem", cursor: "pointer",
  display: "inline-flex", alignItems: "center", gap: "6px",
  transition: "all 0.15s",
};

const labelSt = {
  display: "block", fontSize: "0.7rem", color: T.muted,
  marginBottom: "6px", letterSpacing: "0.08em", textTransform: "uppercase",
  fontFamily: sans,
};

const wrap = { maxWidth: "1140px", margin: "0 auto", padding: "0 2rem" };

const pinkTag = {
  background: `${T.accent}18`, color: T.accentSoft,
  padding: "4px 12px", borderRadius: "100px", fontSize: "0.72rem",
  border: `1px solid ${T.accent}30`, fontFamily: sans,
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function StyleAI() {
  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap";
    document.head.appendChild(l);
  }, []);

  const [page, setPage] = useState("home");
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({ name:"", gender:"Female", height:"", weight:"", bodyType:"", skinTone:"", age:"" });
  const [photo, setPhoto] = useState(null);
  const [occasion, setOccasion] = useState("");
  const [outfits, setOutfits] = useState([]);
  const [selOutfit, setSelOutfit] = useState(null);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [routine, setRoutine] = useState(Object.fromEntries(DAYS_S.map(d => [d, "Office/Work"])));
  const [routineRes, setRoutineRes] = useState(null);
  const [routineLoad, setRoutineLoad] = useState(false);
  const [communityLikes, setCommunityLikes] = useState(Object.fromEntries(COMMUNITY.map(c => [c.id, c.likes])));
  const [userLiked, setUserLiked] = useState({});
  const [quizFilter, setQuizFilter] = useState("All");
  const fileRef = useRef(null);

  const P = (k, v) => setProfile(p => ({ ...p, [k]: v }));
  const handlePhoto = (e) => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = ev => setPhoto(ev.target.result);
    r.readAsDataURL(f);
  };

  const fetchOutfits = async () => {
    setLoading(true);
    try {
      const data = await callClaude(
        `You are a premium Indian fashion stylist. Generate exactly 6 outfit recommendations.
User: ${profile.gender}, age ${profile.age||25}, height ${profile.height||165}cm, weight ${profile.weight||60}kg, body type ${profile.bodyType||"average"}, skin tone ${profile.skinTone||"medium"}, occasion: ${occasion}.
Return ONLY a JSON array (no markdown, no preamble):
[{"name":"outfit name","pieces":["piece1","piece2","piece3"],"colors":["color1","color2"],"tip":"styling tip max 12 words","priceMin":1499,"priceMax":5999,"tags":["tag1","tag2"]}]`
      );
      setOutfits(Array.isArray(data) ? data : FALLBACK_OUTFITS);
    } catch { setOutfits(FALLBACK_OUTFITS); }
    setLoading(false); setStep(3);
  };

  const fetchRoutine = async () => {
    setRoutineLoad(true);
    try {
      const sched = DAYS_L.map((d, i) => `${d}: ${routine[DAYS_S[i]]}`).join("; ");
      const data = await callClaude(
        `Indian fashion stylist. 7-day outfit plan for ${profile.gender||"Female"}, ${profile.bodyType||"average"} build.
Schedule: ${sched}
Return ONLY JSON array:
[{"day":"Monday","activity":"Office","outfit":"name","pieces":["item1","item2","item3"],"palette":["color1","color2"],"tip":"brief tip"}]`
      );
      setRoutineRes(Array.isArray(data) ? data : null);
    } catch {
      setRoutineRes(DAYS_L.map((day, i) => ({
        day, activity: routine[DAYS_S[i]],
        outfit: ["Smart Casuals","Office Formals","Relaxed Friday","Street Casual","Date Night","Weekend Glam","Sunday Ease"][i],
        pieces: ["Top", "Bottom", "Footwear"], palette: ["Pink Tones"], tip: "Keep it expressive",
      })));
    }
    setRoutineLoad(false);
  };

  const toggleLike = (id) => {
    const liked = userLiked[id];
    setUserLiked(p => ({ ...p, [id]: !liked }));
    setCommunityLikes(p => ({ ...p, [id]: liked ? p[id]-1 : p[id]+1 }));
  };

  const openCompare = (outfit) => {
    setSelOutfit(outfit); setPrices(getPrices(outfit.priceMin)); setStep(4);
  };

  // ─── NAV ───────────────────────────────────────────────────────────────────
  const NAV = (
    <nav style={{
      position:"sticky", top:0, zIndex:999,
      background:"rgba(10,6,8,0.92)", backdropFilter:"blur(24px)",
      borderBottom:`1px solid ${T.border}`,
      display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"0 2rem", height:"64px",
    }}>
      <div onClick={() => { setPage("home"); setStep(1); }} style={{
        fontFamily:serif, fontSize:"1.6rem", fontWeight:700,
        background:`linear-gradient(135deg, ${T.accentSoft}, ${T.accent})`,
        WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
        cursor:"pointer", letterSpacing:"0.02em",
      }}>StyleAI</div>

      <div style={{ display:"flex", gap:"4px", background:T.surface, borderRadius:"100px", padding:"4px", border:`1px solid ${T.border}` }}>
        {[["home","Home"],["routine","7 Day Routine"],["quiz","Style Quiz"],["profile","Profile"]].map(([id,label]) => (
          <button key={id} onClick={() => setPage(id)} style={{
            padding:"0.42rem 1.1rem", borderRadius:"100px",
            background: page===id ? `linear-gradient(135deg, ${T.accent}, ${T.accentD})` : "transparent",
            color: page===id ? "#fff" : T.muted,
            border:"none", cursor:"pointer", fontSize:"0.83rem", fontFamily:sans,
            fontWeight: page===id ? 600 : 400, transition:"all 0.15s",
            boxShadow: page===id ? `0 2px 12px ${T.glow}` : "none",
          }}>{label}</button>
        ))}
      </div>

      <div style={{ width:"80px" }} />
    </nav>
  );

  // ─── DECORATIVE BG ORBS ────────────────────────────────────────────────────
  const ORBS = (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"-15%", left:"-10%", width:"500px", height:"500px", borderRadius:"50%", background:`radial-gradient(circle, ${T.glowStrong} 0%, transparent 65%)` }} />
      <div style={{ position:"absolute", bottom:"-10%", right:"-5%", width:"400px", height:"400px", borderRadius:"50%", background:`radial-gradient(circle, rgba(232,65,122,0.1) 0%, transparent 65%)` }} />
    </div>
  );

  // ─── HOME ──────────────────────────────────────────────────────────────────
  const HOME = (
    <div style={{ position:"relative", zIndex:1 }}>

      {/* STEP 4: PRICE COMPARE */}
      {step===4 && selOutfit && (
        <div style={wrap}>
          <div style={{ padding:"3rem 0" }}>
            <button onClick={() => setStep(3)} style={ghostBtn}><ArrowLeft size={13}/> Back to outfits</button>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2.5rem", marginTop:"2rem" }}>
              <div>
                <div style={{ background:T.card, borderRadius:"20px", border:`1px solid ${T.border}`, padding:"2rem", marginBottom:"1.25rem" }}>
                  <div style={{ fontSize:"0.68rem", color:T.muted, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:"0.75rem", fontFamily:sans }}>Selected Look</div>
                  <div style={{ fontFamily:serif, fontSize:"2.2rem", fontWeight:700, color:T.accentL, lineHeight:1.2, marginBottom:"1rem" }}>{selOutfit.name}</div>
                  <div style={{ display:"flex", gap:"7px", flexWrap:"wrap", marginBottom:"1.5rem" }}>
                    {selOutfit.colors?.map(c => <span key={c} style={pinkTag}>{c}</span>)}
                    {selOutfit.tags?.map(t => <span key={t} style={{ ...pinkTag, background:T.surface, color:T.muted, border:`1px solid ${T.border}` }}>{t}</span>)}
                  </div>
                  <div style={{ borderTop:`1px solid ${T.border}`, paddingTop:"1.25rem" }}>
                    <div style={{ fontSize:"0.68rem", color:T.muted, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.75rem", fontFamily:sans }}>Outfit Pieces</div>
                    {selOutfit.pieces?.map((p,i) => (
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px", padding:"0.55rem 0", borderBottom: i<selOutfit.pieces.length-1 ? `1px solid ${T.border}` : "none" }}>
                        <div style={{ width:"20px", height:"20px", borderRadius:"50%", background:`${T.accent}20`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          <Check size={11} color={T.accent}/>
                        </div>
                        <span style={{ fontSize:"0.88rem", fontFamily:sans }}>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background:`${T.accent}0C`, borderRadius:"16px", border:`1px solid ${T.accent}25`, padding:"1.1rem 1.25rem" }}>
                  <div style={{ fontSize:"0.68rem", color:T.accentSoft, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.5rem", fontFamily:sans }}>✦ Stylist Tip</div>
                  <div style={{ fontSize:"0.9rem", color:T.accentL, fontStyle:"italic", fontFamily:serif }}>{selOutfit.tip}</div>
                </div>
              </div>
              <div>
                <div style={{ fontFamily:serif, fontSize:"2rem", fontWeight:700, marginBottom:"0.4rem" }}>Best Prices</div>
                <div style={{ fontSize:"0.85rem", color:T.muted, marginBottom:"2rem", fontFamily:sans }}>Compared across India's top fashion platforms</div>
                {prices.map((pl,i) => (
                  <div key={pl.name} style={{
                    background: i===0 && pl.inStock ? `${pl.color}08` : T.card,
                    border:`1px solid ${i===0 && pl.inStock ? pl.color+"35" : T.border}`,
                    borderRadius:"14px", padding:"1rem 1.25rem", marginBottom:"0.7rem",
                    display:"flex", alignItems:"center", justifyContent:"space-between",
                    opacity: pl.inStock ? 1 : 0.4,
                  }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                      <div style={{ width:"10px", height:"10px", borderRadius:"50%", background:pl.color, flexShrink:0, boxShadow:`0 0 6px ${pl.color}60` }}/>
                      <div>
                        <div style={{ fontWeight:500, fontSize:"0.88rem", fontFamily:sans }}>{pl.name}</div>
                        <div style={{ fontSize:"0.72rem", color:T.muted, fontFamily:sans }}>{pl.inStock ? "In Stock" : "Out of Stock"}</div>
                      </div>
                      {i===0 && pl.inStock && <span style={{ background:`${pl.color}18`, color:pl.color, padding:"2px 10px", borderRadius:"100px", fontSize:"0.65rem", fontWeight:700, fontFamily:sans }}>BEST PRICE</span>}
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
                      <div style={{ fontFamily:serif, fontSize:"1.4rem", fontWeight:700, color: i===0&&pl.inStock ? T.accentL : T.text }}>₹{pl.price.toLocaleString()}</div>
                      {pl.inStock && <button style={{ background: i===0 ? `linear-gradient(135deg,${T.accent},${T.accentD})` : "transparent", color: i===0 ? "#fff" : T.muted, border:`1px solid ${i===0 ? "transparent" : T.border}`, borderRadius:"8px", padding:"6px 14px", fontSize:"0.78rem", cursor:"pointer", fontFamily:sans, boxShadow: i===0 ? `0 3px 12px ${T.glow}` : "none" }}>Shop ↗</button>}
                    </div>
                  </div>
                ))}
                <div style={{ marginTop:"1rem", padding:"0.9rem 1rem", background:T.surface, borderRadius:"12px", border:`1px solid ${T.border}`, fontSize:"0.78rem", color:T.muted, fontFamily:sans }}>
                  ✦ Always verify price on platform before purchase.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: OUTFIT GRID */}
      {step===3 && (
        <div style={wrap}>
          <div style={{ padding:"3rem 0" }}>
            <button onClick={() => setStep(2)} style={ghostBtn}><ArrowLeft size={13}/> Back</button>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", margin:"2rem 0" }}>
              <div>
                <div style={{ fontSize:"0.68rem", color:T.accentSoft, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"0.6rem", fontFamily:sans }}>
                  {OCCASIONS.find(o => o.id===occasion)?.icon} {OCCASIONS.find(o => o.id===occasion)?.label}
                </div>
                <h2 style={{ fontFamily:serif, fontSize:"2.8rem", fontWeight:700, margin:0 }}>
                  {profile.name ? `${profile.name}'s` : "Your"} <em style={{ color:T.accentSoft }}>Curated Looks</em>
                </h2>
              </div>
              <div style={{ fontSize:"0.82rem", color:T.muted, fontFamily:sans }}>{outfits.length} looks · click to compare prices</div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"1.5rem" }}>
              {outfits.map((outfit,i) => (
                <div key={i} onClick={() => openCompare(outfit)} style={{
                  background:T.card, borderRadius:"20px", border:`1px solid ${T.border}`,
                  overflow:"hidden", cursor:"pointer", transition:"all 0.2s",
                }}>
                  <div style={{
                    height:"200px", background:`linear-gradient(135deg, ${T.surface}, ${T.bg})`,
                    display:"flex", flexDirection:"column", alignItems:"center",
                    justifyContent:"center", gap:"0.75rem",
                    position:"relative", borderBottom:`1px solid ${T.border}`,
                  }}>
                    <div style={{ fontSize:"3.8rem", filter:"drop-shadow(0 4px 12px rgba(232,65,122,0.3))" }}>{OUTFIT_EMOJIS[i%OUTFIT_EMOJIS.length]}</div>
                    <div style={{ display:"flex", gap:"6px" }}>
                      {outfit.colors?.slice(0,2).map(c => <span key={c} style={pinkTag}>{c}</span>)}
                    </div>
                    <div style={{ position:"absolute", top:"12px", right:"12px", background:`${T.accent}18`, borderRadius:"8px", padding:"4px 10px", fontSize:"0.7rem", color:T.accentSoft, border:`1px solid ${T.accent}30`, fontFamily:sans }}>
                      ₹{outfit.priceMin?.toLocaleString()} – ₹{outfit.priceMax?.toLocaleString()}
                    </div>
                    <div style={{ position:"absolute", inset:0, background:`radial-gradient(circle at 50% 50%, ${T.glow} 0%, transparent 65%)`, pointerEvents:"none" }}/>
                  </div>
                  <div style={{ padding:"1.25rem" }}>
                    <div style={{ fontFamily:serif, fontSize:"1.2rem", fontWeight:600, marginBottom:"0.75rem" }}>{outfit.name}</div>
                    {outfit.pieces?.slice(0,3).map((p,j) => (
                      <div key={j} style={{ display:"flex", gap:"8px", alignItems:"center", fontSize:"0.8rem", color:T.muted, marginBottom:"4px", fontFamily:sans }}>
                        <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:T.accent, flexShrink:0 }}/>
                        {p}
                      </div>
                    ))}
                    <div style={{ marginTop:"1rem", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div style={{ display:"flex", gap:"5px" }}>
                        {outfit.tags?.slice(0,2).map(t => <span key={t} style={{ background:T.surface, color:T.dim, padding:"2px 8px", borderRadius:"100px", fontSize:"0.68rem", fontFamily:sans }}>{t}</span>)}
                      </div>
                      <span style={{ fontSize:"0.75rem", color:T.accentSoft, display:"flex", alignItems:"center", gap:"4px", fontFamily:sans }}>
                        <ShoppingBag size={12}/> Compare
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: OCCASION */}
      {step===2 && (
        <div style={{ maxWidth:"700px", margin:"0 auto", padding:"4rem 2rem" }}>
          <button onClick={() => setStep(1)} style={ghostBtn}><ArrowLeft size={13}/> Back</button>
          <div style={{ fontFamily:serif, fontSize:"2.8rem", fontWeight:700, margin:"1.5rem 0 0.5rem" }}>
            What's the <em style={{ color:T.accentSoft }}>occasion?</em>
          </div>
          <div style={{ color:T.muted, marginBottom:"2.5rem", fontSize:"0.92rem", fontFamily:sans }}>
            We'll curate looks perfect for your body type, skin tone & vibe
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginBottom:"2.5rem" }}>
            {OCCASIONS.map(occ => (
              <div key={occ.id} onClick={() => setOccasion(occ.id)} style={{
                background: occasion===occ.id ? `${T.accent}12` : T.card,
                border:`1.5px solid ${occasion===occ.id ? T.accent : T.border}`,
                borderRadius:"16px", padding:"1.25rem 1.5rem", cursor:"pointer",
                transition:"all 0.15s",
                boxShadow: occasion===occ.id ? `0 4px 20px ${T.glow}` : "none",
              }}>
                <div style={{ fontSize:"1.6rem", marginBottom:"0.5rem" }}>{occ.icon}</div>
                <div style={{ fontWeight:600, fontSize:"0.95rem", marginBottom:"4px", color: occasion===occ.id ? T.accentL : T.text, fontFamily:sans }}>{occ.label}</div>
                <div style={{ fontSize:"0.8rem", color:T.muted, fontFamily:sans }}>{occ.desc}</div>
              </div>
            ))}
          </div>
          <button onClick={fetchOutfits} disabled={!occasion||loading} style={pinkBtn(!occasion||loading)}>
            {loading ? <><RefreshCw size={15}/> Curating your looks...</> : <><Sparkles size={15}/> Generate My Outfits</>}
          </button>
        </div>
      )}

      {/* STEP 1: FORM + TRENDING + COMMUNITY */}
      {step===1 && (
        <>
          {/* HERO */}
          <div style={{ textAlign:"center", padding:"6rem 2rem 5rem", borderBottom:`1px solid ${T.border}`, position:"relative" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:`${T.accent}12`, border:`1px solid ${T.accent}28`, borderRadius:"100px", padding:"5px 18px", fontSize:"0.7rem", letterSpacing:"0.15em", color:T.accentSoft, textTransform:"uppercase", marginBottom:"2rem", fontFamily:sans }}>
              <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:T.accent, display:"inline-block" }}/>
              AI-Powered Fashion Advisor
            </div>
            <h1 style={{ fontFamily:serif, fontSize:"clamp(3rem,6vw,5.8rem)", fontWeight:700, lineHeight:1.05, margin:"0 0 1.5rem", color:T.text }}>
              Dress for<br/><em style={{ background:`linear-gradient(135deg,${T.accentSoft},${T.accent})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>your story</em>
            </h1>
            <p style={{ color:T.muted, fontSize:"1rem", maxWidth:"460px", margin:"0 auto 3rem", lineHeight:1.8, fontFamily:sans }}>
              Tell us who you are. Our AI curates outfits for you — then finds the best prices across India.
            </p>
            <div style={{ display:"inline-flex", gap:"6px", alignItems:"center", background:T.card, border:`1px solid ${T.border}`, borderRadius:"100px", padding:"8px 18px" }}>
              {["Your Details","Pick Occasion","Your Outfits"].map((s,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                  <div style={{ width:"24px", height:"24px", borderRadius:"50%", background: step>i+1||step===i+1 ? `linear-gradient(135deg,${T.accent},${T.accentD})` : T.dim, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.65rem", fontWeight:700, color: step>=i+1 ? "#fff" : T.muted, flexShrink:0, boxShadow: step===i+1 ? `0 0 12px ${T.glow}` : "none" }}>
                    {step>i+1 ? "✓" : i+1}
                  </div>
                  <span style={{ fontSize:"0.77rem", color: step===i+1 ? T.text : T.muted, whiteSpace:"nowrap", fontFamily:sans }}>{s}</span>
                  {i<2 && <ChevronRight size={12} color={T.dim}/>}
                </div>
              ))}
            </div>
          </div>

          {/* FORM */}
          <div style={wrap}>
            <div style={{ maxWidth:"640px", margin:"0 auto", padding:"3.5rem 0" }}>
              <div style={{ background:T.card, borderRadius:"28px", border:`1px solid ${T.border}`, padding:"2.5rem", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"200px", height:"200px", borderRadius:"50%", background:`radial-gradient(circle, ${T.glow} 0%, transparent 70%)`, pointerEvents:"none" }}/>
                <div style={{ fontFamily:serif, fontSize:"1.75rem", fontWeight:700, marginBottom:"0.4rem" }}>Tell us about yourself</div>
                <div style={{ fontSize:"0.83rem", color:T.muted, marginBottom:"2rem", fontFamily:sans }}>Fill in your details for personalised AI styling</div>

                {/* Photo */}
                <div style={{ textAlign:"center", marginBottom:"2rem" }}>
                  <div onClick={() => fileRef.current?.click()} style={{
                    width:"100px", height:"100px", borderRadius:"50%", margin:"0 auto 0.75rem",
                    border:`2px dashed ${T.accent}50`, cursor:"pointer", overflow:"hidden",
                    background: photo ? "transparent" : T.surface,
                    display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"4px",
                    boxShadow: photo ? "none" : `0 0 20px ${T.glow}`,
                    transition:"all 0.2s",
                  }}>
                    {photo ? <img src={photo} style={{ width:"100%", height:"100%", objectFit:"cover" }}/> : <><Upload size={22} color={T.accent}/><span style={{ fontSize:"0.62rem", color:T.muted, fontFamily:sans }}>Upload</span></>}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} style={{ display:"none" }}/>
                  <div style={{ fontSize:"0.76rem", color:T.muted, fontFamily:sans }}>Upload your photo for better recommendations</div>
                </div>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
                  {[["Full Name","name","text","Your name"],["Age","age","number","25"],["Height (cm)","height","number","165"],["Weight (kg)","weight","number","60"]].map(([label,key,type,ph]) => (
                    <div key={key}>
                      <label style={labelSt}>{label}</label>
                      <input style={inp} type={type} value={profile[key]} onChange={e => P(key, e.target.value)} placeholder={ph}/>
                    </div>
                  ))}
                </div>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"1rem", marginTop:"1rem" }}>
                  <div>
                    <label style={labelSt}>Gender</label>
                    <select style={sel} value={profile.gender} onChange={e => P("gender",e.target.value)}>
                      {GENDERS.map(g => <option key={g} value={g} style={{ background:T.card }}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelSt}>Body Type</label>
                    <select style={sel} value={profile.bodyType} onChange={e => P("bodyType",e.target.value)}>
                      <option value="" style={{ background:T.card }}>Select...</option>
                      {BODY_TYPES.map(b => <option key={b} value={b} style={{ background:T.card }}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelSt}>Skin Tone</label>
                    <select style={sel} value={profile.skinTone} onChange={e => P("skinTone",e.target.value)}>
                      <option value="" style={{ background:T.card }}>Select...</option>
                      {SKIN_TONES.map(s => <option key={s} value={s} style={{ background:T.card }}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ marginTop:"2rem", display:"flex", justifyContent:"flex-end" }}>
                  <button onClick={() => setStep(2)} style={pinkBtn(false)}>
                    Next <ChevronRight size={15}/>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* TRENDING */}
          <div style={{ borderTop:`1px solid ${T.border}`, padding:"5rem 0" }}>
            <div style={wrap}>
              <div style={{ display:"flex", alignItems:"baseline", gap:"1.25rem", marginBottom:"2.5rem" }}>
                <h2 style={{ fontFamily:serif, fontSize:"2.5rem", fontWeight:700, margin:0 }}>Trending <em style={{ color:T.accentSoft }}>Now</em></h2>
                <div style={{ display:"flex", alignItems:"center", gap:"6px", color:T.muted, fontSize:"0.82rem", fontFamily:sans }}>
                  <TrendingUp size={13}/> Most-loved styles this week
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.25rem" }}>
                {TRENDING.map((item,i) => (
                  <div key={item.id} style={{ background:T.card, borderRadius:"18px", border:`1px solid ${T.border}`, padding:"1.5rem", display:"flex", gap:"1.25rem", alignItems:"center", transition:"all 0.2s" }}>
                    <div style={{ fontFamily:serif, fontSize:"2.5rem", color:`${T.accent}20`, lineHeight:1, minWidth:"44px", textAlign:"center", fontWeight:700 }}>
                      {String(i+1).padStart(2,"0")}
                    </div>
                    <div>
                      <div style={{ fontWeight:600, fontSize:"0.92rem", marginBottom:"4px", fontFamily:sans }}>{item.name}</div>
                      <div style={{ fontSize:"0.78rem", color:T.muted, marginBottom:"6px", fontFamily:sans }}>{item.range}</div>
                      <div style={{ display:"flex", gap:"10px", fontSize:"0.72rem", fontFamily:sans }}>
                        <span style={{ color:T.muted }}>{item.sold} sold</span>
                        <span style={{ color:T.green, fontWeight:600 }}>{item.rise}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COMMUNITY */}
          <div style={{ padding:"0 0 5rem" }}>
            <div style={wrap}>
              <div style={{ display:"flex", alignItems:"baseline", gap:"1.25rem", marginBottom:"2.5rem" }}>
                <h2 style={{ fontFamily:serif, fontSize:"2.5rem", fontWeight:700, margin:0 }}>From Our <em style={{ color:T.accentSoft }}>Community</em></h2>
                <span style={{ fontSize:"0.82rem", color:T.muted, fontFamily:sans }}>Real outfits, real people</span>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1.1rem" }}>
                {COMMUNITY.slice(0,4).map(c => (
                  <div key={c.id} style={{ background:T.card, borderRadius:"18px", border:`1px solid ${T.border}`, overflow:"hidden" }}>
                    <div style={{ height:"180px", background:`linear-gradient(135deg, hsla(${c.hue},0.12), hsla(${c.hue},0.05))`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"0.75rem" }}>
                      <div style={{ width:"74px", height:"74px", borderRadius:"50%", background:`hsla(${c.hue},0.5)`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:serif, fontSize:"1.4rem", color:"#fff", fontWeight:700, boxShadow:`0 4px 16px hsla(${c.hue},0.4)` }}>{c.init}</div>
                      <span style={pinkTag}>{c.occasion}</span>
                    </div>
                    <div style={{ padding:"1rem" }}>
                      <div style={{ fontWeight:600, fontSize:"0.86rem", marginBottom:"2px", fontFamily:sans }}>{c.outfit}</div>
                      <div style={{ fontSize:"0.75rem", color:T.muted, fontFamily:sans }}>{c.user} · {c.city}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  // ─── 7 DAY ROUTINE ─────────────────────────────────────────────────────────
  const ROUTINE_PAGE = (
    <div style={{ ...wrap, position:"relative", zIndex:1 }}>
      <div style={{ padding:"4rem 0" }}>
        <h1 style={{ fontFamily:serif, fontSize:"3rem", fontWeight:700, marginBottom:"0.4rem" }}>
          7 Day Outfit <em style={{ color:T.accentSoft }}>Routine</em>
        </h1>
        <div style={{ color:T.muted, fontSize:"0.92rem", marginBottom:"3rem", fontFamily:sans }}>Set your weekly schedule — AI plans your outfits for every day</div>

        {!routineRes ? (
          <>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"1rem", marginBottom:"3rem" }}>
              {DAYS_S.map((day,i) => (
                <div key={day}>
                  <div style={{ fontFamily:serif, fontSize:"1.15rem", fontWeight:700, marginBottom:"2px" }}>{day}</div>
                  <div style={{ fontSize:"0.68rem", color:T.muted, marginBottom:"0.75rem", fontFamily:sans }}>{DAYS_L[i]}</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:"5px" }}>
                    {ACTIVITIES.map(act => (
                      <div key={act} onClick={() => setRoutine(r => ({ ...r, [day]:act }))} style={{
                        padding:"5px 8px", borderRadius:"8px", fontSize:"0.72rem", cursor:"pointer", fontFamily:sans,
                        background: routine[day]===act ? `${T.accent}15` : T.surface,
                        color: routine[day]===act ? T.accentSoft : T.muted,
                        border:`1px solid ${routine[day]===act ? T.accent+"40" : "transparent"}`,
                        lineHeight:1.3, transition:"all 0.12s",
                        boxShadow: routine[day]===act ? `0 2px 8px ${T.glow}` : "none",
                      }}>{act}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={fetchRoutine} disabled={routineLoad} style={pinkBtn(routineLoad)}>
              {routineLoad ? <><RefreshCw size={15}/> Planning your week...</> : <><Calendar size={15}/> Generate Weekly Plan</>}
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setRoutineRes(null)} style={{ ...ghostBtn, marginBottom:"2rem" }}><ArrowLeft size={13}/> Edit schedule</button>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"1rem" }}>
              {routineRes.map((d,i) => (
                <div key={i} style={{ background:T.card, borderRadius:"18px", border:`1px solid ${T.border}`, padding:"1.25rem", display:"flex", flexDirection:"column", gap:"0.9rem" }}>
                  <div>
                    <div style={{ fontFamily:serif, fontSize:"1.15rem", fontWeight:700 }}>{(d.day||DAYS_L[i]).slice(0,3)}</div>
                    <div style={{ fontSize:"0.68rem", color:T.accentSoft, marginTop:"3px", lineHeight:1.3, fontFamily:sans }}>{d.activity}</div>
                  </div>
                  <div style={{ borderTop:`1px solid ${T.border}`, paddingTop:"0.9rem" }}>
                    <div style={{ fontWeight:600, fontSize:"0.83rem", marginBottom:"0.5rem", color:T.accentL, fontFamily:sans }}>{d.outfit}</div>
                    {d.pieces?.map((p,j) => <div key={j} style={{ fontSize:"0.72rem", color:T.muted, marginBottom:"3px", display:"flex", gap:"5px", fontFamily:sans }}><span style={{ color:T.accent }}>·</span>{p}</div>)}
                  </div>
                  {d.palette?.length>0 && (
                    <div style={{ display:"flex", gap:"4px", flexWrap:"wrap" }}>
                      {d.palette.map(p => <span key={p} style={{ ...pinkTag, fontSize:"0.65rem" }}>{p}</span>)}
                    </div>
                  )}
                  {d.tip && <div style={{ fontSize:"0.7rem", color:T.muted, fontStyle:"italic", borderTop:`1px solid ${T.border}`, paddingTop:"0.75rem", lineHeight:1.5, fontFamily:sans }}>{d.tip}</div>}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );

  // ─── STYLE QUIZ ────────────────────────────────────────────────────────────
  const quizOccs = ["All",...Array.from(new Set(COMMUNITY.map(c => c.occasion)))];
  const filtered = quizFilter==="All" ? COMMUNITY : COMMUNITY.filter(c => c.occasion===quizFilter);
  const sorted = [...filtered].sort((a,b) => communityLikes[b.id]-communityLikes[a.id]);

  const QUIZ_PAGE = (
    <div style={{ ...wrap, position:"relative", zIndex:1 }}>
      <div style={{ padding:"4rem 0" }}>
        <h1 style={{ fontFamily:serif, fontSize:"3rem", fontWeight:700, marginBottom:"0.4rem" }}>
          Style <em style={{ color:T.accentSoft }}>Quiz</em>
        </h1>
        <div style={{ color:T.muted, fontSize:"0.92rem", marginBottom:"2.5rem", fontFamily:sans }}>Real outfits curated on StyleAI. Like your favorites — most loved rises to the top.</div>
        <div style={{ display:"flex", gap:"8px", marginBottom:"2.5rem", flexWrap:"wrap" }}>
          {quizOccs.map(occ => (
            <button key={occ} onClick={() => setQuizFilter(occ)} style={{
              padding:"0.42rem 1.1rem", borderRadius:"100px", fontSize:"0.8rem", fontFamily:sans,
              background: quizFilter===occ ? `linear-gradient(135deg,${T.accent},${T.accentD})` : T.card,
              color: quizFilter===occ ? "#fff" : T.muted,
              border:`1px solid ${quizFilter===occ ? "transparent" : T.border}`,
              cursor:"pointer", transition:"all 0.15s",
              boxShadow: quizFilter===occ ? `0 3px 12px ${T.glow}` : "none",
            }}>{occ}</button>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1.25rem" }}>
          {sorted.map((c,rank) => (
            <div key={c.id} style={{ background:T.card, borderRadius:"20px", border:`1px solid ${T.border}`, overflow:"hidden" }}>
              {rank===0 && quizFilter==="All" && (
                <div style={{ background:`linear-gradient(135deg,${T.accent}20,${T.accentD}15)`, borderBottom:`1px solid ${T.accent}25`, padding:"5px 14px", fontSize:"0.67rem", color:T.accentSoft, textAlign:"center", letterSpacing:"0.12em", fontFamily:sans }}>
                  ✦ MOST LOVED
                </div>
              )}
              <div style={{ height:"220px", background:`linear-gradient(135deg, hsla(${c.hue},0.1), hsla(${c.hue},0.04))`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"1rem" }}>
                <div style={{ width:"90px", height:"90px", borderRadius:"50%", background:`hsla(${c.hue},0.5)`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:serif, fontSize:"1.7rem", color:"#fff", fontWeight:700, boxShadow:`0 6px 20px hsla(${c.hue},0.45)` }}>{c.init}</div>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontWeight:600, fontSize:"0.86rem", fontFamily:sans }}>{c.outfit}</div>
                  <div style={{ fontSize:"0.72rem", color:T.muted, marginTop:"2px", fontFamily:sans }}>{c.occasion}</div>
                </div>
              </div>
              <div style={{ padding:"1rem 1.1rem", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontSize:"0.83rem", fontWeight:600, fontFamily:sans }}>{c.user}</div>
                  <div style={{ fontSize:"0.72rem", color:T.muted, fontFamily:sans }}>{c.city}</div>
                </div>
                <button onClick={() => toggleLike(c.id)} style={{
                  background:"transparent", cursor:"pointer",
                  display:"flex", alignItems:"center", gap:"6px",
                  padding:"5px 12px", borderRadius:"100px",
                  border:`1px solid ${userLiked[c.id] ? T.rose+"60" : T.border}`,
                  color: userLiked[c.id] ? T.rose : T.muted,
                  fontSize:"0.83rem", fontFamily:sans, transition:"all 0.15s",
                  boxShadow: userLiked[c.id] ? `0 0 12px rgba(255,51,102,0.3)` : "none",
                }}>
                  <Heart size={13} fill={userLiked[c.id] ? T.rose : "none"} color={userLiked[c.id] ? T.rose : T.muted}/>
                  {communityLikes[c.id]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ─── PROFILE ───────────────────────────────────────────────────────────────
  const PROFILE_PAGE = (
    <div style={{ ...wrap, position:"relative", zIndex:1 }}>
      <div style={{ padding:"4rem 0", maxWidth:"580px" }}>
        <h1 style={{ fontFamily:serif, fontSize:"3rem", fontWeight:700, marginBottom:"2.5rem" }}>Your <em style={{ color:T.accentSoft }}>Profile</em></h1>
        {profile.name ? (
          <>
            <div style={{ background:T.card, borderRadius:"22px", border:`1px solid ${T.border}`, padding:"2rem", marginBottom:"1.25rem", display:"flex", gap:"1.75rem", alignItems:"center" }}>
              <div style={{ width:"84px", height:"84px", borderRadius:"50%", background: photo ? "transparent" : `${T.accent}15`, overflow:"hidden", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", border:`2px solid ${T.accent}30`, boxShadow:`0 4px 20px ${T.glow}` }}>
                {photo ? <img src={photo} style={{ width:"100%", height:"100%", objectFit:"cover" }}/> : <User size={32} color={T.accent}/>}
              </div>
              <div>
                <div style={{ fontFamily:serif, fontSize:"2.1rem", fontWeight:700 }}>{profile.name}</div>
                <div style={{ color:T.muted, fontSize:"0.86rem", marginTop:"4px", fontFamily:sans }}>{profile.gender}{profile.age ? ` · ${profile.age} yrs` : ""}</div>
              </div>
            </div>
            <div style={{ background:T.card, borderRadius:"16px", border:`1px solid ${T.border}`, overflow:"hidden", marginBottom:"1.5rem" }}>
              {[["Height",profile.height&&`${profile.height} cm`],["Weight",profile.weight&&`${profile.weight} kg`],["Body Type",profile.bodyType],["Skin Tone",profile.skinTone]].filter(([,v])=>v).map(([k,v],i,arr) => (
                <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"0.9rem 1.25rem", borderBottom: i<arr.length-1 ? `1px solid ${T.border}` : "none" }}>
                  <span style={{ color:T.muted, fontSize:"0.86rem", fontFamily:sans }}>{k}</span>
                  <span style={{ fontWeight:600, fontSize:"0.86rem", fontFamily:sans }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:"1rem" }}>
              <button onClick={() => { setPage("home"); setStep(2); }} style={pinkBtn(false)}>
                <Sparkles size={15}/> Get Outfits
              </button>
              <button onClick={() => { setPage("home"); setStep(1); }} style={{ ...pinkBtn(false), background:"transparent", color:T.accentSoft, border:`1px solid ${T.accent}40`, boxShadow:"none" }}>
                Edit Profile
              </button>
            </div>
          </>
        ) : (
          <div style={{ background:T.card, borderRadius:"22px", border:`1px solid ${T.border}`, padding:"4rem 2rem", textAlign:"center" }}>
            <div style={{ width:"72px", height:"72px", borderRadius:"50%", background:`${T.accent}12`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1.25rem", border:`1px solid ${T.accent}25` }}>
              <User size={32} color={T.accent}/>
            </div>
            <div style={{ fontFamily:serif, fontSize:"1.7rem", fontWeight:700, marginBottom:"0.75rem" }}>No profile yet</div>
            <div style={{ color:T.muted, marginBottom:"2rem", fontSize:"0.88rem", fontFamily:sans }}>Complete the style advisor form to build your profile</div>
            <button onClick={() => { setPage("home"); setStep(1); }} style={pinkBtn(false)}>
              <User size={15}/> Create Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // ─── FOOTER ────────────────────────────────────────────────────────────────
  const FOOTER = (
    <div style={{ borderTop:`1px solid ${T.border}`, padding:"2rem 2rem", display:"flex", justifyContent:"space-between", alignItems:"center", position:"relative", zIndex:1 }}>
      <div style={{ fontFamily:serif, fontSize:"1.25rem", fontWeight:700, background:`linear-gradient(135deg,${T.accentSoft},${T.accent})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>StyleAI</div>
      <div style={{ fontSize:"0.75rem", color:T.muted, fontFamily:sans }}>AI-Powered Fashion for India · Powered by Claude</div>
    </div>
  );

  // ─── ROOT ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:sans }}>
      <style>{`
        * { box-sizing:border-box; margin:0; padding:0; }
        input::placeholder { color:${T.dim}; }
        select option { background:${T.card}; color:${T.text}; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:${T.bg}; }
        ::-webkit-scrollbar-thumb { background:${T.border}; border-radius:2px; }
        input:focus { border-color:${T.accent} !important; box-shadow:0 0 0 3px ${T.glow}; }
      `}</style>
      {ORBS}
      {NAV}
      {page==="home" && HOME}
      {page==="routine" && ROUTINE_PAGE}
      {page==="quiz" && QUIZ_PAGE}
      {page==="profile" && PROFILE_PAGE}
      {FOOTER}
    </div>
  );
}
