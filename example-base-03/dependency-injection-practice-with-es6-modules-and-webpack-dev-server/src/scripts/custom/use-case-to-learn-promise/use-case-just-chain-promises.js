

const btn= document.createElement('button');
btn.innerText='Click Me';
let value=1;
const clickHandler= ()=>{
    console.clear();
    console.log(`value: ${value}`);
    const promise= new Promise((resolve, reject)=>{
        resolve(value);
    });
    
    promise
    .then((val)=> {const n=val+6; console.log(n); return n;})
    .then((val)=> {const n=val*2; console.log(n); return n;})
    .then((val)=>{const n=val/2; console.log(n); return n;})
    .then((val)=>{const n=val-6; console.log(n); return n;})
    .then((val)=>console.log(val, val===value))
    .catch((err)=> console.error(err))
    .finally(()=>{console.log('Job done!!'); value+=1;});
}

btn.addEventListener('click', clickHandler);
document.body.appendChild(btn);