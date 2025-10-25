import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Course {
  id: number;
  title: string;
  description: string;
  progress: number;
  level: number;
  totalLevels: number;
  icon: string;
  color: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  date?: string;
}

interface LeaderboardEntry {
  id: number;
  name: string;
  avatar: string;
  points: number;
  rank: number;
  streak: number;
}

const Index = () => {
  const [selectedTab, setSelectedTab] = useState<'courses' | 'achievements' | 'leaderboard' | 'progress'>('courses');

  const courses: Course[] = [
    {
      id: 1,
      title: 'Английский язык',
      description: 'Базовый курс для начинающих',
      progress: 65,
      level: 13,
      totalLevels: 20,
      icon: '🇬🇧',
      color: 'bg-primary'
    },
    {
      id: 2,
      title: 'Испанский язык',
      description: 'Повседневные фразы и грамматика',
      progress: 40,
      level: 8,
      totalLevels: 20,
      icon: '🇪🇸',
      color: 'bg-secondary'
    },
    {
      id: 3,
      title: 'Французский язык',
      description: 'Культура и язык Франции',
      progress: 15,
      level: 3,
      totalLevels: 20,
      icon: '🇫🇷',
      color: 'bg-accent'
    }
  ];

  const achievements: Achievement[] = [
    {
      id: 1,
      title: 'Первые шаги',
      description: 'Завершите первый урок',
      icon: '🎯',
      earned: true,
      date: '15 окт 2024'
    },
    {
      id: 2,
      title: 'Неделя силы',
      description: '7 дней подряд практики',
      icon: '🔥',
      earned: true,
      date: '18 окт 2024'
    },
    {
      id: 3,
      title: 'Профессионал',
      description: 'Завершите 50 уроков',
      icon: '⭐',
      earned: false
    },
    {
      id: 4,
      title: 'Полиглот',
      description: 'Изучайте 3 языка одновременно',
      icon: '🌍',
      earned: true,
      date: '20 окт 2024'
    },
    {
      id: 5,
      title: 'Мастер',
      description: 'Достигните уровня 20 в курсе',
      icon: '👑',
      earned: false
    },
    {
      id: 6,
      title: 'Скоростной',
      description: 'Завершите урок без ошибок',
      icon: '⚡',
      earned: true,
      date: '22 окт 2024'
    }
  ];

  const leaderboard: LeaderboardEntry[] = [
    { id: 1, name: 'Анна Иванова', avatar: '👩', points: 2450, rank: 1, streak: 45 },
    { id: 2, name: 'Дмитрий Петров', avatar: '👨', points: 2350, rank: 2, streak: 38 },
    { id: 3, name: 'Вы', avatar: '😊', points: 2180, rank: 3, streak: 21 },
    { id: 4, name: 'Елена Смирнова', avatar: '👩‍🦰', points: 2050, rank: 4, streak: 30 },
    { id: 5, name: 'Михаил Козлов', avatar: '👨‍💼', points: 1920, rank: 5, streak: 15 }
  ];

  const stats = {
    totalXP: 2180,
    streak: 21,
    lessonsCompleted: 87,
    timeSpent: '42 ч',
    weeklyGoal: 70,
    weeklyProgress: 85
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
                Добро пожаловать! 👋
              </h1>
              <p className="text-muted-foreground text-lg">Продолжайте обучение и достигайте новых высот</p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Card className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:scale-105 transition-transform">
                <div className="flex items-center gap-2">
                  <Icon name="Zap" className="w-5 h-5" />
                  <div>
                    <p className="text-xs opacity-90">Дней подряд</p>
                    <p className="text-2xl font-bold">{stats.streak} 🔥</p>
                  </div>
                </div>
              </Card>
              <Card className="px-6 py-3 bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground hover:scale-105 transition-transform">
                <div className="flex items-center gap-2">
                  <Icon name="Trophy" className="w-5 h-5" />
                  <div>
                    <p className="text-xs opacity-90">Всего XP</p>
                    <p className="text-2xl font-bold">{stats.totalXP}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 bg-card rounded-2xl p-2 shadow-sm border">
            {(['courses', 'achievements', 'leaderboard', 'progress'] as const).map((tab) => (
              <Button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                variant={selectedTab === tab ? 'default' : 'ghost'}
                className={`flex-1 min-w-[120px] rounded-xl transition-all ${
                  selectedTab === tab
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                    : 'hover:bg-muted'
                }`}
              >
                <Icon
                  name={
                    tab === 'courses'
                      ? 'BookOpen'
                      : tab === 'achievements'
                      ? 'Award'
                      : tab === 'leaderboard'
                      ? 'Users'
                      : 'BarChart3'
                  }
                  className="w-4 h-4 mr-2"
                />
                {tab === 'courses'
                  ? 'Курсы'
                  : tab === 'achievements'
                  ? 'Достижения'
                  : tab === 'leaderboard'
                  ? 'Рейтинг'
                  : 'Прогресс'}
              </Button>
            ))}
          </div>
        </header>

        {selectedTab === 'courses' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
            {courses.map((course, index) => (
              <Card
                key={course.id}
                className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50 bg-gradient-to-br from-card to-card/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`text-4xl p-3 rounded-2xl ${course.color} bg-opacity-10 animate-float`}>
                      {course.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">{course.description}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Прогресс</span>
                    <span className="font-semibold text-primary">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-3" />
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    Уровень {course.level}/{course.totalLevels}
                  </Badge>
                  <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80 hover:scale-105 transition-transform">
                    Продолжить
                    <Icon name="ArrowRight" className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {selectedTab === 'achievements' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
            {achievements.map((achievement, index) => (
              <Card
                key={achievement.id}
                className={`p-6 transition-all hover:shadow-lg ${
                  achievement.earned
                    ? 'bg-gradient-to-br from-card to-primary/5 border-2 border-primary/20 hover:-translate-y-1'
                    : 'opacity-60 hover:opacity-80 bg-gradient-to-br from-card to-muted/20'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`text-5xl p-4 rounded-2xl ${
                      achievement.earned ? 'bg-primary/10 animate-scale-in' : 'bg-muted/30 grayscale'
                    }`}
                  >
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg">{achievement.title}</h3>
                      {achievement.earned && (
                        <Icon name="CheckCircle2" className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                    {achievement.earned && achievement.date && (
                      <Badge variant="secondary" className="text-xs">
                        <Icon name="Calendar" className="w-3 h-3 mr-1" />
                        {achievement.date}
                      </Badge>
                    )}
                    {!achievement.earned && (
                      <Badge variant="outline" className="text-xs">
                        <Icon name="Lock" className="w-3 h-3 mr-1" />
                        Заблокировано
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {selectedTab === 'leaderboard' && (
          <Card className="p-6 animate-slide-up bg-gradient-to-br from-card to-card/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Icon name="Trophy" className="w-6 h-6 text-primary" />
                Таблица лидеров
              </h2>
              <Badge variant="secondary">Эта неделя</Badge>
            </div>
            <div className="space-y-3">
              {leaderboard.map((entry, index) => (
                <div
                  key={entry.id}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all hover:bg-muted/50 ${
                    entry.name === 'Вы'
                      ? 'bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30 hover:scale-102'
                      : 'bg-muted/20'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className={`text-2xl font-bold w-10 h-10 rounded-full flex items-center justify-center ${
                      entry.rank === 1
                        ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white'
                        : entry.rank === 2
                        ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white'
                        : entry.rank === 3
                        ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {entry.rank}
                  </div>
                  <div className="text-3xl">{entry.avatar}</div>
                  <div className="flex-1">
                    <p className="font-semibold">{entry.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Flame" className="w-4 h-4 text-secondary" />
                      <span>{entry.streak} дней</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">{entry.points}</p>
                    <p className="text-xs text-muted-foreground">XP</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {selectedTab === 'progress' && (
          <div className="grid md:grid-cols-2 gap-6 animate-slide-up">
            <Card className="p-6 bg-gradient-to-br from-card to-primary/5">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Target" className="w-6 h-6 text-primary" />
                Недельная цель
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Прогресс цели</span>
                  <span className="text-2xl font-bold text-primary">{stats.weeklyProgress}%</span>
                </div>
                <Progress value={stats.weeklyProgress} className="h-4" />
                <p className="text-sm text-muted-foreground">
                  Цель: {stats.weeklyGoal} XP в неделю
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-card to-secondary/5">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="BarChart3" className="w-6 h-6 text-secondary" />
                Общая статистика
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 hover:scale-105 transition-transform">
                  <Icon name="BookOpen" className="w-8 h-8 text-primary mb-2" />
                  <p className="text-3xl font-bold">{stats.lessonsCompleted}</p>
                  <p className="text-sm text-muted-foreground">Уроков завершено</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-secondary/10 to-secondary/5 hover:scale-105 transition-transform">
                  <Icon name="Clock" className="w-8 h-8 text-secondary mb-2" />
                  <p className="text-3xl font-bold">{stats.timeSpent}</p>
                  <p className="text-sm text-muted-foreground">Времени потрачено</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 hover:scale-105 transition-transform">
                  <Icon name="Flame" className="w-8 h-8 text-accent mb-2" />
                  <p className="text-3xl font-bold">{stats.streak}</p>
                  <p className="text-sm text-muted-foreground">Дней подряд</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/5 hover:scale-105 transition-transform">
                  <Icon name="Trophy" className="w-8 h-8 text-primary mb-2" />
                  <p className="text-3xl font-bold">{stats.totalXP}</p>
                  <p className="text-sm text-muted-foreground">Всего XP</p>
                </div>
              </div>
            </Card>

            <Card className="md:col-span-2 p-6 bg-gradient-to-br from-card to-accent/5">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="TrendingUp" className="w-6 h-6 text-accent" />
                Активность по дням
              </h2>
              <div className="grid grid-cols-7 gap-2">
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => (
                  <div key={day} className="text-center">
                    <p className="text-xs text-muted-foreground mb-2">{day}</p>
                    <div
                      className={`h-24 rounded-lg flex items-end justify-center pb-2 transition-all hover:scale-105 ${
                        index < 5
                          ? 'bg-gradient-to-t from-primary to-primary/50'
                          : index === 5
                          ? 'bg-gradient-to-t from-secondary to-secondary/50'
                          : 'bg-muted'
                      }`}
                      style={{
                        height: index < 5 ? `${60 + Math.random() * 40}px` : index === 5 ? '80px' : '40px'
                      }}
                    >
                      {index < 6 && (
                        <Icon
                          name="CheckCircle2"
                          className="w-5 h-5 text-white"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
