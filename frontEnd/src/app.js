const userList = document.querySelector(".frinds-list")
const addBtn = document.querySelector(".addBtn")
const inp = document.querySelector(".inp")
const newName = document.getElementById("name")

let arr2 = []
//[PK] ^Immediately I think -- what is `arr2`?? It doesn't have a name that tells me what it's for. It's also declared with `let` so that tells me that it will be reassigned later, but I don't think it actually is. Remember to use `const`/`let` and variable-naming to help anyone looking at the code to understand how the code works!
function reSort() {
	arr2.sort(function (a, b) {
		return b.value - a.value
	})
}

const getData = async () => {
	const result = await fetch("/api")
	const data = await result.json()
	const arr1 = data.users //[PK] -- `arr1` unused
	let nr = 0

	arr2.push(...data.users)

	reSort()
	arr2.forEach(el => {
		console.log(el.name)
		const div = document.createElement("div")
		div.className = "frind"
		nr++
		div.innerHTML = `
            <li id="delName${nr}">${el.name}</li>
            <div class="bar">
            <h4 id="value${nr}">${el.value} </h4>
            <button type="submit" id="plusBtn${nr}">+</button>
            <button type="submit" id="minusBtn${nr}">-</button>
            <button type="submit" id="deleteBtn${nr}">x</button>
            <br><br>
            </div>
            `
		userList.appendChild(div)
		const deleteBtn = document.querySelector(`#deleteBtn${nr}`)
		const delName = document.querySelector(`#delName${nr}`)
		const value = document.querySelector(`#value${nr}`)
		const minusBtn = document.querySelector(`#minusBtn${nr}`)
		const plusBtn = document.querySelector(`#plusBtn${nr}`)
		const name = delName.innerText
		let val = value.innerText
		deleteBtn.addEventListener("click", e => {
			e.target.parentElement.parentElement.remove()
			fetch("/api" + "/" + name, {
				method: "Delete",
			})
		})

		minusBtn.addEventListener("click", () => {
			--val
			value.innerHTML = val
			max(val)
			fetch("/api/" + name, {
				method: "put",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					value: val,
				}),
			})
		})

		plusBtn.addEventListener("click", () => {
			++val
			value.innerHTML = val
			max(val)
			fetch("/api/" + name, {
				method: "put",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					value: val,
				}),
			})
		})
	})
}

function max(nr) {
	arr2.forEach(el => {
		if (el.value > nr) {
			location.reload()
		}
	})
}

getData()

addBtn.addEventListener("click", () => {
	let i = 5
	let n = 0
	console.log()

	if (newName.value === "") {
		inp.innerHTML = `<h5 id="error">Please put a name</h5>`
		setTimeout(() => {
			inp.parentNode.removeChild(inp)
		}, 3000)
		//[PK] This is really nice user-friendly error handling! I especially love the timer!!
	} else {
		fetch("/api", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: `${newName.value}`,
				value: i,
			}),
		})
		const div = document.createElement("div")
		div.className = "frind"
		n++
		div.innerHTML = `
            <li id="delName${n}">${newName.value}</li>
            <div class="bar">
                <h4 id="value${n}">${i}</h4>
                <button type="submit" id="plusBtn${n}">+</button>
                <button type="submit" id="minusBtn${n}">-</button>
                <button type="submit" class="deleteBtn${n}">x</button>
                <br><br>
            </div>
            `
		newName.innerHTML = ""
		userList.appendChild(div)
	}
})
