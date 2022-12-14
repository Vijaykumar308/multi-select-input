class MultiInput extends HTMLElement {
  constructor() {
    super();
    this.innerHTML +=
    `<style>
    multi-input input::-webkit-calendar-picker-indicator {
      display: none;
    }
    /* NB use of pointer-events to only allow events from the × icon */
    multi-input div.item::after {
      color: black;
      content: '×';
      cursor: pointer;
      font-size: 18px;
      pointer-events: auto;
      position: absolute;
      right: 5px;
      top: -1px;
    }

    </style>`;
    this._shadowRoot = this.attachShadow({mode: 'open'});
    this._shadowRoot.innerHTML =
    `<style>
    :host {
      border: var(--multi-input-border, 1px solid #ddd);
      display: block;
      overflow: hidden;
      padding: 5px;
    }
    /* NB use of pointer-events to only allow events from the × icon */
    ::slotted(div.item) {
      background-color: var(--multi-input-item-bg-color, #dedede);
      border: var(--multi-input-item-border, 1px solid #ccc);
      border-radius: 2px;
      color: #222;
      display: inline-block;
      font-size: var(--multi-input-item-font-size, 14px);
      margin: 5px;
      padding: 2px 25px 2px 5px;
      pointer-events: none;
      position: relative;
      top: -1px;
    }
    /* NB pointer-events: none above */
    ::slotted(div.item:hover) {
      background-color: #eee;
      color: black;
    }
    ::slotted(input) {
      border: none;
      font-size: var(--multi-input-input-font-size, 14px);
      outline: none;
      padding: 10px 10px 10px 5px; 
    }
    </style>
    <slot></slot>`;

    this._datalist = this.querySelector('datalist');
    this._allowedValues = [];
    for (const option of this._datalist.options) {
      this._allowedValues.push(option.value);
    }

    this._input = this.querySelector('input');
    this._input.onblur = this._handleBlur.bind(this);
    this._input.oninput = this._handleInput.bind(this);
    this._input.onkeydown = (event) => {
      this._handleKeydown(event);
    };

    this._allowDuplicates = this.hasAttribute('allow-duplicates');
  }

  // Called by _handleKeydown() when the value of the input is an allowed value.
  _addItem(value) {
    this._input.value = '';
    const item = document.createElement('div');
    item.classList.add('item');
    item.textContent = value;
    this.insertBefore(item, this._input);
    item.onclick = () => {
      this._deleteItem(item);
    };

    // Remove value from datalist options and from _allowedValues array.
    // Value is added back if an item is deleted (see _deleteItem()).
    if (!this._allowDuplicates) {
      for (const option of this._datalist.options) {
        if (option.value === value) {
          option.remove();
        };
      }
      this._allowedValues =
      this._allowedValues.filter((item) => item !== value);
    }
  }

  // Called when the × icon is tapped/clicked or
  // by _handleKeydown() when Backspace is entered.
  _deleteItem(item) {
    const value = item.textContent;
    item.remove();
    interviewerRemove(value);
    // If duplicates aren't allowed, value is removed (in _addItem())
    // as a datalist option and from the _allowedValues array.
    // So — need to add it back here.
    if (!this._allowDuplicates) {
      const option = document.createElement('option');
      option.value = value;
      // Insert as first option seems reasonable...
      this._datalist.insertBefore(option, this._datalist.firstChild);
      this._allowedValues.push(value);
    }
  }

  // Avoid stray text remaining in the input element that's not in a div.item.
  _handleBlur() {
    this._input.value = '';
  }

  // Called when input text changes,
  // either by entering text or selecting a datalist option.
  _handleInput() {
    // Add a div.item, but only if the current value
    // of the input is an allowed value
    const value = this._input.value;
    if (this._allowedValues.includes(value)) {
      this._addItem(value);
    }
  }

  // Called when text is entered or keys pressed in the input element.
  _handleKeydown(event) {
    const itemToDelete = event.target.previousElementSibling;
    const value = this._input.value;
    // On Backspace, delete the div.item to the left of the input
    if (value ==='' && event.key === 'Backspace' && itemToDelete) {
      this._deleteItem(itemToDelete);
    // Add a div.item, but only if the current value
    // of the input is an allowed value
    } else if (this._allowedValues.includes(value)) {
      this._addItem(value);
    }
  }

  // Public method for getting item values as an array.
  getValues() {
    const values = [];
    const items = this.querySelectorAll('.item');
    for (const item of items) {
      values.push(item.textContent);
    }
    return values;
  }
}

window.customElements.define('multi-input', MultiInput);
let L1 = [];
let L2 = [];
let L3 = [];
let tempArr = [];
let finalArr = [];

function filterMyData(arr) {
  return arr.filter((v,i,a)=>a.findIndex(v2=>(v2.index===v.index))===i)
}

function interviewerRemove(val){
  let interviewer = multiInput.getValues();
  console.log("inter remove interviewer:",interviewer);
  console.log('tempArr interviewerRemove: ',tempArr);
  
  let filterData = tempArr.filter((arr,i)=>{
      return interviewer[i] == arr.name;
  });

  // for(let i in filterData){
  //     if(filterData.name !== interviewer){
  //       filterData.index = i;
  //     }
  // }
//  tempArr = filterData;
  console.log("after removing: ",filterData);
}
function fun(level){
  if (multiInput.getValues().length > 0) {
    values.textContent = `Got ${multiInput.getValues().join(',')}!`;

    let interviewer = multiInput.getValues();
    for(let i in interviewer){
      let data = {};
      data.index = i;
      data.level = level,
      data.name = interviewer[i]
      tempArr.push(data);
    }
    // console.log(tempArr);
    tempArr = filterMyData(tempArr);
    console.log("tempArr..",tempArr);
    for(let i = 0; i < tempArr.length; i++){
      switch(tempArr[i].level){
        case "L1":
            L1.push(tempArr[i]);
            // console.log("L1",L1);
            break;
        case "L2":
            L2.push(tempArr[i]);
            // console.log("L2",L2);
            break;
        case "L3":
            L3.push(tempArr[i]);
            // console.log("L3",L3);
            break;
      }
    }
    L1 = filterMyData(L1);
    L2 = filterMyData(L2);
    L3 = filterMyData(L3);

  //displaying the data as final result
    displayDataWithLevels(tempArr);
  } 
  else {
    values.textContent = 'Got noone  :`^(.'; 
  }
}


function displayDataWithLevels(arr){
    removeAllChildNodes(values);
    for(let i in arr){
      let p = document.createElement('p');
      let concatName = `${arr[i].name}-${arr[i].level}`
      p.innerText = concatName;
      values.append(p);
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}








