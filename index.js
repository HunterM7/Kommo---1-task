const inputEl = document.querySelector('input')
const buttonEl = document.querySelector('button')
const timerEl = document.querySelector('span')

const createTimerAnimator = () => {
  return (seconds) => {
    let remainedSeconds = seconds

    timerEl.innerText = timeFormatter(remainedSeconds--)

    const interval = setInterval(() => {
      if (remainedSeconds < 0) {
        return stopTimer()
      }

      timerEl.innerText = timeFormatter(remainedSeconds--)
    }, 1000)

    function timeFormatter(inputSeconds) {
      if (inputSeconds < 0) {
        return '00:00:00'
      }

      const hours = Math.floor(inputSeconds / 3600)
      const minutes = Math.floor((inputSeconds - hours * 3600) / 60)
      const seconds = inputSeconds - hours * 3600 - minutes * 60

      const formatedTime = [
        hours < 10 ? '0' + hours : hours,
        minutes < 10 ? '0' + minutes : minutes,
        seconds < 10 ? '0' + seconds : seconds,
      ].join(':')

      return formatedTime
    }

    function stopTimer() {
      clearInterval(interval)

      timerEl.innerText = "Time's up"
    }
  }
}

const animateTimer = createTimerAnimator()

inputEl.addEventListener('input', () => {
  const value = inputEl.value
    .split('')
    .filter((el) => /[0-9]/.test(el))
    .join('')

  inputEl.value = value
})

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value)

  animateTimer(seconds)

  inputEl.value = ''
})
