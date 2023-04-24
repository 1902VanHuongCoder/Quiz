import { questions } from "./data";
import { useState } from "react";
import "./App.css";

export default function Ungdung() {
  const [isHome, setIsHome] = useState(true);
  const [isTest, setTest] = useState(false);
  return (
    <>
      <Navigation setIsHomeAr={setIsHome} setIsTest={setTest} />
      <Sidebar />
      {isTest === true && <Test />}
      {isHome === true && (
        <InforMyWeb setIsTest={setTest} setIsHomeAr={setIsHome} />
      )}
      {isTest === false && isHome === false && <Enterquestion />}
      <Footer />
    </>
  );
}
export function Enterquestion() {
  return (
    <form className="enter-question-form">
      <h1>Nhập câu hỏi của bạn</h1>
      <label>
        Câu hỏi:
        <input type="text" id="question" placeholder="Bạn khỏe không?" />
      </label>
      <div className="answer-group">
        <label>
          Đáp án 1: <input type="text" placeholder="Đáp án 1" />
        </label>
        <label>
          Đáp án 2: <input type="text" placeholder="Đáp án 2" />
        </label>
        <label>
          Đáp án 3: <input type="text" placeholder="Đáp án 3" />
        </label>
        <label>
          Đáp án 4: <input type="text" placeholder="Đáp án 4" />
        </label>
        <label>
          Đáp án đúng: <input type="text" placeholder="Vd: A" />
        </label>
      </div>
      <button type="submit">Lưu câu hỏi</button>
    </form>
  );
}
export function Sidebar() {
  return (
    <div className="side-bar">
      <h2>Các bộ đề bạn của bạn!</h2>
      <ul className="side-bar-content">
        <li>Bộ đề Tiếng Anh</li>
        <li>Bộ đề Phân Tích và Thiết kế TT</li>
        <li>Bộ đề CSDL</li>
        <li>Bộ đề CNXH Khoa Học</li>
        <li>Bộ đề Quản Trị Hệ Thống</li>
        <li>Bộ đề Trí Tuệ Nhân Tạo</li>
      </ul>
    </div>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <p>Trang Web được tạo bởi PaulTo</p>
      <p>Lần nâng cấp gần nhất là vào ngày 22/04/2023</p>
    </footer>
  );
}
export function InforMyWeb({ setIsTest, setIsHomeAr }) {
  let handleConvertToTest = () => {
    setIsTest(true);
    setIsHomeAr(false);
  };
  let handleEnterQuestion = () => {
    setIsTest(false);
    setIsHomeAr(false);
  };
  return (
    <div className="info-box">
      <h1>Một số thông tin các bạn cần nắm</h1>
      <p>
        Trang web này là trang web demo hỗ trợ các bạn tạo ra các bộ câu hỏi, từ
        đó giúp cho các bạn học tập dễ dàng hơn. Nếu các bạn muốn tạo ra bộ câu
        hỏi của riêng bạn ấn <b>Thêm câu hỏi</b>
        .Ngược lại, nếu các bạn muốn sử dụng một đề thi mẫu của chúng tôi ấn{" "}
        <b>Thi thử</b>
      </p>
      <div className="info-box-button">
        <button onClick={handleEnterQuestion}>+ Thêm câu hỏi</button>
        <button onClick={handleConvertToTest}> Thi thử </button>
      </div>
    </div>
  );
}
export function Navigation({ setIsHomeAr, setIsTest }) {
  let handleConvertToHome = () => {
    setIsHomeAr(true);
    setIsTest(false);
  };
  let handleConvertToTest = () => {
    setIsTest(true);
    setIsHomeAr(false);
  };
  let handleEnterQuestion = () => {
    setIsTest(false);
    setIsHomeAr(false);
  };
  return (
    <header className="nav">
      <div id="nav-logo">
        <img src="logo.png" alt="logo" width={50} height={50} />
      </div>
      <ul className="nav-menu">
        <li onClick={handleConvertToHome}>Trang Chủ</li>
        <li onClick={handleConvertToTest}>Thi Thử</li>
        <li onClick={handleEnterQuestion}>Tạo đề thi</li>
        <li>Hợp Tác</li>
        <li>Phản Hồi</li>
      </ul>
      <div className="nav-login-signin">
        <button>Đăng Ký</button>
        <button>Đăng Nhập</button>
      </div>
    </header>
  );
}
export function Test() {
  const [curQue, setCurQue] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [isLoading, setIsloading] = useState(false);

  const [aresult, setAResult] = useState(Array(questions.length).fill(0));

  const [scoreCalculated, setScoreCalculated] = useState(false);

  function calculateScore(array) {
    let sum = 0;
    array.map((element) => {
      if (element === 1) {
        sum += 1;
      }
    });
    return sum;
  }
  const handleNext = () => {
    setCurQue(curQue + 1);
  };

  const handlePrevious = () => {
    setCurQue(curQue - 1);
  };

  const handleAnswer = (id) => {
    setSelectedAnswer(id);
    if (id === questions[curQue].correctAnswer) {
      let newArray = [...aresult];
      newArray[curQue] += 1;
      setAResult(newArray);
    } else {
      let newArray = [...aresult];
      newArray[curQue] = 0;
      setAResult(newArray);
    }
  };

  const handleScore = () => {
    setIsloading(true);
    setTimeout(() => {
      setIsloading(false);
      setScoreCalculated(true);
    }, 5000);
  };
  return (
    <>
      {scoreCalculated === false && (
        <div className="test-table">
          <h2>
            {" "}
            Câu {curQue + 1}: {questions[curQue].question}
          </h2>
          <ul>
            {questions[curQue].answers.map((answer) => (
              <li className="answer" key={answer.id}>
                <label>
                  <input
                    type="radio"
                    name="answer"
                    value={answer.id}
                    checked={selectedAnswer === answer.id}
                    onChange={() => handleAnswer(answer.id)}
                  />{" "}
                  {answer.text}
                </label>
              </li>
            ))}
          </ul>
          <div className="button-group">
            {curQue > 0 && <button onClick={handlePrevious}>Previous</button>}
            {curQue < questions.length - 1 && (
              <button onClick={handleNext}>Next</button>
            )}
            {curQue === questions.length - 1 && (
              <button onClick={handleScore}>Nộp bài</button>
            )}
          </div>
        </div>
      )}
      {isLoading && <div className="loading"> Loading... </div>}
      {scoreCalculated && (
        <div className="calculateScore">
          {" "}
          Your score is: {calculateScore(aresult)}{" "}
        </div>
      )}
    </>
  );
}