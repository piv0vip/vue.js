const POMODORO_STATES = {
  WORK: 'work',
  REST: 'rest'
};
const STATES = {
  STARTED: 'started',
  STOPPED: 'stopped',
  PAUSED: 'paused'
};
const WORKING_TIME_LENGTH_IN_MINUTES = 1;
const RESTING_TIME_LENGTH_IN_MINUTES = 5;

new Vue({
  el: "#app",
  data: {
    state: STATES.STOPPED,
    minute: WORKING_TIME_LENGTH_IN_MINUTES,
    second: 0,
    pomodoroState: POMODORO_STATES.WORK,
    timestamp: 0,
    imageSrc: ''
  },
  computed: {
    title: function(){
      return this.pomodoroState === POMODORO_STATES.WORK ? 'Work!' : 'Rest!'
    },
    min: function(){ return this.minute < 10 ? '0' + this.minute : this.minute},
    sec: function(){ return this.second < 10 ? '0' + this.second : this.second},
  },
  methods: {
    start: function(){
      this.state = STATES.STARTED;
      this._tick();
      this.interval = setInterval(this._tick, 1000);
    },
    pause: function(){
      this.state = STATES.PAUSED;
      clearInterval(this.interval);
    },
    stop: function(){
      this.state = STATES.STOPPED;
      clearInterval(this.interval);
      this.pomodoroState = POMODORO_STATES.WORK;
      this.minute = WORKING_TIME_LENGTH_IN_MINUTES;
      this.second = 0;
    },
    _tick: function(){
      if (this.second !== 0){
        this.second--;
        return;
      }
      if(this.minute !== 0){
        this.minute--;
        this.second = 59;
        return;
      }

      this.imageSrc = 'http://thecatapi.com/api/images/get?format=src&type=gif';

      this.pomodoroState = this.pomodoroState === POMODORO_STATES.WORK ? POMODORO_STATES.REST : POMODORO_STATES.WORK;
      if (this.pomodoroState === POMODORO_STATES.WORK){
        this.minute = WORKING_TIME_LENGTH_IN_MINUTES;
      } else {
        this.minute = RESTING_TIME_LENGTH_IN_MINUTES;
      }
    }
  }
})
