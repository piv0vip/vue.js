var data = {
  items: [
    { text: 'Bananas', checked: true},
    { text: 'Apples', checked: false}
  ],
  title: 'My Shopping List',
  newItem: ''
}

var ItemsComponent = Vue.extend({
  data: function(){
    return data;
  },
  template: `
    <ul>
      <li v-for="item in items" v-bind:class="{'removed': item.checked}">
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="item.checked"> {{ item.text }}
          </label>
        </div>
      </li>
    </ul>`
});

var ChangeTitleComponent = Vue.extend({
  data: function(){
    return data;
  },
  template: '<input v-model="title">'
});

var AddItemComponent = Vue.extend({
  data: function(){
    return data;
  },
  methods: {
    addItem: function(e){
      var text;
      text = this.newItem.trim();
      if (text){
        this.items.push({
          text: text,
          checked: false
        });
        this.newItem = '';
        $(e.currentTarget).focus();
      }
    }
  },
  template: `
    <div class="input-group">
      <input v-model="newItem" @keyup.enter="addItem" placeholder="add shoping list item" type="text" class="form-control">
      <span class="input-group-btn">
        <button @click="addItem" type="button" class="btn btn-default">Add!</button>
      </span>
    </div>`
})

Vue.component('items-component', ItemsComponent);
Vue.component('change-title-component', ChangeTitleComponent);
Vue.component('add-item-component', AddItemComponent);

new Vue({
  el: '#app',
  data: data,
})
