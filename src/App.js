import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHouse,
  faPen,
  faHandshake,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { questions } from "./data";
import { useState } from "react";
import "./App.css";
import logo from "./logo.png";

/************************* Use Material Libary *********************/
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SignLanguage } from "@mui/icons-material";

export default function Ungdung() {
  const [isHome, setIsHome] = useState(true);
  const [isTest, setTest] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isSignup, setIsSignUp] = useState(false);
  return (
    <div className="container">
      {isLogin && <LogIn setIsLogin={setIsLogin} setIsSignUp={setIsSignUp} />}
      {isSignup && isLogin === false && (
        <SignUp setIsLogin={setIsLogin} setIsSignUp={setIsSignUp} />
      )}
      {isSignup === false && isLogin === false && (
        <>
          <Navigation
            setIsHomeAr={setIsHome}
            setIsTest={setTest}
            setIsSignUp={setIsSignUp}
            setIsLogin={setIsLogin}
          />
          <Sidebar />
          {isTest === true && <Test />}
          {isHome === true && (
            <InforMyWeb setIsTest={setTest} setIsHomeAr={setIsHome} />
          )}
          {isTest === false && isHome === false && <Enterquestion />}
          <Footer />
        </>
      )}
    </div>
  );
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Paul To Web
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function LogIn({ setIsSignUp, setIsLogin }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const inputLogin = {
      email: data.get("email"),
      password: data.get("password")
    };
    console.log(inputLogin);
    const localInfo = JSON.parse(localStorage.getItem("signupInfo"));
    if (
      inputLogin.email === localInfo.email &&
      inputLogin.password === localInfo.password
    ) {
      setIsLogin(false);
      setIsSignUp(false);
    }
    console.log(localInfo.email);
  };
  const handleSignUp = () => {
    setIsLogin(false);
    setIsSignUp(true);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log in
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={handleSignUp}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

/***************** FORM SIGN UP ***********************/
function SignUp({ setIsLogin, setIsSignUp }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const infoUser = {
      email: data.get("email"),
      password: data.get("password"),
    };
    const localInfo = JSON.parse(localStorage.getItem("signupInfo"));
    localInfo.email === infoUser.email
      ? alert("Xin loi! Tai khoan nay da duoc su dung")
      : setIsLogin(false);
    setIsSignUp(false);
    localStorage.setItem("signupInfo", JSON.stringify(infoUser));
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign up
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
/******************************************************** */

export function Enterquestion({ input, setInput }) {
  const inputObject = {};
  const handleInput = (e) => {
    inputObject.question = e.target.value;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setInput([...input, inputObject]);
  };
  return (
    <form className="enter-question-form" onSubmit={handleSubmit}>
      <h1>Nhập câu hỏi của bạn</h1>
      <label>
        Câu hỏi:
        <input
          type="text"
          onChange={handleInput}
          id="question"
          placeholder="Bạn khỏe không?"
        />
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
export function Navigation({
  setIsHomeAr,
  setIsTest,
  setIsSignUp,
  setIsLogin,
}) {
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
  const handleSignUp = () => {
    setIsSignUp(true);
  };
  const handleLogin = () => {
    setIsLogin(true);
  };
  let handleToggleMenu = () => {
    let toggleMenu = document.querySelector(".nav-toggle-menu");
    toggleMenu.classList.toggle("open");
  };
  return (
    <header className="nav">
      <div id="nav-logo">
        <img src={logo} alt="logo" width={50} height={50} />
      </div>
      <ul className="nav-menu">
        <li onClick={handleConvertToHome}>Trang Chủ</li>
        <li onClick={handleConvertToTest}>Thi Thử</li>
        <li onClick={handleEnterQuestion}>Tạo đề thi</li>
        <li>Hợp Tác</li>
        <li>Phản Hồi</li>
      </ul>
      <div className="nav-login-signin">
        <button onClick={handleSignUp}>Đăng Ký</button>
        <button onClick={handleLogin}>Đăng Nhập</button>
      </div>
      <FontAwesomeIcon
        className="nav-bars-icon"
        icon={faBars}
        onClick={handleToggleMenu}
      />
      <div className="nav-toggle-menu">
        <ul>
          <li onClick={handleConvertToHome}>
            {" "}
            <FontAwesomeIcon icon={faHouse} /> Trang Chủ
          </li>
          <li onClick={handleConvertToTest}>
            {" "}
            <FontAwesomeIcon icon={faPen} /> Thi Thử
          </li>
          <li onClick={handleEnterQuestion}> + Tạo đề thi</li>
          <li>
            {" "}
            <FontAwesomeIcon icon={faHandshake} /> Hợp Tác
          </li>
          <li>
            {" "}
            <FontAwesomeIcon icon={faComment} /> Phản Hồi
          </li>
        </ul>
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
