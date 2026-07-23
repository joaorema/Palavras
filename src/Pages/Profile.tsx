import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button1 from "../components/button1";
import "../css/Profile.css";
import { WORDLE_WORDS } from "../data/wordleLevels";
import { supabase } from "../supabaseClient";
import { levels as connectionLevels } from "./conexaolvls";

const PLACEHOLDERS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Zack",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Midnight",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Annie",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Bear",
];

interface ProfileUser {
  email?: string;
  user_metadata?: {
    avatar_index?: unknown;
    display_name?: unknown;
  };
}

interface ProfileStats {
  wordleLevels: number[];
  connectionLevels: number[];
}

function getSavedAvatarIndex(user: ProfileUser) {
  const savedIndex = user.user_metadata?.avatar_index;

  return typeof savedIndex === "number" && savedIndex >= 0 && savedIndex < PLACEHOLDERS.length ? savedIndex : 0;
}

function getDisplayName(user: ProfileUser) {
  const savedName = user.user_metadata?.display_name;

  if (typeof savedName === "string" && savedName.trim()) {
    return savedName.trim();
  }

  return user.email?.split("@")[0] || "Jogador";
}

function getRank(totalCompleted: number) {
  if (totalCompleted >= 70) return "Mestre das Palavras";
  if (totalCompleted >= 45) return "Especialista";
  if (totalCompleted >= 20) return "Desafiante";
  if (totalCompleted >= 8) return "Promessa";
  return "Principiante";
}

function getNextLevel(completedLevels: number[], totalLevels: number) {
  for (let level = 1; level <= totalLevels; level += 1) {
    if (!completedLevels.includes(level)) return level;
  }

  return totalLevels;
}

function ProgressBar({ label, completed, total, tone }: { label: string; completed: number; total: number; tone: string }) {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="profile-progress-row">
      <div className="profile-progress-label">
        <span>{label}</span>
        <span>
          {completed}/{total}
        </span>
      </div>
      <div className="profile-progress-track">
        <div className={`profile-progress-fill ${tone}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function ProfilePage() {
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [stats, setStats] = useState<ProfileStats>({ wordleLevels: [], connectionLevels: [] });
  const [loading, setLoading] = useState(true);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [savingAvatar, setSavingAvatar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const {
          data: { user: currentUser },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !currentUser) {
          navigate("/login", { replace: true });
          return;
        }

        setUser(currentUser);
        setPhotoIndex(getSavedAvatarIndex(currentUser));

        const [{ data: wordleData, error: wordleError }, { data: connData, error: connError }] = await Promise.all([
          supabase.from("player_progress").select("level_number").eq("user_id", currentUser.id),
          supabase.from("connections_progress").select("level_number").eq("user_id", currentUser.id),
        ]);

        if (wordleError) throw wordleError;
        if (connError) throw connError;

        setStats({
          wordleLevels: [...new Set((wordleData ?? []).map((item) => item.level_number))].sort((a, b) => a - b),
          connectionLevels: [...new Set((connData ?? []).map((item) => item.level_number))].sort((a, b) => a - b),
        });
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleChangeAvatar = async () => {
    if (savingAvatar) return;

    const nextIndex = (photoIndex + 1) % PLACEHOLDERS.length;
    const previousIndex = photoIndex;

    setPhotoIndex(nextIndex);
    setSavingAvatar(true);

    const { error } = await supabase.auth.updateUser({
      data: {
        avatar_index: nextIndex,
      },
    });

    if (error) {
      setPhotoIndex(previousIndex);
    }

    setSavingAvatar(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg2 font-mono text-white">
        <div className="animate-pulse text-xl">A carregar perfil...</div>
      </div>
    );
  }

  const displayName = user ? getDisplayName(user) : "Jogador";
  const wordleCompleted = stats.wordleLevels.length;
  const connectionsCompleted = stats.connectionLevels.length;
  const totalCompleted = wordleCompleted + connectionsCompleted;
  const totalLevels = WORDLE_WORDS.length + connectionLevels.length;
  const totalPercent = Math.round((totalCompleted / totalLevels) * 100);
  const rank = getRank(totalCompleted);
  const nextWordleLevel = getNextLevel(stats.wordleLevels, WORDLE_WORDS.length);
  const nextConnectionLevel = getNextLevel(stats.connectionLevels, connectionLevels.length);

  return (
    <div className="profile-container font-mono">
      <div className="profile-box">
        <div className="profile-hero">
          <div className="profile-avatar-wrap">
            <img className="profile-avatar" src={PLACEHOLDERS[photoIndex]} alt="Avatar" />
            <button onClick={handleChangeAvatar} disabled={savingAvatar} className="profile-avatar-button">
              {savingAvatar ? "A guardar..." : "Trocar Avatar"}
            </button>
          </div>

          <div className="profile-heading">
            <p className="profile-kicker">Perfil</p>
            <h2>{displayName}</h2>
            <p className="profile-rank">{rank}</p>
          </div>
        </div>

        <div className="profile-summary-grid">
          <div className="profile-summary-card">
            <span>Total</span>
            <strong>{totalCompleted}</strong>
            <small>Niveis concluidos</small>
          </div>
          <div className="profile-summary-card">
            <span>Conclusao</span>
            <strong>{totalPercent}%</strong>
            <small>Do jogo completo</small>
          </div>
          <div className="profile-summary-card">
            <span>Proximo</span>
            <strong>{Math.min(nextWordleLevel, nextConnectionLevel)}</strong>
            <small>Menor nivel por acabar</small>
          </div>
        </div>

        <div className="profile-panel">
          <div className="profile-panel-heading">
            <h3>Progresso</h3>
            <span>{user?.email}</span>
          </div>
          <ProgressBar label="Palavras" completed={wordleCompleted} total={WORDLE_WORDS.length} tone="wordle" />
          <ProgressBar label="Conexoes" completed={connectionsCompleted} total={connectionLevels.length} tone="connections" />
        </div>

        <div className="profile-next-grid">
          <button className="profile-next-card" onClick={() => navigate("/wordlelevel")}>
            <span>Continuar Palavras</span>
            <strong>Nivel {nextWordleLevel}</strong>
          </button>
          <button className="profile-next-card" onClick={() => navigate("/connectionlevel")}>
            <span>Continuar Conexoes</span>
            <strong>Nivel {nextConnectionLevel}</strong>
          </button>
        </div>

        <div className="profile-actions">
          <Button1 title="Jogos" onClick={() => navigate("/games")} />
          <button className="profile-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
