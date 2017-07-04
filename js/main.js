new Vue({
  el: "#app",
  data: {
    srcName: ''
  },
  methods: {
    imgClick: function(){
      this.srcName='http://thecatapi.com/api/images/get?format=src&type=gif&ts='+new Date().getTime()
    }
  }
})
