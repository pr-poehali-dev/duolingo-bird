import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Question {
  id: number;
  type: 'multiple-choice' | 'translation' | 'audio';
  question: string;
  options?: string[];
  correctAnswer: string;
  translation?: string;
  audioText?: string;
}

interface LessonProps {
  courseId: number;
  courseTitle: string;
  courseIcon: string;
  onComplete: (earnedXP: number) => void;
  onClose: () => void;
}

const Lesson = ({ courseId, courseTitle, courseIcon, onComplete, onClose }: LessonProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [showCompletion, setShowCompletion] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      type: 'multiple-choice',
      question: 'Как переводится "Hello"?',
      options: ['Привет', 'Пока', 'Спасибо', 'Пожалуйста'],
      correctAnswer: 'Привет'
    },
    {
      id: 2,
      type: 'translation',
      question: 'Переведите: "Good morning"',
      options: ['Доброе утро', 'Добрый день', 'Добрый вечер', 'Спокойной ночи'],
      correctAnswer: 'Доброе утро'
    },
    {
      id: 3,
      type: 'multiple-choice',
      question: 'Выберите правильный перевод "Thank you"',
      options: ['Извините', 'Спасибо', 'До свидания', 'Здравствуйте'],
      correctAnswer: 'Спасибо'
    },
    {
      id: 4,
      type: 'translation',
      question: 'Как сказать "Goodbye"?',
      options: ['До свидания', 'Привет', 'Как дела?', 'Пожалуйста'],
      correctAnswer: 'До свидания'
    },
    {
      id: 5,
      type: 'multiple-choice',
      question: 'Что означает "Please"?',
      options: ['Спасибо', 'Извините', 'Пожалуйста', 'Привет'],
      correctAnswer: 'Пожалуйста'
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (answer: string) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
  };

  const handleCheckAnswer = () => {
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 10);
    } else {
      setHearts(Math.max(0, hearts - 1));
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      const earnedXP = score + (hearts * 5);
      setShowCompletion(true);
      setTimeout(() => {
        onComplete(earnedXP);
      }, 3000);
    }
  };

  if (showCompletion) {
    const earnedXP = score + (hearts * 5);
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
        <Card className="max-w-md w-full mx-4 p-8 text-center bg-gradient-to-br from-card to-primary/10 animate-scale-in">
          <div className="text-6xl mb-4 animate-float">🎉</div>
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Урок завершён!
          </h2>
          <p className="text-muted-foreground mb-6">Отличная работа!</p>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between p-4 bg-primary/10 rounded-xl">
              <span className="flex items-center gap-2">
                <Icon name="Trophy" className="w-5 h-5 text-primary" />
                <span>Заработано XP</span>
              </span>
              <span className="text-2xl font-bold text-primary">+{earnedXP}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-xl">
              <span className="flex items-center gap-2">
                <Icon name="Target" className="w-5 h-5 text-secondary" />
                <span>Правильных ответов</span>
              </span>
              <span className="text-2xl font-bold text-secondary">{score / 10}/{questions.length}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-accent/10 rounded-xl">
              <span className="flex items-center gap-2">
                <Icon name="Heart" className="w-5 h-5 text-accent" />
                <span>Осталось сердец</span>
              </span>
              <span className="text-2xl font-bold text-accent">{hearts}</span>
            </div>
          </div>

          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform"
            size="lg"
          >
            Продолжить обучение
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto animate-fade-in">
      <div className="container max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="ghost" onClick={onClose} className="hover:bg-muted">
            <Icon name="X" className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{courseIcon}</span>
            <span className="font-semibold">{courseTitle}</span>
          </div>
          <div className="flex items-center gap-2">
            {[...Array(3)].map((_, i) => (
              <Icon
                key={i}
                name="Heart"
                className={`w-6 h-6 ${
                  i < hearts ? 'text-red-500 fill-red-500' : 'text-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Вопрос {currentQuestionIndex + 1} из {questions.length}
            </span>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Icon name="Zap" className="w-3 h-3" />
              {score} XP
            </Badge>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        <Card className="p-8 mb-6 bg-gradient-to-br from-card to-primary/5 border-2 animate-slide-up">
          <div className="mb-8">
            <Badge variant="outline" className="mb-4">
              {currentQuestion.type === 'multiple-choice' ? 'Множественный выбор' : 'Перевод'}
            </Badge>
            <h2 className="text-2xl font-bold">{currentQuestion.question}</h2>
          </div>

          <div className="space-y-3 mb-6">
            {currentQuestion.options?.map((option) => {
              const isSelected = selectedAnswer === option;
              const showCorrect = showFeedback && option === currentQuestion.correctAnswer;
              const showWrong = showFeedback && isSelected && !isCorrect;

              return (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showFeedback}
                  className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all hover:scale-102 ${
                    showCorrect
                      ? 'bg-primary/20 border-primary text-primary'
                      : showWrong
                      ? 'bg-destructive/20 border-destructive text-destructive'
                      : isSelected
                      ? 'bg-primary/10 border-primary'
                      : 'bg-card border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showCorrect && <Icon name="CheckCircle2" className="w-5 h-5" />}
                    {showWrong && <Icon name="XCircle" className="w-5 h-5" />}
                  </div>
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div
              className={`p-4 rounded-xl mb-6 animate-slide-up ${
                isCorrect ? 'bg-primary/10 border-2 border-primary' : 'bg-destructive/10 border-2 border-destructive'
              }`}
            >
              <div className="flex items-center gap-3">
                {isCorrect ? (
                  <>
                    <Icon name="CheckCircle2" className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-bold text-primary">Правильно! 🎉</p>
                      <p className="text-sm text-muted-foreground">+10 XP</p>
                    </div>
                  </>
                ) : (
                  <>
                    <Icon name="XCircle" className="w-6 h-6 text-destructive" />
                    <div>
                      <p className="font-bold text-destructive">Неправильно</p>
                      <p className="text-sm text-muted-foreground">
                        Правильный ответ: {currentQuestion.correctAnswer}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            {!showFeedback ? (
              <Button
                onClick={handleCheckAnswer}
                disabled={!selectedAnswer}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform disabled:opacity-50"
                size="lg"
              >
                Проверить
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform"
                size="lg"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Следующий вопрос' : 'Завершить урок'}
                <Icon name="ArrowRight" className="w-5 h-5 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Lesson;
