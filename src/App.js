import React, { useState } from "react";

const QUESTIONS = [
  {
    question: "2*(4+4) sonucu nedir?",
    answers: ["2", "4", "8", "16"],
    correct: 3
  },
  {
    question: "9*9 sonucu nedir?",
    answers: ["18", "81", "80", "79"],
    correct: 1
  },
  {
    question: "Formula 1'in 2022 şampiyonu kimdir?",
    answers: [
      "Max Verstappen",
      "Charles Leclerc",
      "Lewis Hamilton",
      "Lando Norris"
    ],
    correct: 0
  },
  {
    question: "Formula 1 takviminde ilk sırada hangi grand prix vardır?",
    answers: [
      "Bahreyn Grand Prix",
      "Suudi Arabistan Grand Prix",
      "Avustralya Grand Prix",
      "Emilia Romagna Grand Prix"
    ],
    correct: 0
  },
  {
    question: "Hangisi Formula 1 takımlarından değildir?",
    answers: [
      "Ford-AMG F1 Team",
      "Alfa Romeo F1 Team Orlen",
      "BWT Alpine F1 Team",
      "Oracle Red Bull Racing"
    ],
    correct: 0
  }
];

function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Quiz questions={QUESTIONS} />
    </div>
  );
}



const Quiz = ({ questions }) => {

  // Mevcut soruyu takip etmek için state.
const [currentQuestion, setCurrentQuestion] = useState(0);

// Her soru için seçilen cevapları takip etmek için state.
// Öncelikle, her bir sorunun cevabının seçilmediğini belirlemek için null değerlerle doldurulmuş bir dizi oluşturuyoruz.
// Her bir soru için seçilen cevabın indeksini bu dizi içinde saklayacağız.
const [selectedAnswers, setSelectedAnswers] = useState(Array(QUESTIONS.length).fill(null));

// Kullanıcının elde ettiği puanı takip etmek için state.
const [score, setScore] = useState(0);
const [finished, setFinished] = useState(false);

  // Cevabın işlenmesi ve sonraki sorunun gösterilmesi
const handleAnswer = (answerIndex) => {
  // Seçilen cevabın indeksini sakla
  // Önce, mevcut seçilen cevapları kopyalıyoruz.
  const newSelectedAnswers = [...selectedAnswers];
  // Sonra, mevcut sorunun indeksindeki seçilen cevabı güncelliyoruz.
  newSelectedAnswers[currentQuestion] = answerIndex;
  // Seçilen cevapları güncelle
  setSelectedAnswers(newSelectedAnswers);

  // Cevabın doğruluğunu kontrol et ve puanı güncelle
  // Kullanıcının seçtiği cevabın doğruluğunu, seçilen cevabın indeksiyle ilgili sorunun doğru cevabının indeksiyle karşılaştırarak kontrol ediyoruz.
  const isCorrect = answerIndex === questions[currentQuestion].correct;
  // Eğer cevap doğru ise, puanı bir artırıyoruz.
  if (isCorrect) {
    setScore(score + 1);
  }

  // 1 saniye sonra bir sonraki soruya geç
  // Kullanıcıya bir sonraki soruyu göstermek için 1 saniyelik bir gecikme ekliyoruz. Bu, kullanıcının seçtiği cevabı bir süre görebilmesini sağlar.
  // Bir sonraki soruya geçiş işlemini planla
  setTimeout(() => {
    // Eğer mevcut soru, son sorunun öncesindeyse bir sonraki soruya geç
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Tüm soruları yanıtladıktan sonra sonuçları göster
      // Sonuçları bir uyarı kutusuyla göster
      alert(`Sınav Bitti! Puanınız: ${(score / questions.length) * 100}%`);
      setFinished(true);
    }
  }, 1000); // 1 saniye sonra bir sonraki soruya geçiş
};


return (
  <div className="max-w-lg mx-auto p-8 border rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-4">
      {questions[currentQuestion].question}
    </h2>
    <ul>
      {questions[currentQuestion].answers.map((answer, index) => (
        <li
          key={index}
          onClick={() => handleAnswer(index)}
          className={`py-2 px-4 mb-2 rounded-md cursor-pointer ${
            selectedAnswers[currentQuestion] === index
              ? index === questions[currentQuestion].correct
                ? "bg-green-400 text-white"
                : "bg-red-400 text-white"
              : "bg-gray-200"
          }`}
        >
          {answer}
        </li>
      ))}
    </ul>
    <div className="mt-4">
      {/* Test bitmediyse ve geri gidilecek bir önceki soru varsa geri butonunu göster */}
      {currentQuestion > 0 && !finished && (
        <button
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
          className="py-2 px-4 mr-2 bg-blue-500 text-white rounded-md cursor-pointer"
        >
          Geri
        </button>
      )}
      {/* Test bitmediyse ve ileri gidilecek bir sonraki soru varsa ileri butonunu göster */}
      {currentQuestion < questions.length - 1 && !finished && (
        <button
          onClick={() => setCurrentQuestion(currentQuestion + 1)}
          className="py-2 px-4 bg-blue-500 text-white rounded-md cursor-pointer"
        >
          İleri
        </button>
      )}
    </div>
    {/* Test bitmişse sonucu göster */}
    {finished && (
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Sınav Bitti!</h2>
        <p className="text-lg">Puanınız: {(score / questions.length) * 100}%</p>
      </div>
    )}
  </div>
);
};

export default App;