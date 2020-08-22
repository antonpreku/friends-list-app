const  userList= document.querySelector('.frinds-list');
const  addBtn= document.querySelector('.addBtn');
const  inp= document.querySelector('.inp');
const newName= document.getElementById('name')

let arr2=[]
function reSort(){
    arr2.sort(function (a, b) {
          return b.value - a.value
        });
  }
    
const getData= async ()=>{
    const result= await fetch("/api")
    const data= await result.json()
    const arr1= data.users
    let nr=0

    arr2.push(...data.users)
    
    reSort()
    arr2.forEach(el => {
        const div= document.createElement('div')
        div.className="frind"
        nr++
        div.innerHTML=`
            <li id="delName${nr}">${el.name}</li>
            <div class="bar">
            <h4 id="value${nr}">${el.value} </h4>
            <button type="submit" id="plusBtn${nr}">+</button>
            <button type="submit" id="minusBtn${nr}">-</button>
            <button type="submit" id="deleteBtn${nr}">x</button>
            <br><br>
            </div>
            `
        userList.appendChild(div);
        const deleteBtn= document.querySelector(`#deleteBtn${nr}`);
        const delName= document.querySelector(`#delName${nr}`);
        const value= document.querySelector(`#value${nr}`);
        const minusBtn= document.querySelector(`#minusBtn${nr}`);
        const plusBtn= document.querySelector(`#plusBtn${nr}`);
        const name = delName.innerText
        let val=value.innerText
        deleteBtn.addEventListener('click', (e)=>{
            e.target.parentElement.parentElement.remove()
            fetch('/api'+'/'+name,{
                method:'Delete'
            })
        }) 
        

        minusBtn.addEventListener('click', ()=>{
            --val     
            value.innerHTML=val     
            max(val) 
            fetch('/api/'+ name, {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    value: val
                })
            })   
        }); 

        plusBtn.addEventListener('click', ()=>{
            ++val  
            value.innerHTML=val  
                      max(val)      
            fetch('/api/'+ name, {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    value: val
                })
            }) 
                
        }); 
    })
}

function max(nr){
      arr2.forEach(el=>{
        if(el.value > nr){
            location.reload()
        }
      })
    }
    
    
getData();

addBtn.addEventListener('click', ()=>{
    let elem= false
   
        arr2.forEach(el=>{
          if(el.name === newName.value){
              elem = true
          }
        })
       

    if(newName.value === ''){
            inp.innerHTML=`<h5 id="error">Please put a name</h5>`
        setTimeout(() => {
            inp.parentNode.removeChild(inp)
        }, 3000);
    
    }else if(elem){
        inp.innerHTML=`<h5 id="error">This name is a dublicate</h5>`
        setTimeout(() => {
            inp.parentNode.removeChild(inp)
        }, 3000);
    
    }else{
         fetch('/api',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: `${newName.value}`,
            value: 5
        })
    })
     location.reload()  
    }
});

