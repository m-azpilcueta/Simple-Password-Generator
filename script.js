if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("serviceWorker.js")
      .then((registration) => {
        console.log("Service Worker Registered");
      })
      .catch((err) => {
        console.log("Service Worker Failed to Register", err);
      });
  });
}

const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const specialChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
const numbersChars = "0123456789";

const setBodyHeight = () => {
  const body = document.querySelector("body");
  const bodyHeight = window.innerHeight;
  body.style.height = `${bodyHeight}px`;
};

window.addEventListener("resize", setBodyHeight);
setBodyHeight();

const slider = document.getElementById("range");
const sliderValue = document.getElementById("range-value");
const uppercase = document.getElementById("uppercase");
const specialChar = document.getElementById("special-chars");
const numbers = document.getElementById("numbers");
const generateButton = document.getElementById("generate");
const copyButton = document.getElementById("copy");

sliderValue.value = slider.value;

slider.addEventListener("input", () => {
  const _sliderValue = slider.value;
  sliderValue.value = _sliderValue;
});

const copyToClipboard = () => {
  const password = document.getElementById("password");
  password.select();
  document.execCommand("copy");
};

copyButton.addEventListener("click", copyToClipboard);

const generatePassword = () => {
  const _sliderValue = slider.value;
  const _uppercase = uppercase.checked;
  const _specialChar = specialChar.checked;
  const _numbers = numbers.checked;

  const password = generatePasswordWithLength(
    _sliderValue,
    _uppercase,
    _specialChar,
    _numbers
  );

  document.getElementById("password").value = password;
  estimateTimeToCrack(password);
};

const generatePasswordWithLength = (
  length,
  uppercase,
  specialChar,
  numbers
) => {
  let allChars = lowercase;
  let password = "";

  if (uppercase) {
    allChars += uppercaseChars;
  }

  if (specialChar) {
    allChars += specialChars;
  }

  if (numbers) {
    allChars += numbersChars;
  }

  for (let i = 0; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  return password;
};

generateButton.addEventListener("click", generatePassword);

const estimateTimeToCrack = (password) => {
  let possibleChars = lowercase.length;

  if (password.match(/[A-Z]/)) {
    possibleChars += uppercaseChars.length;
  }

  if (password.match(/[!@#$%^&*()_+~`|}{[\]:;?><,./-]/)) {
    possibleChars += specialChars.length;
  }

  if (password.match(/[0-9]/)) {
    possibleChars += numbersChars.length;
  }

  const passwordLength = password.length;
  const possibleCombinations = Math.pow(possibleChars, passwordLength);
  const triesPerSecond = 100000000000;
  const secondsToCrack = possibleCombinations / triesPerSecond;
  const timeToCrack = formatSeconds(secondsToCrack);
  const timeToCrackElement = document.querySelector(".time-to-crack");
  timeToCrackElement.innerHTML = `⏳ Time to crack: ${timeToCrack}`;
  timeToCrackElement.style.visibility = "visible";
};

const formatSeconds = (seconds) => {
  if (seconds <= 0) {
    return "0 seconds";
  }

  const timeUnits = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  let timeString = "";
  let remainingSeconds = seconds;
  let maxRepresentation = "";

  for (let i = 0; i < timeUnits.length; i++) {
    const { label, seconds } = timeUnits[i];
    const unitValue = Math.floor(remainingSeconds / seconds);

    if (unitValue > 0) {
      if (label === "year") {
        timeString +=
          formatYears(unitValue) +
          " " +
          label +
          (unitValue === 1 ? "" : "s") +
          " ";
      } else {
        timeString +=
          unitValue + " " + label + (unitValue === 1 ? "" : "s") + " ";
      }
      remainingSeconds %= seconds;
      maxRepresentation = label;
    }

    if (maxRepresentation === "year" || maxRepresentation === "day") {
      break;
    }
  }

  return timeString.trim();
};

const formatYears = (years) => {
  const numberNames = [
    "",
    "thousand",
    "million",
    "billion",
    "trillion",
    "quadrillion",
  ];
  let suffixIndex = 0;

  while (years >= 1000) {
    years /= 1000;
    suffixIndex++;
  }

  return Math.floor(years) + " " + numberNames[suffixIndex];
};
