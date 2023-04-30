import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHouse,
  faPen,
  faHandshake,
  faComment,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { questions } from "./data";
import { useState, useEffect } from "react";
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
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

localStorage.setItem("signupInfo", JSON.stringify({ email: "", password: "" }));

export default function Ungdung() {
  const [isHome, setIsHome] = useState(true);

  const [isTest, setTest] = useState(false);

  const [isError, setIsError] = useState(false);

  const [isLogin, setIsLogin] = useState(false);

  const [isSignup, setIsSignUp] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="container">
      {isLogin && (
        <>
          <LogIn
            setIsLogin={setIsLogin}
            setIsSignUp={setIsSignUp}
            setIsLoading={setIsLoading}
          />
        </>
      )}
      {isLoading && (
        <>
          {/* <CircularProgress className="spinner" sx={{ color: "red" }} /> */}
          <Loader />
        </>
      )}
      {isSignup && isLogin === false && (
        <SignUp
          setIsLogin={setIsLogin}
          setIsSignUp={setIsSignUp}
          setIsLoading={setIsLoading}
        />
      )}
      {isSignup === false && isLogin === false && (
        <>
          <header>
            <Navigation
              setIsHomeAr={setIsHome}
              setIsTest={setTest}
              setIsError={setIsError}
            />
          </header>
          {isTest === false && <Sidebar />}
          <div className="main">
            {isTest === true && isError === false && (
              <Test setIsloading={setIsLoading} />
            )}
            {isHome === true && isError === false && (
              <InforMyWeb setIsTest={setTest} setIsHomeAr={setIsHome} />
            )}
            {isTest === false && isHome === false && isError === false && (
              <Enterquestion />
            )}
            {isError === true && isHome === false && isTest === false && <BasicCard />}
          </div>
          <footer>
            <Footer />
          </footer>
        </>
      )}
    </div>
  );
}

function Loader() {
  return (
    <div className="loader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

function BasicCard() {
  return (
    <Card
      sx={{
        maxWidth: 350,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        boxShadow: "0 0 15px rgba(0,0,0,.2)",
        borderRadius: "20px",
        zIndex: 100,
      }}
      variant="outlined"
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Thông báo tình trạng trang
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Admin: paulto
        </Typography>
        <Typography variant="body2" sx={{ fontSize: 22 }}>
          Hiện tại trang vẫn chưa hoàn thiện <br />
          Xin thông cảm!
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Đọc thêm </Button>
      </CardActions>
    </Card>
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

function LogIn({ setIsSignUp, setIsLogin, setIsLoading }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const inputLogin = {
      email: data.get("email"),
      password: data.get("password"),
    };
    const localInfo = JSON.parse(localStorage.getItem("signupInfo"));
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (
        inputLogin.email === localInfo.email &&
        inputLogin.password === localInfo.password
      ) {
        setIsLogin(false);
        setIsSignUp(false);
      } else {
        alert("Ban chua co tai khoan! Hay tao tai khoan!");
      }
    }, 5000);
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
                  Quên mật khẩu
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={handleSignUp}>
                  {"Bạn chưa có tài khoản! Đăng ký"}
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

function SignUp({ setIsLogin, setIsSignUp, setIsLoading }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const infoUser = {
      email: data.get("email"),
      password: data.get("password"),
    };
    const localInfo = JSON.parse(localStorage.getItem("signupInfo"));
    setIsLoading(true);
    setTimeout(() => {
      localInfo.email === infoUser.email
        ? alert("Xin loi! Tai khoan nay da duoc su dung")
        : setIsLogin(false);
      setIsSignUp(false);
      localStorage.setItem("signupInfo", JSON.stringify(infoUser));
      setIsLoading(false);
    }, 5000);
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
    console.log('Hello world!');
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
  setIsError
}) {
  const [isOpenToggleMenu, setIsOpenTGM] = useState(false);
  let handleConvertToHome = () => {
    setIsHomeAr(true);
    setIsTest(false);
    setIsError(false);
  };
  let handleConvertToTest = () => {
    setIsTest(true);
    setIsHomeAr(false);
    setIsError(false);
  };
  let handleEnterQuestion = () => {
    setIsTest(false);
    setIsHomeAr(false);
    setIsError(false);
  };
  let handleToggleMenu = () => {
    let toggleMenu = document.querySelector(".nav-toggle-menu");
    toggleMenu.classList.toggle("open");
    setIsOpenTGM(!isOpenToggleMenu);
  };

  const handleError = () => {
    setIsError(true);
    setIsHomeAr(false);
    setIsTest(false);
  };
  let localInfo = JSON.parse(localStorage.getItem("signupInfo"));
  let emailUser = localInfo.email;
  let nameUser = emailUser.substring(0, emailUser.indexOf("@"));
  return (
    <header className="nav">
      <div id="nav-logo">
        <img src={logo} alt="logo" width={50} height={50} />
      </div>
      <ul className="nav-menu">
        <li onClick={handleConvertToHome}>Trang Chủ</li>
        <li onClick={handleConvertToTest}>Thi Thử</li>
        <li onClick={handleEnterQuestion}>Tạo đề thi</li>

        {/***************** Default **************/}

        <li onClick={handleError}>Hợp Tác</li>
        <li onClick={handleError}>Phản Hồi</li>
      </ul>
      <div className="nav-login-signin">
        <StyledBadge
          className="avatar"
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt="Remy Sharp" src="" />
        </StyledBadge>
        <div className="nameuser">{nameUser}</div>
      </div>
      {isOpenToggleMenu ? (
        <FontAwesomeIcon
          className="nav-bars-icon"
          icon={faXmark}
          onClick={handleToggleMenu}
          beat={true}
        />
      ) : (
        <FontAwesomeIcon
          className="nav-bars-icon"
          icon={faBars}
          onClick={handleToggleMenu}
        />
      )}
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
            <FontAwesomeIcon icon={faHandshake} onClick={handleError}/> Hợp Tác
          </li>
          <li>
            {" "}
            <FontAwesomeIcon icon={faComment} onClick={handleError} /> Phản Hồi
          </li>
        </ul>
      </div>
    </header>
  );
}
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export function Test({ setIsloading }) {
  const [curQue, setCurQue] = useState(0);

  const [resultArray, setResultArray] = useState([]);

  const [aresult, setAResult] = useState(Array(questions.length).fill(0));

  /* Phát sinh một số vấn đề về tính năng trích xuất thời gian làm bài của user
  Vấn: scoreCalculated và remainingTime không liên quan nhau
  Nhưng khi scoreCalculated ở trạng thái TRUE thì remainingTime stop 
  Không thay đổi các thuộc tính nữa và khi chuyển scoreCalculated thành FALSE
  Thì remainingTime lại thay đổi trạng thái bình thường ?
  Vấn đề gì đang xảy ra???
*/

  const [scoreCalculated, setScoreCalculated] = useState(false);

  const [remainingTime, setRemainingTime] = useState({
    hours: 0,
    minutes: 10,
    seconds: 0,
  });

  function calculateScore(array) {
    let sum = 0;
    array.map((element) => {
      if (element === 1) {
        sum += 1;
      }
      return sum;
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
    const newAnswer = [...resultArray];

    newAnswer[curQue] = id;

    setResultArray(newAnswer);
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
    <div className="test-board">
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
                    checked={resultArray[curQue] === answer.id}
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
              <button
                onClick={handleScore}
                style={{
                  color: "#000",
                  background: "#ff8cff",
                  border: "1px solid rgba(0,0,0,.3)",
                  borderRadius: "2px",
                }}
              >
                Nộp bài
              </button>
            )}
          </div>
        </div>
      )}

      {scoreCalculated && (
        <div className="calculateScore">
          <h3>Kết quả làm bài của bạn </h3>
          <p>
            Thời gian làm bài:{" "}
            {remainingTime.hours.toString().padStart(2, "0") +
              ":" +
              remainingTime.minutes.toString().padStart(2, "0") +
              ":" +
              remainingTime.seconds.toString().padStart(2, "0")}
          </p>
          <p>
            Đạt: {calculateScore(aresult)}/{questions.length + 1} câu
          </p>
          <p>Điểm: {calculateScore(aresult)} đ</p>
        </div>
      )}
      {scoreCalculated === false && (
        <QuestionTable
          currentQuestion={curQue}
          setCurQue={setCurQue}
          resultArray={resultArray}
          remainingTime={remainingTime}
          setRemainingTime={setRemainingTime}
        />
      )}
    </div>
  );
}

