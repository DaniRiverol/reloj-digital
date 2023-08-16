const AMPM = document.querySelector(".clock__format--AMPM");
const formatHCheck = document.querySelectorAll('input[name="option"]'),
  formatHLbl = document.querySelectorAll(".clock__format label"),
  clock__date = document.querySelector(".clock__date");
const hour = document.querySelector(".clock__hour"),
  minute = document.querySelector(".clock__minute");

const clock = () => {
  const now = new Date();
  let h, m;
  h = now.getHours();
  m = now.getMinutes();
  date = now.toLocaleDateString();
  formatHora(h);
  minute.innerHTML = addZero(m);
  dayWeek(now.getDay());
  renderDate(clock__date, now);
};

const addZero = (t) => {
  return t < 10 ? `0${t}` : t;
};

const renderDate = (tag, date) => {
  tag.innerHTML = `${date.getDate()}/${addZero(date.getMonth() + 1)}`;
};
const formatHora = (hora) => {
  if (formatHCheck[0].checked && hora > 12) {
    hora > 12 ? (AMPM.innerHTML = "PM") : (AMPM.innerHTML = "AM");
    hora = hora - 12;
    hour.innerHTML = addZero(hora);
    formatHLbl[0].style.background = "#f9fbf3";
    formatHLbl[0].style.color = "#07241b";
  } else {
    formatHLbl[0].style.background = "transparent";
    formatHLbl[0].style.color = "#f9fbf3";
    AMPM.innerHTML = "";
  }
  if (formatHCheck[1].checked) {
    hour.innerHTML = addZero(hora);
    formatHLbl[1].style.background = "#f9fbf3";
    formatHLbl[1].style.color = "#07241b";
  } else {
    formatHLbl[1].style.background = "transparent";
    formatHLbl[1].style.color = "#f9fbf3";
  }
};
//formatHora();
const dayWeek = (d) => {
  const days = document.querySelectorAll(".clock__week span");
  days.forEach((day, i) => {
    if (d == i) {
      day.style.borderBottom = "2px solid";
    }
  });
};

setInterval(clock, 1000);
const fetchAPI = async () => {
  const response = await fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=Buenos Aires&units=metric&appid=2ecf6cb060534180cfd978ab97832993"
  );
  const data = await response.json();
  document.querySelector(".weather span").innerHTML = data.main.temp.toFixed(1) + "˚";
};

fetchAPI();