function QuestionTable({
  currentQuestion,
  setCurQue,
  resultArray,
  remainingTime,
  setRemainingTime,
}) {
  const handleCurrentQuestion = (id) => {
    setCurQue(id - 1);
  };
  return (
    <div className="test-questions-detail">
      <CountdownTimer
        remainingTime={remainingTime}
        setRemainingTime={setRemainingTime}
      />
      <p>Danh sách câu hỏi: </p>
      <div className="questions">
        {questions.map((question) => {
          if (question.id === currentQuestion + 1) {
            return (
              <div
                style={{ background: "#d3cbcb" }}
                key={question.id}
                onClick={() => {
                  handleCurrentQuestion(question.id);
                }}
                className="question"
              >
                {" "}
                {question.id}
              </div>
            );
          } else {
            if (resultArray[question.id - 1] !== undefined) {
              return (
                <div
                  key={question.id}
                  onClick={() => {
                    handleCurrentQuestion(question.id);
                  }}
                  className="question"
                  style={{ background: "#ff8cff" }}
                >
                  {" "}
                  {question.id}
                </div>
              );
            } else {
              return (
                <div
                  key={question.id}
                  onClick={() => {
                    handleCurrentQuestion(question.id);
                  }}
                  className="question"
                >
                  {" "}
                  {question.id}
                </div>
              );
            }
          }
        })}
      </div>
    </div>
  );
}

const CountdownTimer = ({
  hours,
  minutes,
  seconds,
  remainingTime,
  setRemainingTime,
}) => {
  useEffect(() => {
    const timer =
      remainingTime.seconds > 0 ||
      remainingTime.minutes > 0 ||
      remainingTime.hours > 0
        ? setInterval(() => tick(), 1000)
        : null;

    return () => clearInterval(timer);
  });

  const tick = () => {
    if (
      remainingTime.hours === 0 &&
      remainingTime.minutes === 0 &&
      remainingTime.seconds === 0
    )
      reset();
    else if (remainingTime.minutes === 0 && remainingTime.seconds === 0)
      setRemainingTime({
        hours: remainingTime.hours - 1,
        minutes: 59,
        seconds: 59,
      });
    else if (remainingTime.seconds === 0)
      setRemainingTime({
        hours: remainingTime.hours,
        minutes: remainingTime.minutes - 1,
        seconds: 59,
      });
    else
      setRemainingTime({
        hours: remainingTime.hours,
        minutes: remainingTime.minutes,
        seconds: remainingTime.seconds - 1,
      });
  };

  const reset = () =>
    setRemainingTime({
      hours,
      minutes,
      seconds,
    });

  return (
    <div>
      <p>
        Thời gian còn lại:{" "}
        <b>
          {remainingTime.hours.toString().padStart(2, "0")}:
          {remainingTime.minutes.toString().padStart(2, "0")}:
          {remainingTime.seconds.toString().padStart(2, "0")}
        </b>
      </p>
    </div>
  );
};
